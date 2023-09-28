import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Products } from "./pages/Products.jsx";
import { Login } from "./auth/Login.jsx";
import { Cesta } from "./component/Cesta.jsx";
import { Header } from "./component/Header.jsx";
import { BlockScreen } from "./component/BlockScreen.jsx";


const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    const { store, actions } = useContext(Context)

    // if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>

                {!store.login && <Login />}
                {store.block && <BlockScreen />}
                {store.login && !store.block &&
                    <>
                        <Header />

                        <div className="d-flex justify-content-between">
                            <div className="col-7">
                                <Navbar />

                                <Routes>
                                    <Route element={<Login />} path="/" />
                                    <Route element={<Products />} path="/products" />
                                    <Route element={<Products />} path="/products/:id" />                                    
                                </Routes>

                            </div>
                            <div className="col-5"> <Cesta /> </div>
                        </div>
                    </>}
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
