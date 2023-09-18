import React, { useContext, useState } from "react";
import { CardCesta, CardProduct } from "../pages/Cards";
import { Context } from "../store/appContext.js";


export const Cesta = () => {

    const {store, actions} = useContext(Context);

    const selectProduct = store.selectProduct;
    console.log(selectProduct);

    const total = selectProduct.reduce((accumulator, product) => {
        return accumulator + product.pricing;
    }, 0);

    return (
        <div className="container col-4 fixed-cesta">

            <div>
                <h3 style={{ color: '#3BB9B8', margin: '0' }}>Purchase cart</h3>
                <p> Customer: </p>
            </div>

            <div className="scrollable-content">
                <p>Productos de la lista previa</p>

                {
                    selectProduct.map((product, id) => (
                        <CardCesta key={id} {...product} />
                    ))
                }
            </div>

            <div className="row">
                <p className="col-10">Total</p>
                <p className="col-2"> {total} €</p>
            </div>

            <div>
                <button type="button" className="btn btn-cesta btn-lg btn-block">
                    Process the order
                </button>
            </div>

        </div>
    );
}
