import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/Login.jsx';
import Test from './components/test.jsx'
import SignUp from './components/SignUp.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
