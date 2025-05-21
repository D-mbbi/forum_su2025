import NavBar from "./NavBar";
import MessagesList from "./MessagesList";
import { useState } from "react";
import "../css/Profile.css";

function Profile(){

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


    return (
        <div className="profile">
            <NavBar />
            <div className="container">
                <h1 className="ProfileHeader">Mes messages</h1>
                <MessagesList message={message} />

            </div>
        </div>
    )
}

export default Profile;
