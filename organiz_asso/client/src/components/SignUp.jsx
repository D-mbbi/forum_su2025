import axios from 'axios';
import { Link } from "react-router";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
function SignUp(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [validForm, setValidForm] = useState(false);
    
    const U_handleChange = (e) => setUsername(e.target.value);
    const P_handleChange = (e) => setPassword(e.target.value);
    const P2_handleChange = (e) => setPassword2(e.target.value);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password != password2){
            alert("Les mots de passes doivent correspondre")
            setPassword2("")
            setValidForm(false);
        }else{
            setValidForm(true);
            axios.post('/api/auth/signup', {"username": username, "password": password},{withCredentials : true}).then(res => console.log(res.data));
        }

    }

    useEffect( () => {
        if(validForm){
            navigate('/');
        }
    }, [validForm,navigate])
    
    
    return (
    <div className="signup">
        <div className="signup_container">
            <h1 className="SignUpHeader" id="SignUpHeader">SignUp</h1>
            <form method='POST' className='SignUpForm' onSubmit={handleSubmit}>
                <div className="SignUpInput">
                    <input type='text' className='password_input' id='Username' name="Username" value={username} onChange={U_handleChange} required/>
                    <label htmlFor='Username'>Username</label>
                </div>
                <div className="SignUpInput">
                    <input type='password' className='password_input' name='Password' value={password} onChange={P_handleChange} required/>
                    <label htmlFor='Password'>Mot de passe</label>
                </div>
                <div className="SignUpInput">
                    <input type='password' className='password_input' name='Password2' value={password2} onChange={P2_handleChange} required/>
                    <label htmlFor='Password2'>Confirmer le mot de passe</label>
                </div>
                <button className='loginButton' type='submit'>SignUp</button>
            <p className='lP'>Déja inscrit ? <Link to="/">Se connecter</Link></p>
        </form>
    </div>
    </div>

    )
}
export default SignUp;