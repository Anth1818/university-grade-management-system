import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "@/lib/db";
import { users, careerSemesters, enrollments, grades, sections, subjects, requests, studentProfiles, studentPrograms, studentSemesterHistory } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth/session";

export const server = {
  auth: {
    login: defineAction({
      accept: "form",
      input: z.object({
        email: z.string().email(),
        password: z.string(),
      }),
      handler: async ({ email, password }, { cookies }) => {
        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
          throw new Error("Invalid credentials");
        }

        const session = await encrypt({ id: user.id, role: user.role, name: user.name });
        cookies.set("session", session, {
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: "lax",
          path: "/",
        });

        return { success: true, role: user.role };
      },
    }),
    logout: defineAction({
      handler: async (_, { cookies }) => {
        cookies.delete("session", { path: "/" });
        return { success: true };
      },
    }),
    changePassword: defineAction({
      input: z
        .object({
          currentPassword: z.string().min(1),
          newPassword: z
            .string()
            .min(8)
            .regex(/[A-Z]/, "La nueva contraseña debe incluir al menos una letra mayúscula.")
            .regex(/[a-z]/, "La nueva contraseña debe incluir al menos una letra minúscula.")
            .regex(/[0-9]/, "La nueva contraseña debe incluir al menos un número.")
            .regex(/[^A-Za-z0-9]/, "La nueva contraseña debe incluir al menos un símbolo."),
          confirmPassword: z.string().min(8),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: "La confirmación de contraseña no coincide.",
          path: ["confirmPassword"],
        }),
      handler: async ({ currentPassword, newPassword }, { locals }) => {
        if (!locals.user) throw new Error("Unauthorized");

        const currentUser = await db.query.users.findFirst({
          where: eq(users.id, locals.user.id),
        });

        if (!currentUser || !bcrypt.compareSync(currentPassword, currentUser.password)) {
          throw new Error("La contraseña actual es incorrecta.");
        }

        if (currentPassword === newPassword) {
          throw new Error("La nueva contraseña debe ser diferente a la actual.");
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        await db
          .update(users)
          .set({ password: hashedPassword })
          .where(eq(users.id, locals.user.id));

        return { success: true };
      },
    }),
  },
  user: {
    updateProfile: defineAction({
      input: z.object({
        phone: z.string().optional(),
        address: z.string().optional(),
      }),
      handler: async ({ phone, address }, { locals }) => {
        if (!locals.user) throw new Error("Unauthorized");

        const normalizedPhone = phone?.trim() || null;
        const normalizedAddress = address?.trim() || null;

        if (locals.user.role === 'student') {
          const existingProfile = await db.query.studentProfiles.findFirst({
            where: eq(studentProfiles.userId, locals.user.id),
          });

          if (existingProfile) {
            await db
              .update(studentProfiles)
              .set({
                phone: normalizedPhone,
                address: normalizedAddress,
              })
              .where(eq(studentProfiles.userId, locals.user.id));
          } else {
            await db.insert(studentProfiles).values({
              userId: locals.user.id,
              phone: normalizedPhone,
              address: normalizedAddress,
            });
          }
        }

        return { success: true };
      },
    }),
  },
  student: {
    getGrades: defineAction({
      handler: async (_, { locals }) => {
        if (!locals.user || locals.user.role !== 'student') throw new Error("Unauthorized");
        
        const studentGrades = await db.select()
          .from(grades)
          .innerJoin(enrollments, eq(grades.enrollmentId, enrollments.id))
          .innerJoin(sections, eq(enrollments.sectionId, sections.id))
          .innerJoin(subjects, eq(sections.subjectId, subjects.id))
          .where(eq(enrollments.studentId, locals.user.id));
          
        return studentGrades;
      }
    }),
    requestCertificate: defineAction({
      input: z.object({
        type: z.enum(['degree_act', 'certified_notes', 'study_certificate', 'registration_certificate']),
      }),
      handler: async ({ type }, { locals }) => {
        if (!locals.user || locals.user.role !== 'student') throw new Error("Unauthorized");
        
        await db.insert(requests).values({
          studentId: locals.user.id,
          type,
          status: 'pending',
        });
        
        return { success: true };
      }
    }),
    enrollSemester: defineAction({
      input: z.object({
        block: z.string().min(1),
      }),
      handler: async ({ block }, { locals }) => {
        if (!locals.user || locals.user.role !== 'student') {
          throw new Error("Unauthorized");
        }

        const program = await db.query.studentPrograms.findFirst({
          where: eq(studentPrograms.studentId, locals.user.id),
        });

        if (!program || program.status !== 'active') {
          throw new Error("No tienes un programa académico activo.");
        }

        const targetSemester = (program.currentSemesterOrder ?? 0) + 1;

        const targetSemesterMeta = await db
          .select({
            turn: careerSemesters.turn,
          })
          .from(careerSemesters)
          .where(
            and(
              eq(careerSemesters.careerId, program.careerId),
              eq(careerSemesters.semesterOrder, targetSemester)
            )
          )
          .limit(1);

        if (targetSemesterMeta.length === 0) {
          throw new Error("La carrera no tiene configurado el semestre objetivo.");
        }

        const currentSemesterRecord = await db
          .select({
            status: studentSemesterHistory.status,
          })
          .from(studentSemesterHistory)
          .where(
            and(
              eq(studentSemesterHistory.studentProgramId, program.id),
              eq(studentSemesterHistory.semesterOrder, program.currentSemesterOrder ?? 1)
            )
          )
          .orderBy(desc(studentSemesterHistory.createdAt))
          .limit(1);

        if (currentSemesterRecord.length > 0 && currentSemesterRecord[0].status !== 'completed') {
          throw new Error("No cumples los requisitos para avanzar al siguiente semestre.");
        }

        const existingTargetEnrollment = await db
          .select({ id: enrollments.id })
          .from(enrollments)
          .innerJoin(sections, eq(enrollments.sectionId, sections.id))
          .where(
            and(
              eq(enrollments.studentId, locals.user.id),
              eq(enrollments.recovery, false),
              eq(enrollments.status, 'enrolled'),
              eq(sections.semesterOrder, targetSemester),
              eq(sections.careerId, program.careerId)
            )
          )
          .limit(1);

        if (existingTargetEnrollment.length > 0) {
          return { success: true, alreadyEnrolled: true };
        }

        const targetSections = await db
          .select({ id: sections.id })
          .from(sections)
          .where(
            and(
              eq(sections.careerId, program.careerId),
              eq(sections.semesterOrder, targetSemester),
              eq(sections.turn, targetSemesterMeta[0].turn),
              eq(sections.block, block),
              eq(sections.isRecovery, false)
            )
          );

        if (targetSections.length === 0) {
          throw new Error("No se encontraron materias para el bloque seleccionado.");
        }

        await db.insert(enrollments).values(
          targetSections.map((section) => ({
            studentId: locals.user!.id,
            sectionId: section.id,
            status: 'enrolled' as const,
            recovery: false,
          }))
        );

        return { success: true, alreadyEnrolled: false, enrolledCount: targetSections.length };
      }
    })
  },
  teacher: {
    getSections: defineAction({
      handler: async (_, { locals }) => {
        if (!locals.user || locals.user.role !== 'teacher') throw new Error("Unauthorized");
        
        return await db.query.sections.findMany({
          where: eq(sections.teacherId, locals.user.id),
          with: {
            subject: true,
          }
        });
      }
    }),
    updateGrades: defineAction({
      input: z.object({
        enrollmentId: z.string(),
        evaluation1: z.number().optional(),
        evaluation2: z.number().optional(),
        evaluation3: z.number().optional(),
        evaluation4: z.number().optional(),
        evaluation5: z.number().optional(),
        evaluation6: z.number().optional(),
        evaluation7: z.number().optional(),
        evaluation8: z.number().optional(),
        finalGrade: z.number().optional(),
      }),
      handler: async (input, { locals }) => {
        if (!locals.user || locals.user.role !== 'teacher') throw new Error("Unauthorized");
        
        // In a real app, verify that the teacher owns the section for this enrollment
        await db.update(grades)
          .set(input)
          .where(eq(grades.enrollmentId, input.enrollmentId));
          
        return { success: true };
      }
    })
  }
};
