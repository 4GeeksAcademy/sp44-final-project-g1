import React, { useContext } from "react";
import bgImg from "../../img/background.png";
import { Context } from "../store/appContext";
import { Card } from "./";


export const JuicesPage = () => {

	const { store, actions } = useContext(Context);

	const products_category = store.products.filter((item) => item.category_id === 6)
	// console.log(products_category)
	// console.log(store.products)

	return (
		<div className="container-fluid" style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
			<div className="container">
				<h3 className="container text-white mt-2">Juices</h3>
				<div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-3">
					{products_category.map((product) => {
						return (

							<Card key={product.id} {...product} />

						)
					})}
				</div>
			</div>
		</div>
	);
};