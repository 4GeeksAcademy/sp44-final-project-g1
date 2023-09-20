import React, { useContext, useState } from "react";
import coffeImg from "/workspaces/sp44-final-project-g1/src/front/img/category_id_1.jpg";
import { Context } from "../../store/appContext.js";
// import coffeImg from ".../../img/category_id_1.jpg";

export const CardCesta = ({ name, price }) => {

    const {store, actions} = useContext(Context);
    const [counter, setCounter] = useState(1);
    

    const increment = () => {
        setCounter (counter +1)
        actions.selectProduct( { name, price }, true)
    };

    const decrement = () => {
        // Si el contador es igual a 0 no decrementar mas
        if (counter === 0) return; 
        setCounter (counter -1)
        actions.selectProduct({ name, price }, false)
    };

    const totalValue = price * counter;

    // const reset = () => setCounter (initialValue);

    return (
        <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="container">
                <div className="card card-cesta mx-auto mb-4">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={coffeImg} className="card-img-top" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body pb-3 text-white" style={{ background: '#0B1318', border: '#0B1318'}}>
                                <h3 className="card-title"> {name} </h3>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="card-text" style={{ color: '#c0c0c0' }}>{price} €/Und</p>
                                        <p className="card-text" style={{ color: '#FF7700' }}><small className="text-body-secondary">{counter} Unidades </small></p>
                                        <p className="card-text" style={{ color: '#FF7700' }}><small className="text-body-secondary">Total price: {totalValue} €</small></p>
                                    </div>

                                    <div className="d-grid gap-2 d-md-flex d-flex align-items-end">
                                        <button className="btn btn-lg btn-block" onClick={ decrement }> <i className="fa-solid fa-minus"></i> </button>
                                        <button className="btn btn-lg btn-block" onClick={ increment }> <i className="fa-solid fa-plus"></i> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CardCesta.prototype
