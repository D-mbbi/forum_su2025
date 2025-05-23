import NavBar from "./NavBar";
import MessagesList from "./MessagesList";
import AvatarUploader from "./AvatarUploader";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Profile(){

    const [message, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/user/me", { withCredentials: true })
            .then((res) => {
                setUser(res.data.user);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);
    
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

    const handleAvatarUpload = (data) => {
        // Met à jour l'avatar dans l'état local après upload
        setUser(prev => ({ ...prev, avatarUrl: data.avatarUrl }));
    };

    if (loading) return <div>Chargement du profil...</div>;


    return (
       <div className="profile-page">
        <NavBar />
        <h1 className="MonProfil">Mon profil</h1>

            <div className="profile-avatar-section">
                <img
                    src={user.avatarUrl ? `http://localhost:8080${user.avatarUrl}` : "../assets/default-avatar.jpg"}
                    alt="Avatar"
                    className="profile-avatar"
                />
                <AvatarUploader onUploadSuccess={handleAvatarUpload}/>
            </div>

            <p className="nomProfil">
                <strong>Nom :</strong>&nbsp;{user.username}
            </p>

            <hr className="profile-separator" />
            
            <div className="container">
                <h1 className="ProfileHeader">Mes messages</h1>
                <MessagesList message={message} profil={true} />

            </div>
        </div> 
    )
}

export default Profile;
