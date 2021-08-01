import React from 'react';
import classes from './Button.module.css'

function Button(props) {
  return (
    <button onClick={props.onClickHandler} className={ props.danger ? classes["btn-red"]:  classes.btn } > {props.children}  </button>
  );
}

export default Button;