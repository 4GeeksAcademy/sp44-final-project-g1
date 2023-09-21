import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Login = () => {

    const { store, actions } = useContext(Context);
    const [vendorQr, setVendorQr] = useState('');


    const navigate = useNavigate();

    // Obtiene el token almacenado en la sesión del navegador
    const user = store.user
    // console.log(user)

    const onLogin = () => {
        actions.login('vendorQr')
        navigate('/products');
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="container text-white" style={{ marginTop: '200px' }}>
                    <h1 className="text-center">Log in</h1>
                    {store.user.id && store.user.id != "" && store.user.id !== undefined ? (
                        <p className="text-center">You are logged in with this token: {store.user.name}</p>
                    ) : (
                        <div>
                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-outline-light mt-1" onClick={onLogin}>Scaner Qr</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};