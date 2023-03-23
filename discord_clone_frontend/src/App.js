import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { login, selectUser, logout } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';



function App() {
 const dispatch = useDispatch()
 const user = useSelector(selectUser)

 useEffect(() => {
  auth.onAuthStateChanged((authUser) => {
   if (authUser) {
    //The user is logged in
    dispatch(login({
     uid: authUser.uid,
     photo: authUser.photoURL,
     email: authUser.email,
     displayName: authUser.displayName,
    }))
   } else {
    //The user is logged out
    dispatch(logout())
   }
  })
 }, [dispatch])
 return (
  <div className="app">
   {user ? (
    <>
     <Sidebar />
     <Chat />
    </>
   ) : (
    <Login />
   )}
  </div>
 );
}

export default App;