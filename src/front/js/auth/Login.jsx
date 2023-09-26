import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import loGoOpen from "../../img/open-logo.png";

export const Login = () => {
    const { store, actions } = useContext(Context);
    
    const navigate = useNavigate();

    const onLogin = () => {
        actions.login('vendorQr')
        navigate('/products');
    };


    return (
        <div className="login container text-white" style={{ marginTop: '140px' }}>
            <img
                src={loGoOpen}
                className="img-login"
                alt="Logo"
            />
            <h1 className="text-center" style={{ marginTop: '110px' }}>¡Bienvenido a Ghop! </h1>

            {store.user.id && store.user.id != "" && store.user.id !== undefined ? (
                <p className="text-center">You are logged in with this token: {store.user.name}</p>
            ) : (
                <div>
                    <div className="d-grid gap-2">
                        <button type="button" className="btn-login btn btn-outline-light mt-5" onClick={onLogin}>Escanea tu Qr para empezar </button>
                    </div>
                </div>
            )}
        </div>
    );
};