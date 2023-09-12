import React from "react";
import rigoImg from "../../img/rigo-baby.jpg";

export const Card = ({name, pricing}) => {

    return (
		<div className="container">
			<div className="container mt-3 rounded-3" style={{ borderRadius: '6.72px' }}>
				<div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-3">
					<div className="col">
						<div className="card">
							<img src={rigoImg} className="card-img-top" style={{ objectFit: 'cover' }} />
							<div className="card-body pb-3 text-white" style={{ background: '#0B1318', border: '#0B1318' }}>
								<h5 className="card-title"> {name} </h5>
								<p className="card-text" style={{ color: '#FF7700' }}>{pricing}</p>
								<div className="d-flex container-fluid justify-content-center">
									<button type="button" className="btn btn-lg btn-block" style={{ background: '#3BB8B8', width: '100%' }}>
										Añadir al carro
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	);

}

Card.prototype