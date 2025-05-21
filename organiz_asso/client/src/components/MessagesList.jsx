import Message from "./Message.jsx";
import "../css/MessagesList.css";

function MessagesList(props) {

    const { message } = props;

    return (
        <div className="messagesLists">
            {message.map((msg) => (
                <Message
                    key={msg.id}
                    msgID={msg.id}
                    userID={msg.auteur}
                    contenu={msg.contenu}
                    date={msg.date}
                    heure={msg.heure}
                    nbLikes={msg.nbLikes || 0}
                    typeAdmin={msg.isAdmin || false}
                    comments={msg.comments || 0}
                />
            ))}
        </div>
    );
}

export default MessagesList;
