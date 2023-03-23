import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";

function Login() {
 const signIn = () => {
  //<do clever Google login
  auth.signInWithPopup(provider).catch((error) => alert(error.message));
 };
 return (
  <div className="login">
   <div className="login__logo">
    <img
     src="https://www.technipages.com/wp-content/uploads/2020/09/discord-header.png"
     alt=""
    />
   </div>

   <Button onClick={signIn}>Sign In</Button>
  </div>
 );
}

export default Login;