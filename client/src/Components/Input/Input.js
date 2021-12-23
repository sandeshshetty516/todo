import React from "react";
import './Input.scss';

const Input = (props) => {
    return (
        <input onClick={props.onClick} className={props.className} type={props.type} autoComplete={props.autoComplete} name={props.name} onChange={props.onChange} placeholder={props.placeholder} value={props.value} disabled={props.disabled} />
    )
}

export default Input;