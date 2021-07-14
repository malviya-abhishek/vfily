import React from 'react';
import { Redirect } from 'react-router';

function Logout(props) {
  
  localStorage.removeItem( 'token');
  localStorage.removeItem( 'refreshToken');

  return (
    <Redirect to="/" />
  );
}

export default Logout;