import React, { useState } from "react";
import logoGhop from "../../img/LogoGhop.png"
import { Link, useNavigate } from "react-router-dom";
import { ModalLogOut } from "./Modals/ModalLogOut.jsx";

export const Header = () => {

    const [showModal, setShowModal] = useState(false);
    const navegate = useNavigate()

    const handleLogOut = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLogOutConfirmed = () => {
        // Realiza la acción de logout aquí
        navegate("/login", { replace: true });
        // Cierra el modal después de realizar la acción
        handleCloseModal();
    };

    return (

        <header>
            <div className="row flex-nowrap justify-content-between align-items-center">
                {/* Logo */}
                <div className="col-4 pt-1">     
                    <Link to="/products">
                        <img src={logoGhop} className="navbar-brand mx-2 logo-ghop" alt="Logo-Ghop"
                        />
                    </Link>
                </div>

                <div className="col d-flex justify-content-end align-items-center">
                    <div className="btn-group">
                        <button
                            className="btn btn-outline-info me-md-4 rounded-pill btn-lg" // 
                            type="button">
                            <i className="fas fa-user-shield"></i>
                        </button>
                        <button
                            className="btn btn-outline-info me-md-4 rounded-pill btn-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            type="button"
                            onClick={ handleLogOut }>
                            <i className="far fa-circle-left"></i>
                        </button>

                    </div>
                </div>
            </div>

            {showModal && (
                <ModalLogOut
                    show={ handleLogOut }
                    onClose={ handleCloseModal }
                    onLogOut={ handleLogOutConfirmed }

                />
            )}
        </header>
    )
}