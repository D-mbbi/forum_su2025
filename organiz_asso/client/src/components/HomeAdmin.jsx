import { useState, } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import axios from "axios";
import NavBar from "./NavBar.jsx";
import MessagesList from "./MessagesList.jsx";
import MessageForm from "./MessageForm.jsx";
import { useEffect } from "react";


function HomeAdmin({admin}) {

    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessages] = useState([]);
    const [newMessage, setNewMess] = useState(false);
    const [user, setUser] = useState("")

    useEffect(() => {
    axios.get('/api/forum/admin', { withCredentials: true })
        .then(res => {
            console.log(res.status)
            setIsAuthenticated(true);
            setIsAuthChecked(true);
        })
        .catch((error) => {
            if (error.response?.status === 401) {
                console.log(error)
                navigate('/');
            }else if((error.response?.status === 423)){
                alert("Vous n'avez pas accès à ce forum")
                navigate('/home')
            }else {
                console.error(error);
            }
            setIsAuthChecked(true);
        });
}, []);

    const location = useLocation();
    useEffect(() => {

    }, [location.pathname]);
    
    const [isAdminUser, setIsAdminUser] = useState(false);
    useEffect(() => {
        axios.get('/api/user/me', { withCredentials: true })
    .then(res => {
        setIsAdminUser(res.data.user.admin);
    })
    .catch(err => {
      console.error(err);
    });
}, []);
    
    
    
    

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

    const handlePost = (content) => {
        axios.post('/api/post/createPost',{'content' : content, forum: "682dd5a1504d8089a7c0d3f7"},{withCredentials: true})
        .then(res => {
            if(res.status == 500){
                console.log(res.data)
                setNewMess(true)
            }
            else{
                console.log(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    const handleSearch = (query) => {
        console.log("search : "+query)
        axios.get('/api/post/search',{withCredentials : true, params : {'query' : query, 'admin' : true}})
        .then(res => {
            if(res.status != 200){
                console.error(res.data)
            }else{
                console.log("results : ")
                console.log(res.data)
                setMessages(res.data.posts)
            }
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        axios.get('/api/post/getAll/admin')
    .then(res => {
        console.log(res.status)
        setMessages(res.status == 500 ? [] : res.data.post)
        console.log("refresh, newMessage: " + newMessage)
    })
    .catch((error) => {
        console.error(error)
    })
    }, [admin, newMessage,location.pathname])

    if (!isAuthChecked) {
    return <div>Chargement...</div>; // ou spinner
}


    return (
        <div className="home">
            <NavBar onSearch={handleSearch} isAdminUser={isAdminUser}/>
            <div className="container">
                <h1 className="HomeHeader">Forum</h1>
                <button onClick={handleLogout} className="logout-button">Se déconnecter</button>

                <MessageForm onPost={handlePost} />
                

                <MessagesList message={message} isAdminForum={true}/>
            </div>
        </div>
    );
}

export default HomeAdmin;
