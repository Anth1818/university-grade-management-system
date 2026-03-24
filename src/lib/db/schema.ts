import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['student', 'teacher', 'analyst'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const subjects = sqliteTable('subjects', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  code: text('code').notNull().unique(),
  credits: integer('credits').notNull(),
  career: text('career').notNull(),
});

export const sections = sqliteTable('sections', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  subjectId: text('subject_id').notNull().references(() => subjects.id),
  teacherId: text('teacher_id').notNull().references(() => users.id),
  semester: integer('semester').notNull(),
  turn: text('turn').notNull(), // e.g., 'morning', 'afternoon', 'night'
  classroom: text('classroom').notNull(),
  day: text('day').notNull(),
  time: text('time').notNull(),
  block: text('block'), // e.g., 'A', 'B'
});

export const sectionsRelations = relations(sections, ({ one }) => ({
  subject: one(subjects, {
    fields: [sections.subjectId],
    references: [subjects.id],
  }),
  teacher: one(users, {
    fields: [sections.teacherId],
    references: [users.id],
  }),
}));

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
}));

export const requests = sqliteTable('requests', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  studentId: text('student_id').notNull().references(() => users.id),
  type: text('type', { enum: ['degree_act', 'certified_notes', 'study_certificate', 'registration_certificate'] }).notNull(),
  status: text('status', { enum: ['pending', 'completed', 'rejected'] }).notNull().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
