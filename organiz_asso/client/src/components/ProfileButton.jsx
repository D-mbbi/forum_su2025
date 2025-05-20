import { useNavigate, useLocation } from "react-router";

function ProfileButton(){

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname.startsWith("/profile")){
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/profile");
        }
    }

    return (
        <button className="profileButton" onClick={handleClick}>
            Mon profil
        </button>
    )
}

export default ProfileButton;
