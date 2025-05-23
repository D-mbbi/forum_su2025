import { useState, useEffect } from "react";
import CommentForm from "./CommentForm.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Shield } from 'react-feather';

function Message(props){
    const { userID, contenu, msgID, date, heure, nombreLikes, forum, comments, canDelete, onDelete, isAdminForum } = props;

    const fetchCommentaires = () => {
    axios.get('/api/post/getPost', {
        withCredentials: true,
        params: { id: msgID }
    })
    .then(res => {
        setCommentaires(res.data.post.comments);
    })
    .catch((error) => {
        console.error(error);
    });
    
    };

    const fetchAvatar = () => {
        axios.get('/api/user/getUser', {withCredentials : true, params : {username : userID}})
        .then(res => {
        setAvatarUrl(res.data.user.avatarUrl);
    })
    .catch((error) => {
        console.error(error);
    });
    }

    useEffect(() => {
        fetchAvatar();
    },[])

    useEffect(() => {
        fetchCommentaires();
    },[])

    const [statutLike, setStatutLike] = useState(false);
    const [likeCount, setLikeCount] = useState(nombreLikes || 0);

    const [commentaires, setCommentaires] = useState(comments);

    const [avatarUrl, setAvatarUrl] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const liked = localStorage.getItem(`liked_${msgID}`);
        setStatutLike(liked === "true");
        setLikeCount(nombreLikes || 0);
    }, [msgID, nombreLikes]);

    const handleLike = () => {
        axios.patch(`/api/post/likePost/${msgID}`, {
            increment: !statutLike
        }, { withCredentials: true })
        .then(res => {
            setLikeCount(res.data.likes);
            const newStatut = !statutLike;
            setStatutLike(newStatut);

    
            if (newStatut) {
                localStorage.setItem(`liked_${msgID}`, "true");
            } else {
                localStorage.removeItem(`liked_${msgID}`);
            }
        })
        .catch(err => console.error(err));
    };


    const handleComment = (content) => {
        axios.post('/api/post/createPost',{'content' : content, forum: "682dd5eb504d8089a7c0d3fa", answeredPostID: msgID},{withCredentials: true })
        .then(res => {
            fetchCommentaires();
        })
        .catch(err => console.log(err))
    }

    



    return (
        <div className="message">
            <div className="message-header">
                <div className="message-user-meta">
                    <img
                    src={avatarUrl ? `http://localhost:8080${avatarUrl}` : "../assets/default-avatar.jpg"}
                    alt="avatar"
                    className="avatar-small"
                    />
                    <span
                        className="message-user clickable"
                        onClick={() => navigate(`/user/${userID}`)}
                    >
                        {userID} {/*{typeAdmin && <span className="admin-badge">[Admin]</span>} */}
                    </span>

                    <p className="message-date">{date} - {heure}</p>
                </div>
                <div className="message-controls">
                    {isAdminForum && (<Shield className="admin-icon" title="Forum administrateur" />)}
                    {canDelete && (<button className="delete-button" onClick={() => onDelete(msgID)} title="Supprimer le message">
                        <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="message-content">
                <p>{contenu}</p>
            </div>

            <div className="message-actions">
                <button className="like-button" onClick={handleLike}>
                    {statutLike ? "❤️" : "🤍"} {likeCount}
                </button>
                <span className="comments-count">
                    {commentaires.length} {commentaires.length === 1 ? "commentaire" : "commentaires"}
                </span>
            </div>

            <CommentForm onComment={handleComment} />

            <div className="commentaires">
                {commentaires.map((c) => (
                    <div key={c._id} className="commentaire">
                        <p><strong>{c.userID}</strong> : {c.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Message;
