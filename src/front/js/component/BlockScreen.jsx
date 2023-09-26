import React, { useContext } from "react";
import animatedlogo from "../../img/animated-logo.gif"
import { Context } from "../store/appContext";


export const BlockScreen = () => {
    const { store, actions } = useContext(Context)

    const handleClick = () => {
        actions.blockApp(false)
    };


    return (
        <div className="gif-container" onClick={handleClick}>
            <img
                src={animatedlogo}
                className="navbar-brand mx-2"
                alt="Logo"
            />
        </div>
    );
}