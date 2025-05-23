import Message from "./Message.jsx";

function MessagesList(props) {

    const { message } = props;

    return (
        <div className="messagesLists">
            {message.length == 0 ? 'Aucun message' : message.map((msg) => (
                !msg.answeredPostID ?
                <Message
                    key={msg._id}
                    msgID={msg._id}
                    userID={msg.userID}
                    contenu={msg.content}
                    date={  `${(new Date(msg.date)).getDate().toString().padStart(2, '0')}/${((new Date(msg.date)).getMonth()+1).toString().padStart(2, '0')}/${(new Date(msg.date)).getFullYear().toString()}`   }
                    heure={`${(new Date(msg.date)).getHours().toString().padStart(2, '0')}:${(new Date(msg.date)).getMinutes().toString().padStart(2, '0')}`}
                    nbLikes={msg.likes || 0}
                    comments={msg.comments || []}
                /> : null
            ))}
        </div>
    );
}

export default MessagesList;
