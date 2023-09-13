import React, { useContext } from "react";
import { CardCesta } from "../pages/Cards/CardCesta.jsx";
import { Context } from "../store/appContext.js";

export const CestaCopy = () => {
    const {store, actions} = useContext(Context);
    const products = store.products;
    console.log (products);

    return (
        <div>
            {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Scanner QR Customer</button> */}
            <div className="" style={{ backgroundColor: '#0F1A21' }}>
                <div className="" style={{ color: '#3BB9B8' }}>
                    <h5 className="">Cesta</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className=" " style={{ color: '#FFFFFF' }}>
                    <p>Productos de la lista previa</p>
                    
                    <CardCesta />
                    
                </div>
                <div className="d-flex container-fluid justify-content-center">
                    <button type="button" className="btn btn-lg btn-block" style={{ background: '#FF7701', width: '100%' }}>
                        Tramitar pedido
                    </button>
                </div>
            </div>
        </div>
    );
}
