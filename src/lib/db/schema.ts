import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';

// -----------------------------------------------------------------------------
// 1) Entidades base: usuarios y catalogos academicos
// -----------------------------------------------------------------------------
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['student', 'teacher', 'analyst'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const careers = sqliteTable('careers', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const careerSemesters = sqliteTable('career_semesters', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  careerId: text('career_id').notNull().references(() => careers.id),
  trayect: integer('trayect').notNull(),
  semesterOrder: integer('semester_order').notNull(),
  semesterLabel: text('semester_label').notNull(),
  turn: text('turn', { enum: ['matutino', 'vespertino', 'nocturno'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const subjects = sqliteTable('subjects', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  code: text('code').notNull().unique(),
  credits: integer('credits').notNull(),
  careerId: text('career_id').notNull().references(() => careers.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// -----------------------------------------------------------------------------
// 2) Oferta academica: secciones y docentes candidatos
// -----------------------------------------------------------------------------
export const sections = sqliteTable('sections', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  careerId: text('career_id').notNull().references(() => careers.id),
  subjectId: text('subject_id').notNull().references(() => subjects.id),
  teacherId: text('teacher_id').references(() => users.id),
  semesterLabel: text('semester_label').notNull(),
  semesterOrder: integer('semester_order'),
  turn: text('turn', { enum: ['matutino', 'vespertino', 'nocturno'] }).notNull(),
  classroom: text('classroom').notNull(),
  day: text('day').notNull(),
  time: text('time').notNull(),
  block: text('block'), // e.g., 'A', 'B'
  isRecovery: integer('is_recovery', { mode: 'boolean' }).default(false),
  source: text('source', { enum: ['curriculum', 'semester_assignment', 'recovery', 'manual'] }).notNull().default('manual'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const sectionTeacherOptions = sqliteTable('section_teacher_options', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  sectionId: text('section_id').notNull().references(() => sections.id),
  teacherId: text('teacher_id').notNull().references(() => users.id),
});

// -----------------------------------------------------------------------------
// 3) Cohortes y perfiles de estudiantes
// -----------------------------------------------------------------------------
export const cohortSections = sqliteTable('cohort_sections', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  externalCode: text('external_code').notNull().unique(),
  careerId: text('career_id').notNull().references(() => careers.id),
  semester: integer('semester').notNull(),
  turn: text('turn', { enum: ['matutino', 'vespertino', 'nocturno'] }).notNull(),
  totalStudents: integer('total_students').notNull(),
  classroom: text('classroom'),
  day: text('day'),
  time: text('time'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const studentProfiles = sqliteTable('student_profiles', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().unique().references(() => users.id),
  phone: text('phone'),
  address: text('address'),
  cohortSectionId: text('cohort_section_id').references(() => cohortSections.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const studentPrograms = sqliteTable('student_programs', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull().unique().references(() => users.id),
  careerId: text('career_id').notNull().references(() => careers.id),
  currentSemesterOrder: integer('current_semester_order').notNull().default(1),
  currentSemesterLabel: text('current_semester_label'),
  currentTurn: text('current_turn', { enum: ['matutino', 'vespertino', 'nocturno'] }).notNull().default('matutino'),
  admissionPeriod: text('admission_period'),
  status: text('status', { enum: ['active', 'paused', 'graduated', 'dropped'] }).notNull().default('active'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const studentSemesterHistory = sqliteTable('student_semester_history', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentProgramId: text('student_program_id').notNull().references(() => studentPrograms.id),
  semesterOrder: integer('semester_order').notNull(),
  semesterLabel: text('semester_label').notNull(),
  turn: text('turn', { enum: ['matutino', 'vespertino', 'nocturno'] }).notNull().default('matutino'),
  status: text('status', { enum: ['completed', 'in-progress', 'pending', 'failed', 'withdrawn'] }).notNull(),
  creditsTaken: integer('credits_taken').notNull().default(0),
  creditsApproved: integer('credits_approved').notNull().default(0),
  gpa: real('gpa').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Relaciones de secciones, cohortes y perfiles.
export const sectionsRelations = relations(sections, ({ one }) => ({
  career: one(careers, {
    fields: [sections.careerId],
    references: [careers.id],
  }),
  subject: one(subjects, {
    fields: [sections.subjectId],
    references: [subjects.id],
  }),
  teacher: one(users, {
    fields: [sections.teacherId],
    references: [users.id],
  }),
}));

export const sectionTeacherOptionsRelations = relations(sectionTeacherOptions, ({ one }) => ({
  section: one(sections, {
    fields: [sectionTeacherOptions.sectionId],
    references: [sections.id],
  }),
  teacher: one(users, {
    fields: [sectionTeacherOptions.teacherId],
    references: [users.id],
  }),
}));

export const careerSemestersRelations = relations(careerSemesters, ({ one }) => ({
  career: one(careers, {
    fields: [careerSemesters.careerId],
    references: [careers.id],
  }),
}));

export const cohortSectionsRelations = relations(cohortSections, ({ one, many }) => ({
  career: one(careers, {
    fields: [cohortSections.careerId],
    references: [careers.id],
  }),
  students: many(studentProfiles),
}));

export const studentProfilesRelations = relations(studentProfiles, ({ one }) => ({
  user: one(users, {
    fields: [studentProfiles.userId],
    references: [users.id],
  }),
  cohortSection: one(cohortSections, {
    fields: [studentProfiles.cohortSectionId],
    references: [cohortSections.id],
  }),
}));

export const studentProgramsRelations = relations(studentPrograms, ({ one, many }) => ({
  student: one(users, {
    fields: [studentPrograms.studentId],
    references: [users.id],
  }),
  career: one(careers, {
    fields: [studentPrograms.careerId],
    references: [careers.id],
  }),
  semesterHistory: many(studentSemesterHistory),
}));

export const studentSemesterHistoryRelations = relations(studentSemesterHistory, ({ one }) => ({
  program: one(studentPrograms, {
    fields: [studentSemesterHistory.studentProgramId],
    references: [studentPrograms.id],
  }),
}));

// -----------------------------------------------------------------------------
// 4) Inscripciones y calificaciones por seccion
// -----------------------------------------------------------------------------
export const enrollments = sqliteTable('enrollments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull().references(() => users.id),
  sectionId: text('section_id').notNull().references(() => sections.id),
  status: text('status', { enum: ['enrolled', 'completed', 'dropped'] }).notNull().default('enrolled'),
  recovery: integer('recovery', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const enrollmentsRelations = relations(enrollments, ({ one, many }) => ({
  student: one(users, {
    fields: [enrollments.studentId],
    references: [users.id],
  }),
  section: one(sections, {
    fields: [enrollments.sectionId],
    references: [sections.id],
  }),
  grades: many(grades),
}));

export const grades = sqliteTable('grades', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  enrollmentId: text('enrollment_id').notNull().references(() => enrollments.id),
  studentId: text('student_id').notNull().references(() => users.id),
  subjectCode: text('subject_code').references(() => subjects.code),
  semester: text('semester').notNull(),
  career: text('career').notNull(),
  evaluation1: real('evaluation1').default(0),
  evaluation2: real('evaluation2').default(0),
  evaluation3: real('evaluation3').default(0),
  evaluation4: real('evaluation4').default(0),
  evaluation5: real('evaluation5').default(0),
  evaluation6: real('evaluation6').default(0),
  evaluation7: real('evaluation7').default(0),
  evaluation8: real('evaluation8').default(0),
  finalGrade: real('final_grade').default(0),
});

export const gradesRelations = relations(grades, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [grades.enrollmentId],
    references: [enrollments.id],
  }),
  student: one(users, {
    fields: [grades.studentId],
    references: [users.id],
  }),
  subject: one(subjects, {
    fields: [grades.subjectCode],
    references: [subjects.code],
  }),
}));

// -----------------------------------------------------------------------------
// 5) Historial academico consolidado
// -----------------------------------------------------------------------------
export const academicHistories = sqliteTable('academic_histories', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull().references(() => users.id),
  careerId: text('career_id').notNull().references(() => careers.id),
  degreeName: text('degree_name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const academicSemesters = sqliteTable('academic_semesters', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  academicHistoryId: text('academic_history_id').notNull().references(() => academicHistories.id),
  semesterLabel: text('semester_label').notNull(),
  status: text('status', { enum: ['completed', 'in-progress', 'pending'] }).notNull(),
  creditsEarned: integer('credits_earned').notNull(),
  creditsTotal: integer('credits_total').notNull(),
  gpa: real('gpa').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const academicSemesterGrades = sqliteTable('academic_semester_grades', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  academicSemesterId: text('academic_semester_id').notNull().references(() => academicSemesters.id),
  subjectId: text('subject_id').references(() => subjects.id),
  subjectName: text('subject_name').notNull(),
  evaluation1: real('evaluation1').default(0),
  evaluation2: real('evaluation2').default(0),
  evaluation3: real('evaluation3').default(0),
  evaluation4: real('evaluation4').default(0),
  evaluation5: real('evaluation5').default(0),
  evaluation6: real('evaluation6').default(0),
  evaluation7: real('evaluation7').default(0),
  evaluation8: real('evaluation8').default(0),
  finalGrade: real('final_grade').default(0),
});

// -----------------------------------------------------------------------------
// 6) Solicitudes administrativas
// -----------------------------------------------------------------------------
export const requests = sqliteTable('requests', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull().references(() => users.id),
  type: text('type', { enum: ['degree_act', 'certified_notes', 'study_certificate', 'registration_certificate'] }).notNull(),
  status: text('status', { enum: ['pending', 'completed', 'rejected'] }).notNull().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// -----------------------------------------------------------------------------
// 7) Relaciones globales
// -----------------------------------------------------------------------------
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(studentProfiles, {
    fields: [users.id],
    references: [studentProfiles.userId],
  }),
  studentProgram: one(studentPrograms, {
    fields: [users.id],
    references: [studentPrograms.studentId],
  }),
  taughtSections: many(sections),
  enrollmentRecords: many(enrollments),
  gradeRecords: many(grades),
  requests: many(requests),
  availableTeacherSections: many(sectionTeacherOptions),
  academicHistories: many(academicHistories),
}));

export const careersRelations = relations(careers, ({ many }) => ({
  subjects: many(subjects),
  sections: many(sections),
  careerSemesters: many(careerSemesters),
  cohortSections: many(cohortSections),
  studentPrograms: many(studentPrograms),
  academicHistories: many(academicHistories),
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  career: one(careers, {
    fields: [subjects.careerId],
    references: [careers.id],
  }),
  sections: many(sections),
  academicSemesterGrades: many(academicSemesterGrades),
}));

export const academicHistoriesRelations = relations(academicHistories, ({ one, many }) => ({
  student: one(users, {
    fields: [academicHistories.studentId],
    references: [users.id],
  }),
  career: one(careers, {
    fields: [academicHistories.careerId],
    references: [careers.id],
  }),
  semesters: many(academicSemesters),
}));

export const academicSemestersRelations = relations(academicSemesters, ({ one, many }) => ({
  academicHistory: one(academicHistories, {
    fields: [academicSemesters.academicHistoryId],
    references: [academicHistories.id],
  }),
  grades: many(academicSemesterGrades),
}));

export const academicSemesterGradesRelations = relations(academicSemesterGrades, ({ one }) => ({
  academicSemester: one(academicSemesters, {
    fields: [academicSemesterGrades.academicSemesterId],
    references: [academicSemesters.id],
  }),
  subject: one(subjects, {
    fields: [academicSemesterGrades.subjectId],
    references: [subjects.id],
  }),
}));

export const requestsRelations = relations(requests, ({ one }) => ({
  student: one(users, {
    fields: [requests.studentId],
    references: [users.id],
  }),
}));
