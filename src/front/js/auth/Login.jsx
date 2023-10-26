import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../store/appContext';
import loGoOpen from '../../img/open-logo.png';
import { useQrCode } from '../hooks/useQrCode';

export const Login = () => {
    const { store, actions } = useContext(Context);
    const { showInput, qrCode, handleScan, startScan} = useQrCode();

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Enfoca el campo de entrada cuando se monta el componente
        }
    }, [showInput]); // El segundo argumento del useEffect es un array de dependencias, vacío en este caso para que se ejecute solo una vez
    
    

    return (
        <div className="login container text-white" style={{ marginTop: '140px' }}>
            <img src={loGoOpen} className="img-login" alt="Logo" />
            <h1 className="text-center" style={{ marginTop: '110px' }}>
                ¡Bienvenido a Ghop!{' '}
            </h1>

            {store.user.id && store.user.id !== '' && store.user.id !== undefined ? (
                <p className="text-center">You are logged in with this token: {store.user.name}</p>
            ) : (
                <div>
                    {showInput ? (
                        <div className="d-grid gap-2">
                            <input
                                type="text"
                                className="form-control btn-login btn-outline-light mt-5 text-center"
                                placeholder="Ingresa el código QR"
                                value={qrCode}
                                onChange={handleScan} // Captura los cambios en el campo de entrada
                                ref={inputRef} 
                            />
                        </div>
                    ) : (
                        <button type="button" className="btn-login btn btn-outline-light mt-5" onClick={startScan}>
                            Escanear QR para empezar
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
