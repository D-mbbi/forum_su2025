import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/Home.css";
import NavBar from "./NavBar.jsx";
import MessagesList from "./MessagesList.jsx";
import MessageForm from "./MessageForm.jsx";


function Home() {

    axios.get('/api/home',{withCredentials: true})
    .then()
    .catch((error) =>{
        if (error.response?.status === 401) {
            navigate('/')
        } else {
            console.error(error);
    }
    });
    
    const [message, setMessages] = useState([
    {
        id: 3,
        auteur: "Ousmane",
        contenu: "ils vont perdres",
        date: "21/05/2025",
        heure: "14:40",
        nbLikes: 5,
        isAdmin: false,
        comments: 4
    },
    {
        id: 2,
        auteur: "Thuram",
        contenu: "on va perdre",
        date: "21/05/2025",
        heure: "14:35",
        nbLikes: 1,
        isAdmin: false,
        comments: 0
    },
    {
        id: 1,
        auteur: "Doue",
        contenu: "bientot la finale de la ldc",
        date: "21/05/2025",
        heure: "14:30",
        nbLikes: 3,
        isAdmin: true,
        comments: 2
    }
    ]);


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

                <MessageForm onPost={(contenu) => {
                const nouveau = {
                    id: message.length + 1,
                    auteur: "Moi",
                    contenu: contenu,
                    date: "21/05/2025",
                    heure: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    nbLikes: 0,
                    isAdmin: false,
                    comments: 0
                };
                setMessages([nouveau, ...message]);
                }} />

                <MessagesList message={message} />
            </div>
        </div>
    );
}

export default Home;
