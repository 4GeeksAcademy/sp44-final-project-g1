import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoGhop from "../../img/LogoGhop.png"


export const Navbar = () => {

	const navegate = useNavigate();

	const onLogout = () => {
		navegate("/login", { replace: true })
	}


	return (
		<div className="container-fluid">
			<header>
				<div
					className="row flex-nowrap justify-content-between align-items-center"
					style={{ background: '#0A1216' }}
				>
					<div className="col-4 pt-1">
						<Link to="/">
							<img
								src={logoGhop}
								className="navbar-brand mx-2"
								style={{ width: '130px', height: 'auto' }}
								alt="Logo"
							/>
						</Link>
					</div>
					<div className="col-4 d-flex justify-content-end align-items-center">
						<div className="btn-group">
							<button type="button" className="btn btn-info me-md-2 rounded-pill btn-sm dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
								<i className="fa-solid fa-user"></i>
							</button>
							<ul className="dropdown-menu dropdown-menu-lg-end" style={{ background: '#0E181D' }}>
								<li className="dropdown-item text-white"><i className="fas fa-user-shield"></i> Block </li>
								<li className="dropdown-item text-white" onClick={onLogout}><i className="far fa-circle-left"></i> Log out </li>
								<li className="dropdown-item text-white"><i className="fa-solid fa-book-open"></i> History</li>
							</ul>
						</div>
					</div>
				</div>
			</header>

			<div className=" container nav-scroller py-1 border-bottom mt-0">
				<nav className="nav justify-content-start">
					<NavLink
						className="nav-item nav-link btn btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent'}}
						to="/combos"
					>
						All
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent'}}
						to="/coffes"
					>
						Coffes
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent'}}
						to="/teas"
					>
						Teas
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-outline-secondary me-1 "
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent'}}
						to="/bakery"
					>
						Bakery
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent'}}
						to="/bagels"
					>
						Bagels
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-outline-secondary me-1"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent'}}
						to="/juices"
					>
						Juices
					</NavLink>
					<NavLink
						className="nav-item nav-link btn btn-outline-secondary"
						style={{ color: '#FF7700', borderColor: '#FF7700', backgroundColor: 'transparent'}}
						to="/toasts"
					>
						Toasts
					</NavLink>
				</nav>
			</div>
		</div>
	);
};

