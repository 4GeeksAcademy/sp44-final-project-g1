import React, { useContext } from "react";
import { NavLink, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context)

	const categories = store.categories;
	const id = useParams();


	return (
		!store.login ? '' :

		<div className="navbar container-fluid col-7">
			<div className="container nav-scroller py-1">
				<nav className="justify-content-md-center" >
					<NavLink
						className="custom-nav-link btn btn-lg me-1"
						to={"/products"}
					>
						ALL
					</NavLink>

					{categories.map((category) => {
						return (
							<NavLink key={category.id}
								className="custom-nav-link btn btn-lg me-1"
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

