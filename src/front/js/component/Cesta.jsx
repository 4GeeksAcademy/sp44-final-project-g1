import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { CardCesta } from "../pages/Cards";
import { ModalProcessOrder, ToastCloseCart } from "./Alerts";


export const Cesta = () => {
    const { store, actions } = useContext(Context);

    const [showModalOrder, setShowModalOrder] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const selectProduct = store.selectProduct;

    const totalCesta = selectProduct.reduce((total, product) => {
        // Sumar el precio de cada producto multiplicado por su cantidad en la cesta
        return total + product.price * product.quantity;
    }, 0);


    const getCustomerQr = () => {
        // TODO: Scanear Qr: "bj2bgk3l", "giro7g93", "i19ziip2"
        actions.getPurchaseCarts("giro7g93")
    }

    const handleProcessOrder = async () => {
        const order = selectProduct.map((item) => { return { id: item.id, delta: item.quantity } });
        // Enviar el id del cart, el del cliente y [] de productos
        const sendCart = await actions.closeCarts(store.purchaseCarts.id, store.purchaseCarts.customer.id, order);
        handleClose();

        if (sendCart) {
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false)
            }, 3000);
        } else {
            alert("Error al enviar el carrito, intenta de nuevo")
        }


    };

    const handelModal = () => {
        if (selectProduct.length < 1) return alert('Agregar productos al carrito')
        setShowModalOrder(true)
    }

    const handleClose = () => {
        setShowModalOrder(false)
        setShowToast(false)
    }


    return (

        !store.login ? '' :
            store.block ? '' :

                <div className="container col-5 fixed-cesta">
                    <div className="header-cesta">
                        <h3 style={{ color: '#3BB9B8' }}>Carrito de compra</h3>

                        {store.purchaseCarts.id && store.purchaseCarts.id != "" && store.purchaseCarts.id !== undefined ? (

                            <h5 className="text-center">Cliente: {store.purchaseCarts.customer.name}</h5>) : (
                            <div>
                                <div className="d-grid gap-2">
                                    <div className="alert text-white text-center mt-4" role="alert">
                                        Para agregar productos al carrito, escanear el código QR del cliente
                                        <br />
                                        <i className="fa-solid fa-angles-down"></i>
                                    </div>
                                    <button type="button" className="btn btn-outline-light" onClick={getCustomerQr}> Escanear QR</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="scrollable-content">

                        {store.purchaseCarts.products && store.purchaseCarts.products.length > 0 ? (
                            <table className="table text-white table-borderless table-sm">
                                <thead>
                                    <tr className="justify-content-between">
                                        <th scope="col">Producto</th>
                                        <th className="text-center" scope="col">Cantidad</th>
                                        <th className="text-center" scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.purchaseCarts.products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td className="text-center">{product.quantity}</td>
                                            <td className="text-center">{product.price * product.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (<span></span>)}

                        {totalCesta ? (selectProduct.map((product) => (
                            <CardCesta key={product.id} {...product} />
                        ))) : (
                            <div className="alert text-white text-center mt-4" role="alert">
                                <i className="fa-solid fa-circle-exclamation"></i> No hay productos en el carrito
                            </div>)
                        }
                    </div>
                    <div className="row foother-cesta">
                        <div className="row">
                            <h5 className="col-10">Total</h5>
                            <p className="col-2 justify-content-end d-flex total-cesta">

                                {store.purchaseCarts.total ? totalCesta + store.purchaseCarts.total : totalCesta}€

                            </p>
                        </div>
                        <div>
                            <button type="button" className="btn btn-cesta btn-lg btn-block mx-auto" onClick={handelModal}>
                                Finalizar
                            </button>
                        </div>
                        {showModalOrder && (
                            <ModalProcessOrder
                                show={handelModal}
                                onClose={handleClose}
                                onProcessOrder={handleProcessOrder} />
                        )}

                        {showToast && (
                            <ToastCloseCart
                                onClose={handleClose} />
                        )}
                    </div>
                </div>
    );
}