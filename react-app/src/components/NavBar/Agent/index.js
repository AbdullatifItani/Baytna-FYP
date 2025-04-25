import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../auth/LogoutButton";

import logo from "../../../assets/logo-blue.svg";

const AgentBar = () => {
	return (
		<nav className="nav nav-agent">
			<div className="nav-lf">
				<NavLink to="/about">About</NavLink>
				<NavLink to="/agents">Agent Finder</NavLink>
				<NavLink to="/reviews" exact={true}>
					My Reviews
				</NavLink>
				<NavLink to="/price-estimator">
					Price Estimator
				</NavLink>
			</div>
			<NavLink to="/" exact={true}>
				<img src={logo} alt="Baytna" />
			</NavLink>
			<div className="nav-rt">
				<NavLink to="/chats" exact={true}>
					<i className="fa-regular fa-comment"></i> Chats
				</NavLink>
				<NavLink to="/appointments" exact={true}>
					Appointments
				</NavLink>
				<NavLink className="btn-font-lt" to="/properties">
					Properties
				</NavLink>
				<NavLink to="/profile" exact={true}>
					My Profile
				</NavLink>
				<NavLink className="btn-font-lt" to="/saved-homes" exact={true}>
    				Saved Homes
				</NavLink>
				<LogoutButton />
			</div>
		</nav>
	);
};

export default AgentBar;
