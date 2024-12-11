import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
	const history = useHistory();

	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [agent, setAgent] = useState(false);

	const [matchErr, setMatchErr] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(username, email, password, agent));
			if (data) {
				setErrors(data);
				setPassword("");
				setRepeatPassword("");
			} else if (agent) {
				history.push("/profile");
			}
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	useEffect(() => {
		if (password && password !== repeatPassword) {
			setMatchErr("Password does not match");
		} else {
			setMatchErr("");
		}
	}, [password, repeatPassword]);

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form className="login-sign-form" onSubmit={onSignUp}>
			<label className="label" htmlFor="username">
				<div>
					Username <span className="input-error">Required *</span>
				</div>
				<input
					type="text"
					name="username"
					onChange={updateUsername}
					value={username}
					placeholder="Enter Username"
					required={true}
				></input>
			</label>

			<label className="label" htmlFor="email">
				<div>
					Email <span className="input-error">Required *</span>
				</div>
				<input
					type="email"
					name="email"
					onChange={updateEmail}
					value={email}
					placeholder="Enter Email"
					required={true}
				></input>
			</label>

			<label className="label" htmlFor="password">
				<div>
					Password <span className="input-error">Required *</span>
				</div>
				<input
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}
					placeholder="Create password"
					required={true}
				></input>
			</label>

			<label className="label" htmlFor="repeat_password">
				<div>
					Confirm Password <span className="input-error">Required *</span>
				</div>
				<input
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					placeholder="Confirm Password"
					required={true}
				></input>
			</label>
			<label>
				<input
					type="checkbox"
					defaultChecked={agent}
					onChange={(e) => {
						setTimeout(() => {
							setAgent(!agent);
						}, 1);
					}}
				/>{" "}
				I am a real estate agent
			</label>
			<div className="error-list">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
				{matchErr && <div>{matchErr}</div>}
			</div>
			<button className="btn" type="submit">
				Sign Up
			</button>
			<div className="login-sign-tfu">
				By submitting, I accept Baytna's term of use.
			</div>
		</form>
	);
};

export default SignUpForm;
