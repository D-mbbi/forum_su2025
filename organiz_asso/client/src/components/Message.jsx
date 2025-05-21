import { useState } from "react";
import "../css/Message.css";

function Message(props){

    const { userID, contenu, msgID, date, heure, nbLikes, typeAdmin, comments } = props;

    const [statutLike, setStatutLike] = useState(false);

    const handleLike = () => {
        setStatutLike(!statutLike);
    }

    return (
        <div className="message">
            <div className="message-header">
                <p className="message-user">
                    {userID} {typeAdmin && <span className="admin-badge">[Admin]</span>}
                </p>
                <p className="message-date">{date} - {heure}</p>
            </div>
            <div className="message-content">
                <p>{contenu}</p>
            </div>
            <div className="message-actions">
                <button className="like-button" onClick={handleLike}>
                    {statutLike ? "❤️" : "🤍"} {nbLikes + (statutLike ? 1 : 0)}
                </button>
                <span className="comments-count">{comments} commentaires</span>
            </div>
        </div>
    );
}

export default Message;
