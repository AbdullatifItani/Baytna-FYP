import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Channels from "./Channels";
import Chat from "./Chat";

import find_agent from "../../assets/find_agent.svg";

import * as channelActions from "../../store/channel";
import * as chatActions from "../../store/chat";
import { BASE_URL } from "../../store/config";
import axios from "axios"; // Import axios

const Chats = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const channels = useSelector((state) => state.channels);
	const [channelsArr, setChannelsArr] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
        // Use axios to get channels and chats
        axios
            .get(`${BASE_URL}/api/channels/`, { withCredentials: true }) // Include credentials for authentication
            .then((response) => {
                dispatch(channelActions.getChannels(response.data.channels));
                dispatch(chatActions.getChats(response.data.chats));
            })
            .catch((error) => {
                console.error("Error fetching channels and chats:", error);
            });
    }, [dispatch]);

	useEffect(() => {
		if (user.agent) {
			const arr = Object.values(channels).filter((channel) =>
				channel?.user_name.includes(search)
			);
			setChannelsArr(arr);
		} else {
			const arr = Object.values(channels).filter((channel) =>
				channel?.agent_name.toLowerCase().includes(search.toLowerCase())
			);
			setChannelsArr(arr);
		}
	}, [search, channels, user]);

	return (
		<div className="chat-ctrl">
			<div className="chat-channel-wrap">
				<label className="chnl-search-label">
					<input
						type="text"
						placeholder="Filter by Name"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<i className="fa-solid fa-magnifying-glass"></i>
				</label>
				<div className="channels">
					{channelsArr.map((channel) => (
						<Channels channel={channel} key={channel?.id} />
					))}
					{channelsArr.length === 0 && user.agent && (
						<div className="no-channels-wrap">
							<i className="fa-solid fa-magnifying-glass"></i>
							<div className="desc">
								Start by adding clients to chat through appointments
							</div>
						</div>
					)}
					{channelsArr.length === 0 && !user.agent && (
						<div className="no-channels-wrap">
							<img className="img" src={find_agent} alt="Find Agent" />
							<div className="desc">
								Start by adding agents to chat through appointments or agent
								finder
							</div>
						</div>
					)}
				</div>
			</div>
			<Chat />
		</div>
	);
};

export default Chats;
