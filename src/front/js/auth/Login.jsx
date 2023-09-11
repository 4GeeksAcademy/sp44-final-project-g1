import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useForms } from '../hooks/useForms';
import { Context } from "../store/appContext";



export const Login = () => {

    const {store, actions} = useContext (Context)

    const {formState, onInputChange} = useForms({email: '', password: ''});

    const navigate = useNavigate();

    const onLogin = () => {
        if (formState.email && formState.password){
            actions.Login()
            navigate('/', {replace: true})
        }        
    }

    return (
        
        <div className="container mt-5">
            <h1 className='text-center text-light'>Login</h1>
            <hr />

            <form className="text-light">
                <div className="mb-3">

                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control bg-dark text-light" name="email" onChange={ onInputChange } />
                        <div className="form-text text-light text-light"><small>Please enter test in the email and password field.</small></div>
                </div>

                <div className="mb-3">

                    <label className="form-label">Password</label>
                    <input type="password" className="form-control bg-dark text-light" name='password' onChange={ onInputChange } />
                </div>

                <button type="button" className="btn btn-primary" onClick={onLogin}>Login</button>
            </form>

        </div>
    )
}