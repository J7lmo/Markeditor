import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes,Route } from 'react-router-dom';
import { Footer ,Navbar,Header,Home,Login } from './item'
import './App.css'
const App = () => {
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      </Routes>  
    </div>
  )
}

export default App