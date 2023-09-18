import React, { useState } from "react";
import coffeImg from "/workspaces/sp44-final-project-g1/src/front/img/category_id_1.jpg";
import { useCounter } from "../../hooks/useCounter.js";
// import coffeImg from ".../../img/category_id_1.jpg";

export const CardCesta = ({ name, pricing }) => {

    const { counter, increment, decrement, reset } = useCounter(1);

    return (
        <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="container">
                <div className="card mb-4" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={coffeImg} className="card-img-top" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body pb-3 text-white" style={{ background: '#0B1318', border: '#0B1318' }}>
                                <h3 className="card-title"> {name} </h3>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="card-text" style={{ color: '#c0c0c0' }}>{pricing} €/Und</p>
                                        <p className="card-text" style={{ color: '#FF7700' }}><small className="text-body-secondary">{counter} Unidades </small></p>
                                        <p className="card-text" style={{ color: '#FF7700' }}><small className="text-body-secondary">Total price: {pricing * counter} €</small></p>
                                    </div>

                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
