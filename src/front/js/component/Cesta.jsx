import React, { useContext } from "react";
import { CardCesta } from "../pages/Cards";
import { Context } from "../store/appContext.js";
// import { Login } from "../auth/Login.jsx";


export const Cesta = () => {

    const { store, actions } = useContext(Context);

    const selectProduct = store.selectProduct;

    const totalCesta = selectProduct.reduce((total, product) => {
        // Sumar el precio de cada producto multiplicado por su cantidad en la cesta
        return total + product.price * product.quantity;
    }, 0);

    const getCustomerQr = () => {
        // TODO: Scanear Qr: "bj2bgk3l", "giro7g93", "i19ziip2"
        actions.getPurchaseCarts("i19ziip2")
    }

    const handleProcessOrder = () => {
        const order = selectProduct.map((item)=> { return {id : item.id, delta : item.quantity}})
        // Enviar el id del cart, el del cliente y [] de productos
        actions.closeCarts( store.purchaseCarts.id, store.purchaseCarts.customer.id, order)
    }

    

    return (

        !store.login ? '' :
            store.block ? '' :

                <div className="container col-5 fixed-cesta">

                    <div className="header-cesta">
                        <h3 style={{ color: '#3BB9B8' }}>Purchase cart</h3>

                        {store.purchaseCarts.id && store.purchaseCarts.id != "" && store.purchaseCarts.id !== undefined ? (
                            <p className="text-center">Customer: {store.purchaseCarts.customer.name}</p>
                        ) : (
                            <div>
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-outline-light mt-1" onClick={getCustomerQr}>Scaner Qr</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="scrollable-content">

                        {store.purchaseCarts.products && store.purchaseCarts.products != [] && store.purchaseCarts.products !== undefined ? (
                            <ul>
                                {
                                    store.purchaseCarts.products.map((products) => (
                                        <li key={products.id}> Producto: {products.name} Cantidad: {products.quantity} Total: {products.price * products.quantity}</li>

                                    ))
                                }
                            </ul>
                        ) : (<span></span>)}

                        {totalCesta ?
                            (selectProduct.map((product) => (

                                <CardCesta key={product.id} {...product} />

                            ))) : (
                                <div className="alert text-white text-center" role="alert">
                                    <i className="fa-solid fa-circle-exclamation"></i> No hay productos agregados en tienda manual
                                </div>)
                        }
                    </div>

                    <div className="row foother-cesta">

                        <div className="row">
                            <p className="col-10">Total</p>
                            <p className="col-2 justify-content-end d-flex"> 
                                
                                {store.purchaseCarts.total ? totalCesta + store.purchaseCarts.total : totalCesta}€
                            
                            </p>
                        </div>

                        <div>
                            <button type="button" className="btn btn-cesta btn-lg btn-block mx-auto" onClick={handleProcessOrder}>
                                Process the order
                            </button>
                        </div>

                    </div>

                </div>
    );
}

// Como conectar el endoponint
