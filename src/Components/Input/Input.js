import React from "react";
import './Input.scss';

const Input = (props) => {
    return (
        <input className={props.className} type={props.text} autoComplete={props.autoComplete} name={props.name} onChange={props.onChange} placeholder={props.placeholder} value={props.value} disabled={props.disabled} />
    )
}

export default Input;