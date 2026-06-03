import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Maya Chen', email: 'maya.chen@mergington.edu', role: 'student', team: 'Cardio Crew' },
    { name: 'Jordan Smith', email: 'jordan.smith@mergington.edu', role: 'student', team: 'Strength Squad' },
    { name: 'Avery Johnson', email: 'avery.johnson@mergington.edu', role: 'student', team: 'Cardio Crew' },
    { name: 'Riley Patel', email: 'riley.patel@mergington.edu', role: 'student', team: 'Flex Force' },
    { name: 'Paul Octo', email: 'paul.octo@mergington.edu', role: 'coach' },
  ]);

  const maya = users[0];
  const jordan = users[1];
  const avery = users[2];
  const riley = users[3];

  await Team.insertMany([
    { name: 'Cardio Crew', coach: 'Paul Octo', members: [maya._id, avery._id] },
    { name: 'Strength Squad', coach: 'Paul Octo', members: [jordan._id] },
    { name: 'Flex Force', coach: 'Paul Octo', members: [riley._id] },
  ]);

  await Activity.insertMany([
    { userId: maya._id, type: 'Running', durationMinutes: 32, points: 64, completedAt: new Date('2026-05-28T15:30:00Z') },
    { userId: jordan._id, type: 'Strength Training', durationMinutes: 45, points: 75, completedAt: new Date('2026-05-29T16:15:00Z') },
    { userId: avery._id, type: 'Cycling', durationMinutes: 50, points: 80, completedAt: new Date('2026-05-30T14:45:00Z') },
    { userId: riley._id, type: 'Yoga', durationMinutes: 35, points: 48, completedAt: new Date('2026-05-31T13:00:00Z') },
    { userId: maya._id, type: 'Walking', durationMinutes: 40, points: 40, completedAt: new Date('2026-06-01T12:20:00Z') },
  ]);

  await LeaderboardEntry.insertMany([
    { userId: avery._id, points: 80, rank: 1 },
    { userId: jordan._id, points: 75, rank: 2 },
    { userId: maya._id, points: 64, rank: 3 },
    { userId: riley._id, points: 48, rank: 4 },
  ]);

  await Workout.insertMany([
    {
      title: 'After-School 10K Builder',
      description: 'A steady run-walk session designed to build endurance for new runners.',
      difficulty: 'beginner',
      durationMinutes: 30,
    },
    {
      title: 'Full-Body Circuit',
      description: 'Bodyweight squats, pushups, planks, and lunges arranged in repeatable rounds.',
      difficulty: 'intermediate',
      durationMinutes: 40,
    },
    {
      title: 'Advanced Agility Ladder',
      description: 'Fast footwork drills for coordination, conditioning, and sport readiness.',
      difficulty: 'advanced',
      durationMinutes: 25,
    },
    {
      title: 'Recovery Mobility Flow',
      description: 'Low-impact stretches for flexibility, balance, and post-workout recovery.',
      difficulty: 'beginner',
      durationMinutes: 20,
    },
  ]);

  console.log('Seed data inserted for users, teams, activities, leaderboard, and workouts');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });