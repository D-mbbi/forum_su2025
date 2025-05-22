import NavBar from "./NavBar";
import MessagesList from "./MessagesList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Profile(){

    const [message, setMessages] = useState([]);

    useEffect(() => {
        axios.get('/api/post/getProfilePost', {withCredentials : true})
        .then( res => {
            if(res.data){
                setMessages(res.data.post)
            }
        }
        )
        .catch(err => console.error(err))
    })


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
