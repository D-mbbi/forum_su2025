import { useState } from "react";


function CommentForm(props) {

    const [contenu, setContenu] = useState("");

    const handleChange = (e) => {
        setContenu(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (contenu.trim() !== "") {
            props.onComment(contenu);
            setContenu("");
        }
    };

    return (
        <div className="comment-form">
            <textarea
                value={contenu}
                onChange={handleChange}
                placeholder="Répondre à ce message..."
                className="comment-textarea"
            />
            <button onClick={handleSubmit} className="comment-button">Répondre</button>
        </div>
    );
}

export default CommentForm;
