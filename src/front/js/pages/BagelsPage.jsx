import React from "react";
import bgImg from "../../img/background.png"


export const BagelsPage = () => {

	return (
		<div className="container" style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
			<h1 className="text-white text-center">Bagels Page</h1>
		</div>
	);
};