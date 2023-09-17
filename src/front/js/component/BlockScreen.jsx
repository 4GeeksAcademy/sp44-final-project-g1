import React, { useContext } from "react";
import animatedlogo from "../../img/animated-logo.gif"


export const BlockScreen = () => {


    return (
        <div className="gif-container">
            <img
                src={animatedlogo}
                className="navbar-brand mx-2"
                alt="Logo"
            />
        </div>
    );
}
