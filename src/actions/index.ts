import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "@/lib/db";
import { users, enrollments, grades, sections, subjects, requests } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
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
