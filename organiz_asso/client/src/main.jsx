import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx'
import Home from "./components/Home.jsx"
import Profile from "./components/Profile.jsx";
import UserProfile from "./components/UserProfile.jsx";
import './css/DarkTheme.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
