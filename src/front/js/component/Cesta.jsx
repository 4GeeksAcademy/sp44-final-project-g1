import React, { useContext } from "react";
import { CardCesta } from "../pages/Cards/CardCesta.jsx";
import { Context } from "../store/appContext.js";

export const Cesta = () => {
    const { store, actions } = useContext(Context);
    const products = store.products;
    // console.log(products);

    return (
        <div className="container cesta col-4">

            <div>
                <h3 style={{ color: '#3BB9B8', margin: '0' }}>Purchase cart</h3>
                <p> Customer: </p>
            </div>

            <div>
                <p>Productos de la lista previa</p>
                <CardCesta />
                
            </div>

            <div className="row">
                <p className="col-10">Total</p>
                <p className="col-2"> 1000 €</p>
            </div>

            <div>
                <button type="button" className="btn btn-cesta btn-lg btn-block">
                    Process the order
                </button>
            </div>

        </div>


    );
}
