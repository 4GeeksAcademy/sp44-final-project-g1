import React, { useContext } from "react";
import { Context } from "../store/appContext";
import bgImg from "../../img/background.png";
import { useParams } from "react-router-dom";
import { CardProduct } from "./Cards";


export const Products = () => {
	const { store, actions } = useContext(Context);
	
	const params = useParams();
	const categoryId = params.id;

	// Filtra los productos por categoría si categoryId tiene un valor válido
	const productsCategory = categoryId
		? store.products.filter((item) => item.family == categoryId) : store.products;


	return (
		<div className="container-fluid" style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', marginTop: '150px' }}>
			<div className="container">
				<div className="row row-cols-1 row-cols-md-3 row-cols-xl-3 g-3">

					{productsCategory.map((product) => {

						return (
							<CardProduct key={product.id} {...product} />
						)
					})}

				</div>
			</div>
		</div>
	);
};
