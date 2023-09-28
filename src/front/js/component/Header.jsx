import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModalLogOut, ModalBlock } from "./Alerts";
import { Context } from "../store/appContext";
import logoGhop from "../../img/LogoGhop.png"


export const Header = () => {
    const { store, actions } = useContext(Context);

    const [showModalLogOut, setShowModalLogOut] = useState(false);
    const [showModalBlock, setShowModalBlock] = useState(false);
    const navegate = useNavigate()

    const handleLogOut = () => {
        setShowModalLogOut(true);
    };

    const handleBlock = () => {
        setShowModalBlock(true);
    };

    const handleCloseModal = () => {
        setShowModalLogOut(false);
        setShowModalBlock(false);
    };

    const handleLogOutConfirmed = () => {
        // Si se confirma logOut, logOutApp pasa a false
        actions.logOutApp(false)
        navegate("/", { replace: true });
        // Cierra el modal después de realizar la acción
        handleCloseModal();
    };

    const handleBlockConfirmed = () => {
        actions.blockApp(true)
        // Cierra el modal después de realizar la acción
        handleCloseModal();
    };

    return (
        !store.login ? '' :

            <header>
                <div className="row flex-nowrap justify-content-between align-items-center">
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
                                onClick={handleBlock}>
                                <i className="fas fa-user-shield"></i>
                            </button>
                            <button
                                className="btn btn-outline-info me-md-4 rounded-pill btn-lg"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                type="button"
                                onClick={handleLogOut}>
                                <i className="far fa-circle-left"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {showModalLogOut && (
                    <ModalLogOut
                        show={handleLogOut}
                        onClose={handleCloseModal}
                        onLogOut={handleLogOutConfirmed}

                    />
                )}

                {showModalBlock && (
                    <ModalBlock
                        show={handleBlock}
                        onClose={handleCloseModal}
                        onBlock={handleBlockConfirmed}
                    />
                )}
            </header>
    )
};