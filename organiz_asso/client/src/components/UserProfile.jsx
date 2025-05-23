import { useParams } from "react-router";
import NavBar from "./NavBar";
import MessagesList from "./MessagesList";
import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile(){

    const { id } = useParams(); // récupère le userID dans l'URL

    const [user, setUser] = useState();
    const [userMessages, setUserMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        axios.get('/api/user/me', { withCredentials: true })
        .then(res => setCurrentUser(res.data.user))
        .catch(err => console.error(err));
    }, [user]);

    useEffect(() => {
        axios.get('/api/user/getUser', { withCredentials: true , params : {username : id}})
            .then(res => setUser(res.data.user))
            .catch(err => console.error(err));
    }, [user]);

    useEffect(() => {
        if(currentUser)
        axios.get(`/api/post/getUserPost/${id}`, {withCredentials : true})
        .then( res => {
            if(res.data){
                setUserMessages(res.data.post)
            }
        }
        )
        .catch(err => console.error(err))
    },[id,currentUser])

    const toggleAdminStatus = () => {
  axios.put(`/api/user/${id}/setStatus`, {
    admin: user.admin ? false : true
  }, { withCredentials: true })
    .then(res => {
      setUser(res.data.user);
    })
    .catch(err => console.error(err));
};

    if(!currentUser || !user){
        return <h1>Chargement...</h1>
    }

    return (
        <div className="user-profile">
            <NavBar />
            <div className="container">
                <h1 className="UserProfileHeader">Profil de {id}</h1>
                {currentUser.admin && currentUser.username !== id && (
  <button onClick={toggleAdminStatus} className="admin-toggle-btn">
    {user.admin ? 'Révoquer les droits admin' : 'Promouvoir en admin'}
  </button>
)}
                <MessagesList message={userMessages} user_viewer_admin={currentUser.admin}/>
            </div>
        </div>
    );
}

export default UserProfile;
