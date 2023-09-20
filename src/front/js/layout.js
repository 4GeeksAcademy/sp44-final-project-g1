import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Products } from "./pages/Products.jsx";
import { Login } from "./auth/Login.jsx";
import { Cesta } from "./component/Cesta.jsx";
import { Header } from "./component/Header.jsx";
import { BlockScreen } from "./component/BlockScreen.jsx";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    const { store, actions } = useContext(Context)

    // if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                {/* { store.user ?  <Navbar /> : ''} */}

                {store.block ? <BlockScreen/> : ''}

                <Header />

                <div className="d-flex justify-content-between">

                    <div className="col-7">

                        <Navbar />
                        
                        <Routes>   
                            <Route element={<Login />} path="/login" />
                            <Route element={<BlockScreen />} path="/blockscreen" />
                            <Route element={<Products />} path="/products" />
                            <Route element={<Products />} path="/products/:id" />                            
                            <Route element={<Navigate to={"/products"} />} path="/*" />                            
                        </Routes>

                    </div>
                    
                    <div className="col-5"> <Cesta /> </div>
                
                </div>
                {/* <Footer /> */}
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
