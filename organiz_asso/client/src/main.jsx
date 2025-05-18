import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './components/Login.jsx';
import Test from './components/test.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
