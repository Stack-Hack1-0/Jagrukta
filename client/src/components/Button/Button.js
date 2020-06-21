import React from 'react';
import Styles from './Button.module.css';

const button = props => {
    return(
        <button 
        onClick={props.clicked} 
        disabled={props.disabled}
        className={[Styles.Button ,Styles[props.type]].join(' ')}>
        {props.children}</button>
    );
}
export default button;