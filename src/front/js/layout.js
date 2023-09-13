import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";

import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { CoffesPage, TeasPage, BagelsPage, Home, BakeryPage, JuicesPage, ToastsPage } from "./pages";
import { Login } from "./auth/Login.jsx";
import { Cesta } from "./component/Cesta.jsx";
import { CestaCopy } from "./component/CestaCopy.jsx";

// import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    const { store, actions } = useContext(Context)

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>

                {/* { store.user ?  <Navbar /> : ''} */}

                <div className="d-flex justify-content-between">
                    <div className="col-7">

                        <Navbar />
                        <Routes>
                            <Route element={<Cesta />} path="/cesta" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<Home />} path="/" />
                            <Route element={<CoffesPage />} path="/coffes" />
                            <Route element={<TeasPage />} path="/teas" />
                            <Route element={<BakeryPage />} path="/bakery" />
                            <Route element={<BagelsPage />} path="/bagels" />
                            <Route element={<JuicesPage />} path="/juices" />
                            <Route element={<ToastsPage />} path="/toasts" />
                            <Route element={<Navigate to={"/"} />} path="/*" />
                        </Routes>
                    </div>

                    <div className="col-5"> <CestaCopy /> </div>

                </div>



                {/* <Footer /> */}

            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
