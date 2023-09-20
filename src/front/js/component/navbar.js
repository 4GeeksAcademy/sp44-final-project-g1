import React, { useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {

	const { store, actions } = useContext(Context)

	const categories = store.categories
	const id = useParams()
	// console.log(id)
	// console.log(categories)

	return (
		<div className="navbar container-fluid col-7">

			<div className=" container nav-scroller py-1 mt-0">
				<nav className="justify-content-md-center" >

					<NavLink
						className="custom-nav-link btn btn-lg btn-outline  me-1"
						to={"/"}
					>
						All
					</NavLink>

					{categories.map((category) => {
						return (
							<NavLink key={category.id}
								className="custom-nav-link btn btn-lg btn-outline me-1"
								to={"/products/" + category.id}
							>
								{category.name}
							</NavLink>


						)
					})}
				</nav>
			</div>
		</div>
	);
};

