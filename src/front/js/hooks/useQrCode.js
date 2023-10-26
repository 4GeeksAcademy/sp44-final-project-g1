import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const useQrCode = () => {
    const { store, actions } = useContext(Context);
    const [showInput, setShowInput] = useState(false);
    const [qrCode, setQrCode] = useState('');

    const navigate = useNavigate();

    const startScan = () => {
        // Al hacer clic en el botón, mostrar el campo de entrada
        setShowInput(true);
    };

    const handleScan = (event) => {
        // Obtiene el valor del campo de entrada
        const inputValue = event.target.value;
        setQrCode(inputValue);

        if (inputValue) {
            handleLogin(inputValue);
        }
    };

    const handleLogin = (qrCode) => {
        // enviar el qrCode obtenido a traves del inputValue a login
        actions.login(qrCode);
        navigate('/products');
    };

    const handleScanCustomer = (event) => {
        // Obtiene el valor del campo de entrada
        const inputValue = event.target.value;
        setQrCode(inputValue);

        if (inputValue) {
            getCustomerQr(inputValue);
        }
    };
    
    const getCustomerQr = (qrCode) => {
        // TODO: Scanear Qr: "bj2bgk3l"
        if (qrCode === "bj2bgk3l"){
            actions.getPurchaseCarts(qrCode)}
        else {
             alert('El usuario no existe en la base datos. Por favor realizar el proceso de registro');
        }
    };

    return {
        showInput,
        setShowInput,
        qrCode,
        handleScan,
        startScan,
        getCustomerQr,
        handleScanCustomer,
    };

}