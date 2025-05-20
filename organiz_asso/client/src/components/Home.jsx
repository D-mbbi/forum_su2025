import { useState } from "react";
import { useNavigate } from "react-router";
import "../css/Home.css";
import NavBar from "./NavBar.jsx";

function Home() {

    const [messages, setMessages] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    }

    return (
        <div className="home">
            <NavBar />
            <div className="container">
                <h1 className="HomeHeader">Forum</h1>
                <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                <div className="messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className="message">
                            <p><strong>{msg.auteur}</strong> : {msg.contenu}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
