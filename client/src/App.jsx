import React from 'react'
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
// import { BrowserRouter, Route, Routes, Navigate, Redirect } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import PageNotFound from './pages/PageNotFound'



export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />}  />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<PageNotFound />} />
        


      </Routes>
    
    
    </BrowserRouter>
  )
}
