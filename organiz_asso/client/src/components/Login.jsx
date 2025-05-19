import { Link } from "react-router";
import { useState } from "react";

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const U_handleChange = (e) => setUsername(e.target.value);
    const P_handleChange = (e) => setPassword(e.target.value);
    
    
    return (
    <div className="container">
        <div className="LoginHeader" id="LoginHeader">Login</div>
        <form className='LoginForm'>
            <label htmlFor='Username'>Username</label>
            <input type='text' className='LoginInput' id='Username' name="Username" value={username} onChange={U_handleChange} required/>
            <label htmlFor='Password'>Mot de passe</label>
            <input type='password' className='LoginInput' name='Password' value={password} onChange={P_handleChange} required/>
            <button className='loginButton' type='submit'>LogIn</button>
            <p>Pas de compte ? <Link to="/signup">Créer un compte</Link></p>
        </form>
    </div>

    )
}
export default Login;