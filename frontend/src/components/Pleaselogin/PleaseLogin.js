import React from 'react';
import { Link } from 'react-router-dom';
import classes from './PleaseLogin.module.css'
import Button from '../Button/Button';

function PleaseLogin(props) {
  return (
    <div className={classes.wrapper} >
      <img alt="loginImage"  src="/images/login.jpg"  className={classes["login-image"]}  />
      <p className={classes["sub-text"]} > Please login to proceed </p>
      <Link to="/login" className={classes["login-link"]} > <Button> Login </Button> </Link>
    </div>
  );
}

export default PleaseLogin;