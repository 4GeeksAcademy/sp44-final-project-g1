import React, { useContext, useState } from "react";
import coffeImg from "../../../img/category_id_1.jpg";
import { Context } from "../../store/appContext";

// import BakeryImg from "../../../img/cardsImg/3.jpg";


export const CardProduct = ({ name, price }) => {

	const { store, actions } = useContext(Context)

	const handleClick = () => {
		actions.selectProduct({ name, price });
	};

	return (
		<div className="container" onClick={handleClick}>
			<div className="card card-product">
				<div className="half-card-img">
					<img src={coffeImg} className="card-img-top" alt="Coffee" />
				</div>
				<div className="card-footer pb-3 text-white">
					<h3 className="card-title"> {name} </h3>
					<p className="card-text"><b>{price} €/Und.</b></p>
					
					<div className="d-flex container-fluid justify-content-center p-0">
						<button
							type="button"
							className="btn btn-lg btn-block"
						> 
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

CardProduct.prototype