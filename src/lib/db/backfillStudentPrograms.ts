import { and, desc, eq } from 'drizzle-orm';
import { db } from './index';
import {
  academicHistories,
  academicSemesters,
  careers,
  cohortSections,
  studentProfiles,
  studentPrograms,
  studentSemesterHistory,
  users,
} from './schema';

const parseSemesterOrder = (value: string | null | undefined) => {
  if (!value) return null;
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : null;
};

async function main() {
  const allStudents = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.role, 'student'));

  const fallbackCareer = await db.select({ id: careers.id }).from(careers).limit(1);
  const fallbackCareerId = fallbackCareer[0]?.id;

  let createdPrograms = 0;
  let createdSemesterHistoryRows = 0;
  let skippedStudents = 0;

  for (const student of allStudents) {
    const existingProgram = await db
      .select({ id: studentPrograms.id })
      .from(studentPrograms)
      .where(eq(studentPrograms.studentId, student.id))
      .limit(1);

    if (existingProgram.length > 0) {
      skippedStudents += 1;
      continue;
    }

    const historyRows = await db
      .select({
        id: academicHistories.id,
        careerId: academicHistories.careerId,
      })
      .from(academicHistories)
      .where(eq(academicHistories.studentId, student.id))
      .orderBy(desc(academicHistories.createdAt));

    const latestHistory = historyRows[0];

    if (latestHistory) {
      const semesterRows = await db
        .select({
          semesterLabel: academicSemesters.semesterLabel,
          status: academicSemesters.status,
          creditsEarned: academicSemesters.creditsEarned,
          creditsTotal: academicSemesters.creditsTotal,
          gpa: academicSemesters.gpa,
        })
        .from(academicSemesters)
        .where(eq(academicSemesters.academicHistoryId, latestHistory.id));

      const latestSemester = semesterRows.reduce(
        (acc, semester, idx) => {
          const order = parseSemesterOrder(semester.semesterLabel) ?? idx + 1;
          if (order > acc.order) {
            return { order, label: semester.semesterLabel };
          }
          return acc;
        },
        { order: 1, label: semesterRows[0]?.semesterLabel ?? 'Semestre 1' }
      );

      const createdProgram = await db
        .insert(studentPrograms)
        .values({
          studentId: student.id,
          careerId: latestHistory.careerId,
          currentSemesterOrder: latestSemester.order,
          currentSemesterLabel: latestSemester.label,
          currentTurn: 'matutino',
          admissionPeriod: '2026-1',
          status: 'active',
        })
        .returning({ id: studentPrograms.id })
        .get();

      createdPrograms += 1;

      if (semesterRows.length > 0) {
        const semesterHistoryValues = semesterRows.map((semester, idx) => ({
          studentProgramId: createdProgram.id,
          semesterOrder: parseSemesterOrder(semester.semesterLabel) ?? idx + 1,
          semesterLabel: semester.semesterLabel,
          turn: 'matutino' as const,
          status: semester.status,
          creditsTaken: semester.creditsTotal,
          creditsApproved: semester.creditsEarned,
          gpa: semester.gpa,
        }));

        await db.insert(studentSemesterHistory).values(semesterHistoryValues);
        createdSemesterHistoryRows += semesterHistoryValues.length;
      }

      continue;
    }

    const profileRows = await db
      .select({ cohortSectionId: studentProfiles.cohortSectionId })
      .from(studentProfiles)
      .where(eq(studentProfiles.userId, student.id))
      .limit(1);

    const cohortSectionId = profileRows[0]?.cohortSectionId;

    if (cohortSectionId) {
      const cohortRows = await db
        .select({
          careerId: cohortSections.careerId,
          semester: cohortSections.semester,
          turn: cohortSections.turn,
        })
        .from(cohortSections)
        .where(eq(cohortSections.id, cohortSectionId))
        .limit(1);

      const cohort = cohortRows[0];
      if (cohort) {
        const createdProgram = await db
          .insert(studentPrograms)
          .values({
            studentId: student.id,
            careerId: cohort.careerId,
            currentSemesterOrder: cohort.semester,
            currentSemesterLabel: `Semestre ${cohort.semester}`,
            currentTurn: cohort.turn,
            admissionPeriod: '2026-1',
            status: 'active',
          })
          .returning({ id: studentPrograms.id })
          .get();

        createdPrograms += 1;

        await db.insert(studentSemesterHistory).values({
          studentProgramId: createdProgram.id,
          semesterOrder: cohort.semester,
          semesterLabel: `Semestre ${cohort.semester}`,
          turn: cohort.turn as 'matutino' | 'vespertino' | 'nocturno',
          status: 'in-progress',
          creditsTaken: 0,
          creditsApproved: 0,
          gpa: 0,
        });

        createdSemesterHistoryRows += 1;
        continue;
      }
    }

    if (!fallbackCareerId) {
      console.warn(`Skipping ${student.email}: no fallback career available.`);
      continue;
    }

    await db.insert(studentPrograms).values({
      studentId: student.id,
      careerId: fallbackCareerId,
      currentSemesterOrder: 1,
      currentSemesterLabel: 'Semestre 1',
      currentTurn: 'matutino',
      admissionPeriod: '2026-1',
      status: 'active',
    });

    createdPrograms += 1;
  }

  console.log('Backfill completed', {
    totalStudents: allStudents.length,
    createdPrograms,
    createdSemesterHistoryRows,
    skippedStudents,
  });
}

main().catch((error) => {
  console.error('Backfill failed:', error);
  process.exit(1);
});
