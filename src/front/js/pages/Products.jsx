import React, { useContext } from "react";
import { Context } from "../store/appContext";
import bgImg from "../../img/background.png";
import { useParams } from "react-router-dom";
import { CardProduct } from "./Cards";


export const Products = () => {

	const { store, actions } = useContext(Context);

	// const category = store.category
	const params = useParams();
	const categoryId = params.id;
	console.log(params);

	// Filtrar los productos por categoría si categoryId tiene un valor válido
	const productsCategory = categoryId
		? store.products.filter((item) => item.category_id == categoryId) : store.products

	console.log(productsCategory);

	return (
		<div className="container-fluid" style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', marginTop: '150px' }}>
			<div className="container">
				{/* <h3 className="container text-white mt-2">Coffes</h3> */}
				<div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">

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
