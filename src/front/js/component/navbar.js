import React, { useContext } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {

	const { store, actions } = useContext(Context)

	const categories = store.categories
	// const id = useParams()
	// console.log(id)
	console.log(categories)

	return (
		<div className="navbar container-fluid col-8">

			<div className=" container nav-scroller py-1 border-bottom mt-0">
				<nav className="d-grid gap-7 d-md-flex justify-content-md-center" >

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
								// onClick={() => handleCategoryClick(category.id)}
							>
								{category.name}
							</NavLink>


						)
					})}

					{/* <NavLink
						className="nav-item nav-link btn btn-lg btn-outline-secondary  me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent', width: '100px' }}
						to="/combos"
					>
						All
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-lg btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent', width: '100px' }}
						to="/coffes"
					>
						Coffes
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-lg btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent', width: '100px' }}
						to="/teas"
					>
						Teas
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-lg btn-outline-secondary me-1 "
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent', width: '100px' }}
						to="/bakery"
					>
						Bakery
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-lg btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent', width: '100px' }}
						to="/bagels"
					>
						Bagels
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-lg btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent', width: '100px' }}
						to="/juices"
					>
						Juices
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-lg btn-outline-secondary"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent', width: '100px' }}
						to="/toasts"
					>
						Toasts
					</NavLink> */}
				</nav>
			</div>
		</div>
	);
};

