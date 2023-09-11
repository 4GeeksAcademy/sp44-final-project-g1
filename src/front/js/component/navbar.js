import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoGhop from "../../img/logo.png";


export const Navbar = () => {

	const navegate = useNavigate();

	const onLogout = () => {
		navegate ("/login", {replace: true}) 
	}


	return (
		<div className="container">
			<header>
				<div 
					className="row flex-nowrap justify-content-between align-items-center"
					style={{background: '#0A1216'}}>
					<div className="col-4 pt-1">
						<Link to="/">
							<img
								src={logoGhop}
								className="navbar-brand"
								style={{ width: '150px', height: 'auto' }}
								alt="Logo"
							/>
						</Link>
					</div>
					<div className="col-4 text-center">
						<Link to="/demo" className="text-white text-decoration-none m-2">
							Dashboard
						</Link>
						<Link to="/" className="text-white text-decoration-none m-2">
							History
						</Link>
					</div>
					<div className="col-4 d-flex justify-content-end align-items-center">
						<div className="btn-group-vertical">
							<button 
								className="btn btn-info me-md-2 rounded-pill btn-sm" 
								type="button">
								<i className="fas fa-user-shield"></i> Block
							</button>
							<button 
								className="btn btn-info me-md-2 rounded-pill btn-sm mt-2" 
								type="button"
								onClick={ onLogout }>
								<i className="far fa-circle-left"></i> Log out
							</button>
						</div>
					</div>
				</div>
			</header>
			<div className="nav-scroller py-1 border-bottom text-white">
				<nav className="nav nav-underline justify-content-center">
					<NavLink
						className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
						to="/"
					>
						All
					</NavLink>

					<NavLink
						className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
						to="/combos"
					>
						Combos
					</NavLink>
					<NavLink
						className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
						to="/coffes"
					>
						Coffes
					</NavLink>
					<NavLink
						className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
						to="/teas"
					>
						Teas
					</NavLink>
					<NavLink
						className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
						to="/bakery"
					>
						Bakery
					</NavLink>
					<NavLink
						className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
						to="/bagels"
					>
						Bagels
					</NavLink>
					<NavLink
						className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
						to="/juices"
					>
						Juices
					</NavLink>
					<NavLink
						className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
						to="/toasts"
					>
						Toasts
					</NavLink>
				</nav>
			</div>
		</div>
	);
};

