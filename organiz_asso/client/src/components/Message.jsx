import { useState, useEffect } from "react";
import CommentForm from "./CommentForm.jsx";
import "../css/Message.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Message(props){
    const { userID, contenu, msgID, date, heure, nombreLikes, forum, comments } = props;

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

    useEffect(() => {
        fetchCommentaires();
    },[])

    const [statutLike, setStatutLike] = useState(false);

    const [commentaires, setCommentaires] = useState(comments);

    const navigate = useNavigate();

    const handleLike = () => {
        setStatutLike(!statutLike);
        /*if(statutLike){
            nombreLikes+=1
        }else{
            nombreLikes-=1
        }
        */
    }

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
                <div className="message-meta">
                    <span
                        className="message-user clickable"
                        onClick={() => navigate(`/user/${userID}`)}
                    >
                        {userID} {/*{typeAdmin && <span className="admin-badge">[Admin]</span>} */}
                    </span>

                    <p className="message-date">{date} - {heure}</p>
                </div>
            </div>

            <div className="message-content">
                <p>{contenu}</p>
            </div>

            <div className="message-actions">
                <button className="like-button" onClick={handleLike}>
                    {statutLike ? "❤️" : "🤍"} {nombreLikes + (statutLike ? 1 : 0)}
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
