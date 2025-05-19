import { Link } from "react-router";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import '../css/Login.css'

function SignUp(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [validForm, setValidForm] = useState(false);
    
    const U_handleChange = (e) => setUsername(e.target.value);
    const P_handleChange = (e) => setPassword(e.target.value);
    const P2_handleChange = (e) => setPassword2(e.target.value);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (password != password2){
            alert("Les mots de passes doivent correspondre")
            setPassword2("")
            setValidForm(false);
        }else{
            setValidForm(true)
        }

    }

    useEffect( () => {
        if(validForm){
            navigate('/');
        }
    }, [validForm,navigate])
    
    
    return (
    <div className="signup">
        <div className="container">
            <h1 className="SignUpHeader" id="SignUpHeader">SignUp</h1>
            <form className='SignUpForm' onSubmit={handleSubmit}>
                <div className="SignUpInput">
                    <input type='text' id='Username' name="Username" value={username} onChange={U_handleChange} required/>
                    <label htmlFor='Username'>Username</label>
                </div>
                <div className="SignUpInput">
                    <input type='password' name='Password' value={password} onChange={P_handleChange} required/>
                    <label htmlFor='Password'>Mot de passe</label>
                </div>
                <div className="SignUpInput">
                    <input type='password' name='Password2' value={password2} onChange={P2_handleChange} required/>
                    <label htmlFor='Password2'>Confirmer le mot de passe</label>
                </div>
                <button className='loginButton' type='submit'>SignUp</button>
            <p>Déja inscrit ? <Link to="/">Se connecter</Link></p>
        </form>
    </div>
    </div>

    )
}
export default SignUp;