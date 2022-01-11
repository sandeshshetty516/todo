import React, { useEffect, useState } from 'react';
import './App.scss';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage';
import Register from './Pages/Register/Register';
import Signin from './Pages/Signin/Signin';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users'))
    setUser(users)
  }, [])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(user))
  }, [user])

  return (
    <Router>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route exact path='/' element={user === null ? <Navigate to='/signin' /> : <Homepage user={user}/>}></Route>
        <Route path='/signin'  element={user ? <Navigate to='/'/> : <Signin setUser={setUser}/>}></Route>
        <Route path='/register'  element={user ? <Navigate to='/'/> : <Register setUser={setUser}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
