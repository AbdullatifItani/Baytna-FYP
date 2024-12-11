import ReactTooltip from "react-tooltip";

import AUB from "../../assets/aub/AUB_new_logo.jpg";
import git from "../../assets/about/git-logo.png";
import linkedin from "../../assets/about/linkedin-logo.png";
import skyline from "../../assets/about/skyline.png";

const About = () => {
	return (
		<div
			className="about-ctrl"
			style={{ backgroundImage: `url("${skyline}")` }}
		>
			<ReactTooltip />
			<div className="wrapper">
				<img className="img" src={AUB} alt="AUB" />
				<div>
					<div className="name">Abdullatif Itani - Abdullah Itani - Mohammad Salam</div>
					<div className="slogan">AUB</div>
				</div>
				<div className="icon-group">
					<a
						href="https://github.com"
						target="_blank"
						rel="noreferrer"
						data-tip="Portfolio"
					>
						<i className="fa-solid fa-briefcase icon"></i>
					</a>

					<a
						href="https://github.com"
						target="_blank"
						rel="noreferrer"
						data-tip="GitHub"
					>
						<img src={git} className="icon" alt="Git" />
					</a>
					<a
						href="https://www.linkedin.com"
						target="_blank"
						rel="noreferrer"
						data-tip="LinkedIn"
					>
						<img src={linkedin} className="icon" alt="Linked In" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default About;
