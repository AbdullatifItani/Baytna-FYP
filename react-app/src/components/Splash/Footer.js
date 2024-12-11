import { NavLink } from "react-router-dom";

import logo from "../../assets/logo-blue.svg";
import footer from "../../assets/footer-art.svg";

const Footer = () => {
	return (
		<footer className="footer-ctrl">
			<div className="footer-tech">
			</div>
			<NavLink to="/about" className="footer-logo-wrap">
				<img className="footer-logo" src={logo} alt="Baytna" /> © 2024 AUB
			</NavLink>

			<img src={footer} alt="Footer" />
		</footer>
	);
};

export default Footer;
