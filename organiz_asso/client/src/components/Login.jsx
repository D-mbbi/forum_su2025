import { Link } from "react-router";
import { useState } from "react";
import "../css/Login.css"

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const U_handleChange = (e) => setUsername(e.target.value);
    const P_handleChange = (e) => setPassword(e.target.value);
    
    
    return (
    <div className="login">
        <div className="container">
            <h1 className="LoginHeader" id="LoginHeader">Login</h1>
            <form className='LoginForm'>
                <div className="LoginInput">
                    <input type='text' id='Username' name="Username" value={username} onChange={U_handleChange} required/>
                    <label htmlFor='Username'>Username</label>
                </div>
                <div className="LoginInput">
                    <input type='password'name='Password' value={password} onChange={P_handleChange} required/>
                    <label htmlFor='Password'>Mot de passe</label>
                </div>
                <button className='loginButton' type='submit'>LogIn</button>
                <p>Pas de compte ? <Link to="/signup">Créer un compte</Link></p>
            </form>
        </div>
    </div>

    )
}
export default Login;