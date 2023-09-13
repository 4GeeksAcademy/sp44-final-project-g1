import React, { useContext } from "react";
import { Context } from "../store/appContext";
import bgImg from "../../img/background.png";
import { CoffesPage, TeasPage, BakeryPage, BagelsPage, JuicesPage, ToastsPage } from "./";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	const products = store.products

	// console.log(products)
	

	return (
		<div 
			className="container-fluid" 
			style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>		
			<CoffesPage />
			<TeasPage />
			<BakeryPage />
			<BagelsPage />
			<JuicesPage />
			<ToastsPage />
		</div>
	);
};
