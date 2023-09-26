import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import {img1, img2, img3, img4, img5, img6}  from "../../../img/cards/images";


export const CardProduct = ({ name, price, id, family }) => {
	const { store, actions } = useContext(Context)

	const imageMap = {1: img1, 2: img2, 3: img3, 4: img4, 5: img5, 6: img6}
	const ruta = imageMap[family]

	const handleClick = () => {
		store.openCarts ? (actions.selectProduct({ name, price, id, family })) : ''
	};


	return (
		<div className="card-container" onClick={handleClick}>
			<div className="card card-product" style={{ border: '#0B1318' }}>
				<div className="half-card-img">
					<img src={ruta} className="card-img-top" alt={family} />
				</div>
				<div className="card-footer pb-3 text-white">
					<h4 className="card-title"> {name} </h4>
					<p className="card-text"><b>{price} €/Und.</b></p>
					<div className="d-flex container-fluid justify-content-center p-0">
						<button
							type="button"
							className="btn btn-lg btn-block"
						>
							Añadir al carrito
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

CardProduct.prototype