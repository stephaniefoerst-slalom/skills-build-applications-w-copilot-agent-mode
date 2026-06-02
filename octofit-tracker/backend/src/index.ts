import express from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker Backend is running', baseUrl });
});

app.get('/api/users/', async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
});

app.post('/api/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get('/api/teams/', async (req, res) => {
  const teams = await Team.find().populate('members', 'name email').sort({ name: 1 });
  res.json(teams);
});

app.post('/api/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get('/api/activities/', async (req, res) => {
  const activities = await Activity.find().populate('userId', 'name email').sort({ completedAt: -1 });
  res.json(activities);
});

app.post('/api/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get('/api/leaderboard/', async (req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('userId', 'name email').sort({ rank: 1 });
  res.json(leaderboard);
});

app.post('/api/leaderboard/', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

app.get('/api/workouts/', async (req, res) => {
  const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
  res.json(workouts);
});

app.post('/api/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on ${baseUrl}`);
});
