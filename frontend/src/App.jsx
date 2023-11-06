import './App.css'
import React from 'react'
import SignUp from '../pages/signUp'
import HomePage from '../pages/homePage'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/SignUp" element={<SignUp/>}/>
    </Routes>
  </BrowserRouter>)
}

export default App
