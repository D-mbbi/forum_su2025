import Message from "./Message.jsx";
import axios from "axios";

function MessagesList(props) {

    const { message, profil} = props;

    const handleDeleteMessage = (id) => {
        if (!window.confirm("Supprimer ce message ?")) return;
        axios.delete(`/api/post/deletePost/${id}`, {withCredentials: true})
        .catch(err => console.error(err));
    };
    console.log(message)

    return (
        <div className="messagesLists">
            {!message || message.length == 0 ? 'Aucun message' : [...message].reverse().map((msg) => (
                !msg.answeredPostID ?
                <Message
                    key={msg._id}
                    msgID={msg._id}
                    userID={msg.userID}
                    contenu={msg.content}
                    date={`${(new Date(msg.date)).getDate().toString().padStart(2, '0')}/${((new Date(msg.date)).getMonth()+1).toString().padStart(2, '0')}/${(new Date(msg.date)).getFullYear().toString()}`   }
                    heure={`${(new Date(msg.date)).getHours().toString().padStart(2, '0')}:${(new Date(msg.date)).getMinutes().toString().padStart(2, '0')}`}
                    nombreLikes={msg.likes || 0}
                    comments={msg.comments || []}
                    canDelete={profil}
                    onDelete={(id) => handleDeleteMessage(id)}
                    isAdminForum={msg.forumID == '682dd5a1504d8089a7c0d3f7'}
                /> : null
            ))}
        </div>
    );
}

export default MessagesList;
