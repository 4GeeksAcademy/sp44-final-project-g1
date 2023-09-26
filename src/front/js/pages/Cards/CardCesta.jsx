import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext.js";
import {img1, img2, img3, img4, img5, img6}  from "../../../img/cards/images";


export const CardCesta = ({ name, price, id, family }) => {
    const {store, actions} = useContext(Context);
    const [counter, setCounter] = useState(1);

    const imageMap = {1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6}
	const ruta = imageMap[family]

    const increment = () => {
        setCounter (counter +1)
        actions.selectProduct( { name, price, id, family }, true)
    };

    const decrement = () => {
        // Si el contador es igual a 0 no decrementar mas
        if (counter === 0) return; 
        setCounter (counter -1)
        actions.selectProduct({ name, price, id, family }, false)
    };

    const totalValue = price * counter;


    return (
        <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="container">
                <div className="card card-cesta mx-auto mb-4">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={ ruta } className="card-img-cesta" alt={family} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body pb-3 text-white">
                                <h3 className="card-title"> {name} </h3>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="card-text card-text-price">{price} €/Und</p>
                                        <p className="card-text"><small className="text-body-secondary">{counter} Unidades </small></p>
                                        <p className="card-text"><small className="text-body-secondary">Total price: {totalValue} €</small></p>
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
