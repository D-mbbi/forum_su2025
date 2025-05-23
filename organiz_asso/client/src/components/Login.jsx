import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import '../css/Login.css'

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validLogin, setValidLogin] = useState(false);

    const U_handleChange = (e) => setUsername(e.target.value);
    const P_handleChange = (e) => setPassword(e.target.value);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "" || password === ""){
            alert("Veuillez remplir tous les champs");
            setValidLogin(false);
        } else {
            axios.post('/api/auth/login',{'username' : username, 'password' : password}, {withCredentials: true})
            .then(
                res => {
                    console.log(res.data);
                    if(res.status == 200){
                        setValidLogin(true);
                    }
                }
            )
            .catch( error => {console.log(error.response.data)});
        }
    }

    useEffect(() => {
        if (validLogin){
            navigate("/home");
        }
    }, [validLogin,navigate]);

    return (
        <div className="login">
            <div className="login_container">
                <h1 className="LoginHeader" id="LoginHeader">Login</h1>
                <form className='LoginForm' onSubmit={handleSubmit}>
                    <div className="LoginInput">
                        <input className='password_input' type='text' id='Username' name="Username" value={username} onChange={U_handleChange} required/>
                        <label htmlFor='Username'>Username</label>
                    </div>
                    <div className="LoginInput">
                        <input className='password_input' type='password' name='Password' value={password} onChange={P_handleChange} required/>
                        <label htmlFor='Password'>Mot de passe</label>
                    </div>
                    <button className='loginButton' type='submit'>Se connecter</button>
                    <p className="lP">Pas de compte ? <Link to="/signup">Créer un compte</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;
