import { db } from './index';
import { users, subjects, sections } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('Seeding database...');

  const password = bcrypt.hashSync('password123', 10);

  // Users
  const student = await db.insert(users).values({
    name: 'Anthony Ruiz',
    email: 'student@example.com',
    password: password,
    role: 'student',
  }).returning().get();

  const teacher = await db.insert(users).values({
    name: 'Prof. Garcia',
    email: 'teacher@example.com',
    password: password,
    role: 'teacher',
  }).returning().get();

  const analyst = await db.insert(users).values({
    name: 'Admin User',
    email: 'analyst@example.com',
    password: password,
    role: 'analyst',
  }).returning().get();

  // Subjects
  const subject1 = await db.insert(subjects).values({
    name: 'Programación 1',
    code: 'PROG1',
    credits: 3,
    career: 'Ingeniería en Computación',
  }).returning().get();

  const subject2 = await db.insert(subjects).values({
    name: 'Inglés 1',
    code: 'ING1',
    credits: 2,
    career: 'Ingeniería en Computación',
  }).returning().get();

  // Sections
  await db.insert(sections).values([
    {
      subjectId: subject1.id,
      teacherId: teacher.id,
      semester: 1,
      turn: 'morning',
      classroom: 'A-101',
      day: 'Monday',
      time: '08:00 - 10:00',
    },
    {
      subjectId: subject2.id,
      teacherId: teacher.id,
      semester: 1,
      turn: 'afternoon',
      classroom: 'B-202',
      day: 'Wednesday',
      time: '14:00 - 16:00',
    },
  ]);

  console.log('Database seeded successfully!');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
