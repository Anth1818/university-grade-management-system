import { db } from './index';
import { users, subjects, sections, enrollments, grades } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Cleaning database...');
  await db.delete(grades);
  await db.delete(enrollments);
  await db.delete(sections);
  await db.delete(subjects);
  await db.delete(users);

  console.log('Seeding database...');

  const password = bcrypt.hashSync('password123', 10);

  // Users
  const student1 = await db.insert(users).values({
    name: 'Anthony Ruiz',
    email: 'student@example.com',
    password: password,
    role: 'student',
  }).returning().get();

  const student2 = await db.insert(users).values({
    name: 'Maria Lopez',
    email: 'maria@example.com',
    password: password,
    role: 'student',
  }).returning().get();

  const teacher = await db.insert(users).values({
    name: 'Prof. Garcia',
    email: 'teacher@example.com',
    password: password,
    role: 'teacher',
  }).returning().get();

  // Subjects Semester 1
  const sub1_1 = await db.insert(subjects).values({
    name: 'Programación 1',
    code: 'PROG1',
    credits: 3,
    career: 'Ingeniería en Computación',
  }).returning().get();

  const sub1_2 = await db.insert(subjects).values({
    name: 'Matemática 1',
    code: 'MAT1',
    credits: 4,
    career: 'Ingeniería en Computación',
  }).returning().get();

  // Subjects Semester 2
  const sub2_1 = await db.insert(subjects).values({
    name: 'Programación 2',
    code: 'PROG2',
    credits: 3,
    career: 'Ingeniería en Computación',
  }).returning().get();

  const sub2_2 = await db.insert(subjects).values({
    name: 'Matemática 2',
    code: 'MAT2',
    credits: 4,
    career: 'Ingeniería en Computación',
  }).returning().get();

  // Sections Semester 1
  const sec1_1 = await db.insert(sections).values({
    subjectId: sub1_1.id,
    teacherId: teacher.id,
    semester: 1,
    turn: 'morning',
    classroom: 'A-101',
    day: 'Monday',
    time: '08:00 - 10:00',
    block: 'A',
  }).returning().get();

  const sec1_2 = await db.insert(sections).values({
    subjectId: sub1_2.id,
    teacherId: teacher.id,
    semester: 1,
    turn: 'morning',
    classroom: 'A-102',
    day: 'Tuesday',
    time: '08:00 - 10:00',
    block: 'A',
  }).returning().get();

  // Sections Semester 2
  const sec2_1 = await db.insert(sections).values({
    subjectId: sub2_1.id,
    teacherId: teacher.id,
    semester: 2,
    turn: 'afternoon',
    classroom: 'B-201',
    day: 'Wednesday',
    time: '14:00 - 16:00',
    block: 'B',
  }).returning().get();

  // Recovery Sections (Semester 0)
  const sec_rec_1 = await db.insert(sections).values({
    subjectId: sub1_2.id, // Matemática 1
    teacherId: teacher.id,
    semester: 0,
    turn: 'mixed',
    classroom: 'R-101',
    day: 'Saturday',
    time: '09:00 - 12:00',
    block: 'A',
  }).returning().get();

  const sec_rec_2 = await db.insert(sections).values({
    subjectId: sub1_2.id,
    teacherId: teacher.id,
    semester: 0,
    turn: 'mixed',
    classroom: 'R-102',
    day: 'Saturday',
    time: '13:00 - 16:00',
    block: 'B',
  }).returning().get();

  // Enrollments for Student 1 (Anthony Ruiz)
  // Semester 1 (Completed)
  const enr1_1 = await db.insert(enrollments).values({
    studentId: student1.id,
    sectionId: sec1_1.id,
    status: 'completed',
    recovery: false,
  }).returning().get();

  await db.insert(grades).values({
    enrollmentId: enr1_1.id,
    studentId: student1.id,
    evaluation1: 15,
    evaluation2: 18,
    finalGrade: 16,
  });

  const enr1_2 = await db.insert(enrollments).values({
    studentId: student1.id,
    sectionId: sec1_2.id,
    status: 'completed',
    recovery: false,
  }).returning().get();

  await db.insert(grades).values({
    enrollmentId: enr1_2.id,
    studentId: student1.id,
    evaluation1: 10,
    evaluation2: 12,
    finalGrade: 11, // Fails if < 12 based on previous logic (but I used 10 in TableGrades)
  });

  // Semester 2 (In Progress)
  const enr2_1 = await db.insert(enrollments).values({
    studentId: student1.id,
    sectionId: sec2_1.id,
    status: 'enrolled',
    recovery: false,
  }).returning().get();

  await db.insert(grades).values({
    enrollmentId: enr2_1.id,
    studentId: student1.id,
    evaluation1: 14,
    finalGrade: 0,
  });

  /*
  // Recovery Enrollment
  const enr_rec = await db.insert(enrollments).values({
    studentId: student1.id,
    sectionId: sec1_2.id, // Recovering Matemática 1
    status: 'enrolled',
    recovery: true,
  }).returning().get();

  await db.insert(grades).values({
    enrollmentId: enr_rec.id,
    studentId: student1.id,
    evaluation1: 0,
    finalGrade: 0,
  });
  */

  console.log('Database seeded successfully!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
