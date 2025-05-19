import { Link } from "react-router";
import { useState } from "react";

function SignUp(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const U_handleChange = (e) => setUsername(e.target.value);
    const P_handleChange = (e) => setPassword(e.target.value);
    const P2_handleChange = (e) => setPassword2(e.target.value);

    const handleSubmit = () => {
        if (password != password2){
            alert("Les mots de passes doivent correspondre")
            setPassword2("")
        }

    }
    
    
    return (
    <div className="container">
        <div className="SignUpHeader" id="SignUpHeader">SignUp</div>
        <form className='SignUpForm' onSubmit={handleSubmit}>
            <label htmlFor='Username'>Username</label>
            <input type='text' className='LoginInput' id='Username' name="Username" value={username} onChange={U_handleChange} required/>
            <label htmlFor='Password'>Mot de passe</label>
            <input type='password' className='LoginInput' name='Password' value={password} onChange={P_handleChange} required/>
            <label htmlFor='Password2'>Confirmer le mot de passe</label>
            <input type='password' className='LoginInput' name='Password2' value={password2} onChange={P2_handleChange} required/>
            <button className='loginButton' type='submit'>SignUp</button>
            <p>Déja inscrit ? <Link to="/">Se connecter</Link></p>
        </form>
    </div>

    )
}
export default SignUp;