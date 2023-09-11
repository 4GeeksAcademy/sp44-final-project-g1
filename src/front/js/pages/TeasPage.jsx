import React from "react";
import bgImg from "../../img/background.png";


export const TeasPage = () => {

	return (
		<div className="container" style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
			<h1 className="text-white text-center">Teas Page</h1>
		</div>
	);
};