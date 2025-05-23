import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function ProfileButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const [avatarUrl, setAvatarUrl] = useState(null);

    const handleClick = () => {
        if (location.pathname.startsWith("/profile")) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/profile");
        }
    };

    useEffect(() => {
        axios.get("/api/user/me", { withCredentials: true })
            .then(res => {
                setAvatarUrl(res.data.user.avatarUrl);
            })
            .catch(err => console.error("Erreur get /me :", err));
    }, []);

    return (
        <button
            className="profileButton"
            onClick={handleClick}
            style={{ padding: 0, background: "none", border: "none" }}
        >
            <img
                src={avatarUrl ? `http://localhost:8080${avatarUrl}` : "../assets/default-avatar.jpg"}
                alt="avatar"
                className="avatar-navbar"
            />
        </button>
    );
}

export default ProfileButton;
