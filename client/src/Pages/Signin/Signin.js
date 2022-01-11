import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { Link } from 'react-router-dom';

const Signin = ({setUser}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitSignin = () => {
        fetch('http://localhost:4000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.user_id) {
                setUser(user)
            } else {
                alert('Incorrect email or password')
            }
        })
    }

    return(
        <article className="br3 ba dark-gray bg-white b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pt4 pb3 ph4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <Input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <Input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent w-100" type="password" name="password"  id="password" />
                    </div>
                    
                    </fieldset>
                    <Link to='/'>
                    <div className="tc">
                        <Button onClick={onSubmitSignin} className="shadow-2 b ph3 pv2 input-reset ba b--blue bg-blue grow pointer f6 dib"  value='Sign In' />
                    </div>
                    </Link>
                    <Link to='/register'>
                    <div className="tc lh-copy mt2">
                        <p className=" b f6 link dim black db pointer">Register</p>
                    </div>
                    </Link>
                </div>
            </main>
        </article>
    )
}


export default Signin