import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNotification } from "../../../../context/Notification";

import Stars from "../../../Tools/Stars";
import StarRating from "../../../Tools/StarRating";

import * as reviewActions from "../../../../store/review";
import * as agentActions from "../../../../store/agent";

const Agent = ({ agent }) => {
	const dispatch = useDispatch();

	const [write, setWrite] = useState(false);
	const [rating, setRating] = useState(1);
	const [content, setContent] = useState("");
	const [errors, setErrors] = useState([]);
	const [char, setChar] = useState(2000);

	const { setToggleNotification, setNotificationMsg } = useNotification();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (rating && rating < 6) {
			const newReview = {
				rating,
				content,
				agent_id: agent.id,
			};
			const data = await dispatch(reviewActions.addNewReview(newReview));
			if (!data.errors) {
				// dispatch and update agent info
				await dispatch(agentActions.getThisAgent(agent.id));
				// notification
				setNotificationMsg("Review posted. Visit Agent Profile");
				setToggleNotification("");
				setTimeout(() => {
					setToggleNotification("notification-move");
					setNotificationMsg("");
				}, 2000);
				// if succeed, setWrite to false
				setWrite(false);
			} else {
				setErrors(data.errors);
			}
		} else {
			setErrors(["Min 1 star required"]);
		}
	};

	useEffect(() => {
		setChar(2000 - content.length);
	}, [content]);

	if (agent) {
		return (
			<div className="appt-agent-wrap">
				{agent.photo ? (
					<div
						className="appt-photo"
						style={{ backgroundImage: `url("${agent.photo}")` }}
					></div>
				) : (
					<div className="appt-photo">No Photo</div>
				)}
				<div className="appt-agent-details">
					<div className="name">
						{agent.username}{" "}
						<span className="license">DRE# {agent.license_num}</span>
					</div>
					<div>Tel {agent.phone}</div>
					<div>{agent.email}</div>
					<div className="office">{agent.office.toUpperCase()}</div>
					<div className="appt-agent-reviews">
						<Stars rating={agent?.rating} />
						<span
							className="appt-agents-write"
							onClick={() => setWrite(!write)}
						>
							Write a Review
						</span>
					</div>
					{write && (
						<div className="review-box">
							<div className="review-rating">
								<StarRating rating={rating} setRating={setRating} />
								<span className="reveiew-char">Required *</span>
							</div>
							<div>
								<textarea
									rows="5"
									className="appt-input"
									value={content}
									onChange={(e) => setContent(e.target.value)}
									placeholder="Write a review"
								/>
								<div className="reveiew-char">
									(Optional) {char} characters left (Max 2,000)
								</div>
							</div>
							{errors && (
								<div className="error-list error-ctr">
									{errors.map((err) => (
										<div key={err}>{err}</div>
									))}
								</div>
							)}
							<div className="appt-edit-btn-wrap">
								<button
									type="button"
									className="btn btn-bl"
									onClick={() => setWrite(false)}
								>
									Cancel
								</button>
								<button type="submit" className="btn" onClick={handleSubmit}>
									Submit
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className="appt-no-agent-wrap">
				<div>No agent have accpeted your appointment yet.</div>
				<div>Please check back at a later time.</div>
			</div>
		);
	}
};

export default Agent;