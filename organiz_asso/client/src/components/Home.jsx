import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/Home.css";
import NavBar from "./NavBar.jsx";

function Home() {

    axios.get('http://localhost:8080/api/home',{withCredentials: true})
    .then()
    .catch((error) =>{
        if (error.response?.status === 401) {
            navigate('/')
        } else {
            console.error(error);
    }
    });
    const [messages, setMessages] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('/api/auth/logout',{withCredentials: true})
        .then(res => {
            if(res.status == 200){
                console.log(res.data)
                navigate("/")
            }
        })
        .catch(error => console.log(error))
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
