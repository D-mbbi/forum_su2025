import { useParams } from "react-router";
import NavBar from "./NavBar";
import MessagesList from "./MessagesList";
import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile(){

    const { id } = useParams(); // récupère le userID dans l'URL

    const [userMessages, setUserMessages] = useState([]);

    useEffect(() => {
        axios.get(`/api/post/getUserPost/${id}`, {withCredentials : true})
        .then( res => {
            if(res.data){
                setUserMessages(res.data.post)
            }
        }
        )
        .catch(err => console.error(err))
    },[id])

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
