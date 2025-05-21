import { useState } from "react";
import CommentForm from "./CommentForm.jsx";
import "../css/Message.css";
import { useNavigate } from "react-router-dom";

function Message(props){

    const { userID, contenu, msgID, date, heure, nombreLikes, typeAdmin, comments } = props;

    const [statutLike, setStatutLike] = useState(false);

    const [commentaires, setCommentaires] = useState([]);

    const navigate = useNavigate();

    const handleLike = () => {
        setStatutLike(!statutLike);
    }

    const handleComment = (contenu) => {
        const nouveauCommentaire = {
            id: commentaires.length + 1,
            auteur: "Moi",
            contenu: contenu
        };
        setCommentaires([...commentaires, nouveauCommentaire]);
    }

    return (
        <div className="message">
            <div className="message-header">
                <div className="message-meta">
                    <span
                        className="message-user clickable"
                        onClick={() => navigate(`/user/${userID}`)}
                    >
                        {userID} {typeAdmin && <span className="admin-badge">[Admin]</span>}
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
                    <div key={c.id} className="commentaire">
                        <p><strong>{c.auteur}</strong> : {c.contenu}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Message;
