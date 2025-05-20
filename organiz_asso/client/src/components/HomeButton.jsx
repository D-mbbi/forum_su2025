import { useNavigate, useLocation } from "react-router";

function HomeButton(){

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === "/home"){
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/home");
        }
    }
    
    return (
        <button className="homeButton" onClick={handleClick}>
            Organiz'Asso
        </button>
    )
}

export default HomeButton;