import React, { useContext } from "react";
import { Context } from "../store/appContext";
import bgImg from "../../img/background.png";
import "../../styles/home.css";
import { CombosPage, CoffesPage, TeasPage, BakeryPage, BagelsPage, JuicesPage, ToastsPage } from "./";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const products = store.products.products

	console.log(products)
	

	return (
		<div 
			className="container" 
			style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>		
			<CombosPage />
			{/* <CoffesPage />
			<TeasPage />
			<BakeryPage />
			<BagelsPage />
			<JuicesPage />
			<ToastsPage /> */}
		</div>
	);
};
