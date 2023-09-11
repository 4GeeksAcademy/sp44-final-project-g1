import React from "react";
import bgImg from "../../img/background.png";


export const ToastsPage = () => {

	return (
		<div className="container" style={{ background: `url(${bgImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
			<h1 className="text-white text-center">Toasts Page</h1>
		</div>
	);
};