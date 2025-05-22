import { useParams } from "react-router";
import NavBar from "./NavBar";
import MessagesList from "./MessagesList";
import { useState, useEffect } from "react";

function UserProfile(){

    const { id } = useParams(); // récupère le userID dans l'URL

    const [userMessages, setUserMessages] = useState([]);

    useEffect(() => {
        // simulation : filtre local ou appel API plus tard
        const messagesSimules = [
            {
                id: 201,
                auteur: id,
                contenu: "Message 1 de " + id,
                date: "20/05/2025",
                heure: "12:00",
                nombreLikes: 2,
                isAdmin: false,
                comments: 1
            },
            {
                id: 202,
                auteur: id,
                contenu: "Deuxième post de " + id,
                date: "21/05/2025",
                heure: "10:32",
                nombreLikes: 5,
                isAdmin: false,
                comments: 0
            }
        ];
        setUserMessages(messagesSimules);
    }, [id]);

    return (
        <div className="user-profile">
            <NavBar />
            <div className="container">
                <h1 className="UserProfileHeader">Profil de {id}</h1>
                <MessagesList message={userMessages} />
            </div>
        </div>
    );
}

export default UserProfile;
