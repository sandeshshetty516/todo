import React, { useState } from 'react';
import './App.scss';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Pages/Homepage/Homepage';
import Register from './Pages/Register/Register';
import Signin from './Pages/Signin/Signin';

function App() {

  const [route, setRoute] = useState('signin');
  const [signIn, setSignIn] = useState(false);
  const [user, setUser] = useState({
    id:'',
    name:'',
    email:''
  })

  const loadUser = (data) => {
    setUser({
      id: data.user_id,
      name: data.name,
      email: data.email
    })
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setSignIn(false)
    } else if (route === 'home') {
      setSignIn(true)
    }
    setRoute(route)
  }

  return (
    <div>
      <Navbar signIn={signIn} onRouteChange={onRouteChange} />
      { route === 'home' 
      ? <Homepage name={user.name} uId={user.id} />
      : ( route === 'register' 
      ? <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      : <Signin loadUser={loadUser}  onRouteChange={onRouteChange} />)
      }
      
    </div>
  );
}

export default App;
