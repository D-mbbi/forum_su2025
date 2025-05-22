import { useState } from "react";

function MessageForm(props){

    const [contenu, setContenu] = useState("");

    const handleChange = (event) => {
        setContenu(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (contenu.trim() !== "") {
            props.onPost(contenu);
            setContenu("");
        }
    }

    return (
        <div className="message-form">
            <textarea
                value={contenu}
                onChange={handleChange}
                placeholder="Écris ton message ici..."
                className="message-form-textarea"
            />
            <button onClick={handleSubmit} className="message-form-button">Publier</button>
        </div>
    );
}

export default MessageForm;
