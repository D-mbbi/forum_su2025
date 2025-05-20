import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../css/Login.css"

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validLogin, setValidLogin] = useState(false);

    const U_handleChange = (e) => setUsername(e.target.value);
    const P_handleChange = (e) => setPassword(e.target.value);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (username === "" || password === ""){
            alert("Veuillez remplir tous les champs");
            setValidLogin(false);
        } else {
            setValidLogin(true);
        }
    }

    useEffect(() => {
        if (validLogin){
            navigate("/home");
        }
    }, [validLogin,navigate]);

    return (
        <div className="login">
            <div className="container">
                <h1 className="LoginHeader" id="LoginHeader">Login</h1>
                <form className='LoginForm' onSubmit={handleSubmit}>
                    <div className="LoginInput">
                        <input type='text' id='Username' name="Username" value={username} onChange={U_handleChange} required/>
                        <label htmlFor='Username'>Username</label>
                    </div>
                    <div className="LoginInput">
                        <input type='password' name='Password' value={password} onChange={P_handleChange} required/>
                        <label htmlFor='Password'>Mot de passe</label>
                    </div>
                    <button className='loginButton' type='submit'>Se connecter</button>
                    <p>Pas de compte ? <Link to="/signup">Créer un compte</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;
