import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../../../context/Notification";
import UploadPhoto from "../UploadPhoto";
import * as sessionActions from "../../../store/session";

const UserProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNum, setLicenseNum] = useState("");
  const [office, setOffice] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);

  const { setToggleNotification, setNotificationMsg } = useNotification();

  const updateProfile = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      phone,
      license_num: licenseNum,
      office,
      bio,
    };

    const data = await dispatch(sessionActions.updateThisUser(payload));

    if (!data.errors) {
      setToggleNotification("");
      setNotificationMsg("Profile updated");
      setTimeout(() => {
        setToggleNotification("notification-move");
        setNotificationMsg("");
      }, 2000);
      onClose();
    } else {
      setErrors(data.errors);
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setPhone(user.phone || "");
      setLicenseNum(user.license_num || "");
      setOffice(user.office || "");
      setBio(user.bio || "");
    }
  }, [user]);

  return (
    <div className="user-profile-modal">
      <div className="title">My Profile</div>
      <UploadPhoto />
      <form onSubmit={updateProfile}>
        <label className="label">
          Username
          <input
            maxLength="40"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Email
          <input
            type="email"
            placeholder="Email"
            value={user?.email}
            required
            disabled
          />
        </label>
        <label className="label">
          Phone
          <input
            maxLength="40"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="label">
          License Number
          <input
            maxLength="20"
            placeholder="License Number"
            value={licenseNum}
            onChange={(e) => setLicenseNum(e.target.value)}
          />
        </label>
        <label className="label">
          Office
          <input
            maxLength="100"
            placeholder="Office"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
          />
        </label>
        <label className="label">
          Bio
          <textarea
            maxLength="2000"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </label>
        <div className="error-list">
          {errors.map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </div>
        <div className="btn-wrap">
          <button type="button" className="btn btn-bl" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;