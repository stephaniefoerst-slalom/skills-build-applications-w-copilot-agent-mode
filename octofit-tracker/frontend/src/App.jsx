import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL, isUsingLocalApi } from './api.js'
import './App.css'

const navItems = [
  { path: '/users', label: 'Users' },
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="border-bottom bg-white">
        <nav className="navbar navbar-expand-lg container py-3" aria-label="Primary navigation">
          <NavLink className="navbar-brand fw-semibold" to="/users">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-2 ms-lg-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                className={({ isActive }) =>
                  `nav-link rounded px-3 py-2 ${isActive ? 'active' : ''}`
                }
                to={item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="container py-4">
        {isUsingLocalApi && (
          <div className="alert alert-warning" role="status">
            Define VITE_CODESPACE_NAME in .env.local to target the Codespaces API host.
            Falling back to <span className="fw-semibold">{API_BASE_URL}</span> for local
            development.
          </div>
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
