import React, { useContext, useState } from "react";
import logoGhop from "../../img/LogoGhop.png"
import { Link, useNavigate } from "react-router-dom";
import { ModalLogOut } from "./Modals/ModalLogOut.jsx";
import { ModalBlock } from "./Modals/ModalBlock.jsx";
import { Context } from "../store/appContext";

export const Header = () => {

    const {store, actions} = useContext(Context);
    console.log(store.block)

    const [showModalLogOut, setShowModalLogOut] = useState(false);
    const [showModalBlock, setShowModalBlock] = useState(false);
    const navegate = useNavigate()

    const handleLogOut = () => {

        // store.login(false) implementar!!!!!!
        setShowModalLogOut(true);
    };

    const handleBlock = () => {
        setShowModalBlock(true)
        store.block(true)
    }

    const handleCloseModal = () => {
        setShowModalLogOut(false);
        setShowModalBlock(false);
    };

    const handleLogOutConfirmed = () => {
        // Realiza la acción de logout aquí
        navegate("/login", { replace: true });
        // Cierra el modal después de realizar la acción
        handleCloseModal();
    };

    const handleBlockConfirmed = () => {
        // Realiza la acción de logout aquí
        navegate("/blockscreen", { replace: true });
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
                            className="btn btn-outline-info me-md-2 rounded-pill btn-lg" 
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={ handleBlock }>
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

            {showModalLogOut && (
                <ModalLogOut
                    show={ handleLogOut }
                    onClose={ handleCloseModal }
                    onLogOut={ handleLogOutConfirmed }

                />
            )}

            {showModalBlock && (
                <ModalBlock
                show={ handleBlock}
                onClose={ handleCloseModal }
                onBlock={handleBlockConfirmed}
                />
            )}
        </header>
    )
}