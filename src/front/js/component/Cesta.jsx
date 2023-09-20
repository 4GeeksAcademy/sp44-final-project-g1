import React, { useContext, useState } from "react";
import { CardCesta } from "../pages/Cards";
import { Context } from "../store/appContext.js";


export const Cesta = () => {

    const { store, actions } = useContext(Context);

    const selectProduct = store.selectProduct;
    console.log(selectProduct)

    const totalCesta = selectProduct.reduce((total, product) => {
        // Sumar el precio de cada producto multiplicado por su cantidad en la cesta
        return total + product.pricing * product.quantity;
    }, 0);

    console.log(totalCesta)

    return (
        <div className="container col-5 fixed-cesta">

            <div className="header-cesta">
                <h3 style={{ color: '#3BB9B8' }}>Purchase cart</h3>
                <p> Customer: </p>
            </div>

            <div className="scrollable-content">
                <p>Productos de la lista previa</p>

                {totalCesta ?
                    (selectProduct.map((product, id) => (

                        <CardCesta key={id} {...product} />

                    ))) : (
                        <div className="alert text-white text-center" role="alert">
                            <i className="fa-solid fa-circle-exclamation"></i> There are no products
                        </div>)
                }
            </div>

            <div className="row foother-cesta">
                
                <div className="row">
                    <p className="col-10">Total</p>
                    <p className="col-2 justify-content-end d-flex"> {totalCesta}€</p>
                </div>

                <div>
                    <button type="button" className="btn btn-cesta btn-lg btn-block mx-auto">
                        Process the order
                    </button>
                </div>

            </div>

        </div>
    );
}

// Como conectar el endoponint
