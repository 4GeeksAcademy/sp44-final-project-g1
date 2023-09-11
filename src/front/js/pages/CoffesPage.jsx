import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import bgImg from "../../img/background.png";


export const CoffesPage = () => {

	const { store, actions } = useContext(Context);
	
	return (
		<div className="container" style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
			<h1 className="text-white text-center">Coffes Page</h1>
		</div>
	);
};
