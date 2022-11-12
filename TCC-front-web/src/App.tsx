import React, { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import Login from "./pages/Login"
import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Donations from './pages/Donations';
import Notifications from './pages/Notifcations';

export default function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route path="/" element={user?.role === 'admin' ? <Dashboard /> : <Login />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  )
}