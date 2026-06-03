# OctoFit Tracker - Multi-Tier Application

A modern multi-tier web application built with React 19, Express.js, TypeScript, and MongoDB.

## Architecture

- **Frontend**: React 19 with Vite (Port 5173)
- **Backend**: Express.js with TypeScript (Port 8000)
- **Database**: MongoDB (Port 27017)

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   ├── src/
│   ├── vite.config.js
│   └── package.json
└── backend/           # Express + TypeScript + Mongoose
    ├── src/
    │   └── index.ts
    ├── tsconfig.json
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB running on localhost:27017

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend API will be available at: `http://localhost:8000`

### Database Setup

Start MongoDB locally (requires MongoDB installed):
```bash
mongod --port 27017
```

Or use Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Configuration

### Ports
- **Frontend**: 5173
- **Backend**: 8000
- **MongoDB**: 27017

### Environment Variables (Backend)

Create a `.env` file in the backend directory if needed:
```
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
PORT=8000
NODE_ENV=development
CODESPACE_NAME=your-codespace-name
```

When `CODESPACE_NAME` is set, the API advertises and accepts the Codespaces URL:
`https://$CODESPACE_NAME-8000.app.github.dev`. Without it, the API uses
`http://localhost:8000`.

The frontend uses the same `CODESPACE_NAME` value through Vite and builds API
URLs with `src/api.js`.

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript
- `npm start` - Run compiled server

## Tech Stack

### Frontend
- React 19
- Vite
- ESLint + Prettier

### Backend
- Express.js
- TypeScript
- Mongoose (MongoDB ODM)
- Node.js

## API Health Check

Test the backend with:
```bash
curl http://localhost:8000/health
curl http://localhost:8000/api/users
curl http://localhost:8000/api/activities
```

Expected response:
```json
{
  "status": "OK",
  "message": "OctoFit Tracker Backend is running"
}
```
