import { db } from './index';
import {
  users,
  careers,
  subjects,
  sections,
  sectionTeacherOptions,
  cohortSections,
  studentProfiles,
  enrollments,
  grades,
  academicHistories,
  academicSemesters,
  academicSemesterGrades,
  requests,
} from './schema';
import bcrypt from 'bcryptjs';
import { computerScienceCurriculum } from '@/data/computerScienceCurriculumData';
import { semesterSubjectsData } from '@/data/semesterSubjectsData';
import { recoverySubjectsData } from '@/data/recoverySubjectsData';
import { sectionListData } from '@/data/sectionsListData';
import { academicHistoryData } from '@/data/academicHistoryData';
import { gradesData } from '@/data/gradesData';
import type { Grade } from '../types';

type UserRole = 'student' | 'teacher' | 'analyst';

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.|\.$/g, '');

const parseSemesterOrder = (value: string) => {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : null;
};

const toUniqueEmail = (baseEmail: string, usedEmails: Set<string>, suffix: string) => {
  if (!usedEmails.has(baseEmail)) {
    usedEmails.add(baseEmail);
    return baseEmail;
  }

  const [local, domain] = baseEmail.split('@');
  let idx = 1;
  let candidate = `${local}+${suffix}.${idx}@${domain ?? 'university.edu'}`;

  while (usedEmails.has(candidate)) {
    idx += 1;
    candidate = `${local}+${suffix}.${idx}@${domain ?? 'university.edu'}`;
  }

  usedEmails.add(candidate);
  return candidate;
};

const safeDelete = async (table: unknown) => {
  try {
    await db.delete(table as never);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const nestedMessage =
      error && typeof error === 'object' && 'cause' in error
        ? String((error as { cause?: unknown }).cause)
        : '';
    const combined = `${message} ${nestedMessage}`.toLowerCase();

    if (!combined.includes('no such table')) {
      throw error;
    }
  }
};

// Función para calcular la nota final a partir de las evaluaciones individuales.
const finalGrade = (grades: Grade): number => {
    const evaluations: number[] = [
      grades?.evaluation1 ?? 0,
      grades?.evaluation2 ?? 0,
      grades?.evaluation3 ?? 0,
      grades?.evaluation4 ?? 0,
      grades?.evaluation5 ?? 0,
      grades?.evaluation6 ?? 0,
      grades?.evaluation7 ?? 0,
      grades?.evaluation8 ?? 0,
    ];
    const average = evaluations.reduce((acc: number, val: number) => acc + val, 0) / evaluations.length;
    const integerPart = Math.floor(average);
    const decimalPart = average - integerPart;

    return decimalPart >= 0.5 ? integerPart + 1 : integerPart;
  }

async function seed() {
  // ---------------------------------------------------------------------------
  // 1) Limpieza inicial de tablas (orden inverso por dependencias)
  // ---------------------------------------------------------------------------
  console.log('Cleaning database...');
  await safeDelete(academicSemesterGrades);
  await safeDelete(academicSemesters);
  await safeDelete(academicHistories);
  await safeDelete(grades);
  await safeDelete(enrollments);
  await safeDelete(sectionTeacherOptions);
  await safeDelete(studentProfiles);
  await safeDelete(cohortSections);
  await safeDelete(sections);
  await safeDelete(subjects);
  await safeDelete(requests);
  await safeDelete(users);
  await safeDelete(careers);

  // ---------------------------------------------------------------------------
  // 2) Inicializacion de contexto de seed
  // ---------------------------------------------------------------------------
  console.log('Seeding database...');

  const password = bcrypt.hashSync('password123', 10);

  const usedEmails = new Set<string>();
  const usersByEmail = new Map<string, { id: string; name: string; role: UserRole }>();
  const careersByName = new Map<string, { id: string; name: string }>();
  const subjectsByCode = new Map<string, { id: string; code: string; name: string }>();
  const teachersByName = new Map<string, { id: string; email: string }>();

  // ---------------------------------------------------------------------------
  // 3) Helpers de insercion con cache en memoria
  // ---------------------------------------------------------------------------
  const createUser = async (name: string, preferredEmail: string, role: UserRole, suffix: string) => {
    const uniqueEmail = toUniqueEmail(preferredEmail, usedEmails, suffix);
    const inserted = await db.insert(users).values({
      name,
      email: uniqueEmail,
      password,
      role,
    }).returning().get();

    usersByEmail.set(inserted.email, { id: inserted.id, name: inserted.name, role: inserted.role });
    return inserted;
  };
  
  const ensureTeacher = async (name: string, email?: string) => {
    const normalizedName = name.trim();
    const existing = teachersByName.get(normalizedName);
    if (existing) {
      return existing;
    }

    const preferredEmail = email ?? `${slugify(normalizedName) || 'teacher'}@university.edu`;
    const created = await createUser(normalizedName, preferredEmail, 'teacher', `teacher.${slugify(normalizedName)}`);
    const teacher = { id: created.id, email: created.email };
    teachersByName.set(normalizedName, teacher);
    return teacher;
  };

  const ensureCareer = async (name: string) => {
    const normalizedName = name.trim();
    const existing = careersByName.get(normalizedName);
    if (existing) {
      return existing;
    }

    const created = await db.insert(careers).values({ name: normalizedName }).returning().get();
    careersByName.set(normalizedName, created);
    return created;
  };

  const ensureSubject = async (name: string, code: string, credits: number, careerName: string) => {
    const normalizedCode = code.trim();
    const existing = subjectsByCode.get(normalizedCode);
    if (existing) {
      return existing;
    }

    const career = await ensureCareer(careerName);
    const created = await db.insert(subjects).values({
      name: name.trim(),
      code: normalizedCode,
      credits,
      careerId: career.id,
    }).returning().get();

    subjectsByCode.set(normalizedCode, created);
    return created;
  };

  // ---------------------------------------------------------------------------
  // 4) Usuarios base y carreras principales
  // ---------------------------------------------------------------------------
  const analyst = await createUser('System Analyst', 'analyst@university.edu', 'analyst', 'analyst');
  const student1 = await createUser('Anthony Ruiz', 'student@example.com', 'student', 'anthony');
  const student2 = await createUser('Maria Lopez', 'maria@example.com', 'student', 'maria');

  await ensureCareer('Ingenieria en Computacion');
  await ensureCareer('Ingenieria en Sistemas');
  await ensureCareer('Informatica');
  await ensureCareer('Administracion');
  await ensureCareer('Turismo');

  // ---------------------------------------------------------------------------
  // 5) Carga de materias y docentes desde datasets
  // ---------------------------------------------------------------------------
  for (const semester of computerScienceCurriculum) {
    for (const subject of semester.subjects) {
      await ensureSubject(subject.name, subject.code, subject.credits, 'Ingenieria en Computacion');
      await ensureTeacher(subject.teacher);
      for (const candidate of subject.teachers ?? []) {
        await ensureTeacher(candidate.name, candidate.email);
      }
    }
  }

  for (const semester of semesterSubjectsData) {
    const careerName = semester.career ?? 'Ingenieria en Sistemas';
    await ensureCareer(careerName);

    for (const subject of semester.subjects) {
      await ensureSubject(subject.name, subject.code, subject.credits, careerName);
      if (subject.teacherAssing?.name) {
        await ensureTeacher(subject.teacherAssing.name);
      }
      for (const candidate of subject.teacherOptions ?? []) {
        await ensureTeacher(candidate.name);
      }
    }
  }

  for (const semester of recoverySubjectsData) {
    for (const subject of semester.subjects) {
      await ensureSubject(subject.name, subject.code, subject.credits, 'Ingenieria en Sistemas');
      if (subject.teacherAssing?.name) {
        await ensureTeacher(subject.teacherAssing.name);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 6) Creacion de secciones academicas y opciones de docente
  // ---------------------------------------------------------------------------
  const insertedSections: Array<{ id: string }> = [];

  for (const semester of computerScienceCurriculum) {
    const career = careersByName.get('Ingenieria en Computacion');
    if (!career) continue;

    for (const subject of semester.subjects) {
      const currentSubject = subjectsByCode.get(subject.code);
      const teacher = teachersByName.get(subject.teacher);
      if (!currentSubject) continue;

      const createdSection = await db.insert(sections).values({
        careerId: career.id,
        subjectId: currentSubject.id,
        teacherId: teacher?.id,
        semesterLabel: semester.semester,
        semesterOrder: parseSemesterOrder(semester.semester),
        turn: semester.turn,
        classroom: subject.classroom,
        day: subject.day,
        time: subject.time,
        block: semester.block,
        isRecovery: false,
        source: 'curriculum',
      }).returning().get();

      insertedSections.push(createdSection);

      for (const candidate of subject.teachers ?? []) {
        const optionTeacher = teachersByName.get(candidate.name);
        if (!optionTeacher) continue;

        await db.insert(sectionTeacherOptions).values({
          sectionId: createdSection.id,
          teacherId: optionTeacher.id,
        });
      }
    }
  }

  for (const semester of semesterSubjectsData) {
    const careerName = semester.career ?? 'Ingenieria en Sistemas';
    const career = careersByName.get(careerName);
    if (!career) continue;

    for (const subject of semester.subjects) {
      const currentSubject = subjectsByCode.get(subject.code);
      if (!currentSubject) continue;

      const teacherId = subject.teacherAssing?.name ? teachersByName.get(subject.teacherAssing.name)?.id : undefined;
      const createdSection = await db.insert(sections).values({
        careerId: career.id,
        subjectId: currentSubject.id,
        teacherId,
        semesterLabel: semester.semester,
        semesterOrder: parseSemesterOrder(semester.semester),
        turn: semester.turn,
        classroom: subject.classroom || 'Por definir',
        day: subject.day || 'Por definir',
        time: subject.time || 'Por definir',
        block: semester.block,
        isRecovery: false,
        source: 'semester_assignment',
      }).returning().get();

      insertedSections.push(createdSection);

      for (const candidate of subject.teacherOptions ?? []) {
        const optionTeacher = teachersByName.get(candidate.name);
        if (!optionTeacher) continue;

        await db.insert(sectionTeacherOptions).values({
          sectionId: createdSection.id,
          teacherId: optionTeacher.id,
        });
      }
    }
  }

  const systemsCareer = careersByName.get('Ingenieria en Sistemas');
  if (systemsCareer) {
    for (const semester of recoverySubjectsData) {
      for (const subject of semester.subjects) {
        const currentSubject = subjectsByCode.get(subject.code);
        if (!currentSubject) continue;

        const teacherId = subject.teacherAssing?.name ? teachersByName.get(subject.teacherAssing.name)?.id : undefined;
        const createdSection = await db.insert(sections).values({
          careerId: systemsCareer.id,
          subjectId: currentSubject.id,
          teacherId,
          semesterLabel: semester.semester,
          semesterOrder: 0,
          turn: semester.turn,
          classroom: subject.classroom,
          day: subject.day,
          time: subject.time,
          block: semester.block,
          isRecovery: true,
          source: 'recovery',
        }).returning().get();

        insertedSections.push(createdSection);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 7) Cohortes externas y perfiles de estudiantes
  // ---------------------------------------------------------------------------
  for (const section of sectionListData) {
    const career = await ensureCareer(section.career);
    const createdCohort = await db.insert(cohortSections).values({
      externalCode: section.idSection,
      careerId: career.id,
      semester: section.semester,
      turn: section.turn,
      totalStudents: section.totalStudents,
      classroom: section.classroom,
      day: section.day,
      time: section.time,
    }).returning().get();

    for (const student of section.students ?? []) {
      const baseEmail = student.email || `${slugify(student.name)}@student.university.edu`;
      const studentEmail = toUniqueEmail(baseEmail, usedEmails, `student.${section.idSection}.${student.id}`);
      const createdStudent = await db.insert(users).values({
        name: student.name,
        email: studentEmail,
        password,
        role: 'student',
      }).returning().get();

      await db.insert(studentProfiles).values({
        userId: createdStudent.id,
        phone: student.phone,
        address: student.address,
        cohortSectionId: createdCohort.id,
      });
    }
  }

  // Perfiles manuales para usuarios base de prueba.
  const profileStudent = await db.insert(studentProfiles).values({
    userId: student1.id,
    phone: '555-0101',
    address: 'Main Campus - Student Residence',
  }).returning().get();

  await db.insert(studentProfiles).values({
    userId: student2.id,
    phone: '555-0102',
    address: 'North Campus - Student Residence',
  }).returning().get();

  void profileStudent;

  // ---------------------------------------------------------------------------
  // 8) Historial academico detallado por semestre y notas
  // ---------------------------------------------------------------------------
  const historyStudentMap = [student1.id, student2.id];

  for (let idx = 0; idx < academicHistoryData.length; idx += 1) {
    const history = academicHistoryData[idx];
    const studentId = historyStudentMap[idx] ?? student1.id;
    const career = await ensureCareer(history.degree);

    const createdHistory = await db.insert(academicHistories).values({
      studentId,
      careerId: career.id,
      degreeName: history.degree,
    }).returning().get();

    for (const semester of history.semesters) {
      const createdSemester = await db.insert(academicSemesters).values({
        academicHistoryId: createdHistory.id,
        semesterLabel: semester.semester,
        status: semester.status,
        creditsEarned: semester.creditsEarned,
        creditsTotal: semester.creditsTotal,
        gpa: semester.gpa,
      }).returning().get();

      for (const grade of semester.grades) {
        const matchedSubject = Array.from(subjectsByCode.values()).find((item) => item.name === grade.subject);
        const subjectName = grade.subject ?? 'Sin asignatura';

        await db.insert(academicSemesterGrades).values({
          academicSemesterId: createdSemester.id,
          ...(matchedSubject?.id ? { subjectId: matchedSubject.id } : {}),
          subjectName,
          evaluation1: grade.evaluation1,
          evaluation2: grade.evaluation2,
          evaluation3: grade.evaluation3,
          evaluation4: grade.evaluation4,
          evaluation5: grade.evaluation5,
          evaluation6: grade.evaluation6,
          evaluation7: grade.evaluation7,
          evaluation8: grade.evaluation8,
          finalGrade: finalGrade(grade),
        });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // 9) Inscripciones y calificaciones demo
  // ---------------------------------------------------------------------------
  const enrollSectionA = insertedSections[0];
  const enrollSectionB = insertedSections[1] ?? insertedSections[0];

  

  if (enrollSectionA) {
    const gradeA = gradesData[0];
    const gradeASubjectCode = gradeA?.subject ? subjectsByCode.get(gradeA.subject)?.code : undefined;

    const enrollmentA = await db.insert(enrollments).values({
      studentId: student1.id,
      sectionId: enrollSectionA.id,
      status: 'completed',
      recovery: false,
    }).returning().get();

    await db.insert(grades).values({
      enrollmentId: enrollmentA.id,
      studentId: student1.id,
      ...(gradeASubjectCode ? { subjectCode: gradeASubjectCode } : {}),
      career: 'Ingenieria en Computacion',
      semester: String(gradeA?.semester ?? 0),
      evaluation1: gradeA?.evaluation1 ?? 0,
      evaluation2: gradeA?.evaluation2 ?? 0,
      evaluation3: gradeA?.evaluation3 ?? 0,
      evaluation4: gradeA?.evaluation4 ?? 0,
      evaluation5: gradeA?.evaluation5 ?? 0,
      evaluation6: gradeA?.evaluation6 ?? 0,
      evaluation7: gradeA?.evaluation7 ?? 0,
      evaluation8: gradeA?.evaluation8 ?? 0,
      finalGrade: finalGrade(gradeA ?? {
        id: 'seed-grade-a',
        evaluation1: 0,
        evaluation2: 0,
        evaluation3: 0,
        evaluation4: 0,
        evaluation5: 0,
        evaluation6: 0,
        evaluation7: 0,
        evaluation8: 0,
      }),
    });
  }

  if (enrollSectionB) {
    const gradeB = gradesData[1];
    const gradeBSubjectCode = gradeB?.subject ? subjectsByCode.get(gradeB.subject)?.code : undefined;

    const enrollmentB = await db.insert(enrollments).values({
      studentId: student2.id,
      sectionId: enrollSectionB.id,
      status: 'enrolled',
      recovery: false,
    }).returning().get();



    await db.insert(grades).values({
      enrollmentId: enrollmentB.id,
      studentId: student2.id,
      ...(gradeBSubjectCode ? { subjectCode: gradeBSubjectCode } : {}),
      career: 'Ingenieria en Computacion',
      semester: String(gradeB?.semester ?? 0),
      evaluation1: gradeB?.evaluation1 ?? 0,
      evaluation2: gradeB?.evaluation2 ?? 0,
      evaluation3: gradeB?.evaluation3 ?? 0,
      evaluation4: gradeB?.evaluation4 ?? 0,
      evaluation5: gradeB?.evaluation5 ?? 0,
      evaluation6: gradeB?.evaluation6 ?? 0,
      evaluation7: gradeB?.evaluation7 ?? 0,
      evaluation8: gradeB?.evaluation8 ?? 0,
      finalGrade: finalGrade(gradeB ?? {
        id: 'seed-grade-b',
        evaluation1: 0,
        evaluation2: 0,
        evaluation3: 0,
        evaluation4: 0,
        evaluation5: 0,
        evaluation6: 0,
        evaluation7: 0,
        evaluation8: 0,
      }),
    });
  }

  // ---------------------------------------------------------------------------
  // 10) Solicitudes administrativas de ejemplo
  // ---------------------------------------------------------------------------
  await db.insert(requests).values([
    {
      studentId: student1.id,
      type: 'degree_act',
      status: 'pending',
    },
    {
      studentId: student1.id,
      type: 'certified_notes',
      status: 'completed',
    },
    {
      studentId: student2.id,
      type: 'study_certificate',
      status: 'pending',
    },
    {
      studentId: student2.id,
      type: 'registration_certificate',
      status: 'rejected',
    },
  ]);

  void analyst;

  // Cierre del proceso de seed.
  console.log('Database seeded successfully!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
