import React, { useState } from "react";

export const CardCesta = () => {
    const [counter, setCounter] = useState(1);
    // const handleClick = () => {
    //     setCounter(counter + 1)
    // }
    return (
        <div>
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="..." className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body pb-3 text-white" style={{ background: '#0B1318', border: '#0B1318' }}>
                            <h5 className="card-title"> Product Name </h5>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="card-text" style={{ color: '#c0c0c0' }}>Pricing</p>
                                    <p className="card-text" style={{ color: '#FF7700' }}><small className="text-body-secondary">{ counter } Unidades </small></p>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-lg btn-block me-md-2" type="button" style={{ background: '#3BB8B8', width: '100%' }} onClick={() => setCounter(counter - 1) }>-</button>
                                    <button className="btn btn-lg btn-block" type="button" style={{ background: '#3BB8B8', width: '100%' }} onClick={() => setCounter(counter + 1) }>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
