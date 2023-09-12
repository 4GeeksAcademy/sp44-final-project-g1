import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import bgImg from "../../img/background.png";
import { Card } from "./";


export const CoffesPage = () => {

	// Como defino el id
	// Verificar la sintaxis del filter
	const { store, actions } = useContext(Context);

	const products = store.products.products
	// const product_category = products.filter((id) => products.category_id === id)
	// console.log(products)

	const product_category = products

	return (
		<div className="container" style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
			<h1 className="text-white text-center">Coffes Page</h1>

			{
				product_category.map((product) => {
					return (
						// console.log(product.id, product.name, product.pricing)
						<Card key={product.id} {...product} />
						
					)
				}
				)	
			}
			

		</div>
	);
};
