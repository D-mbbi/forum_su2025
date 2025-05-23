import { useNavigate, useLocation } from 'react-router-dom';
import { Shield } from 'react-feather';
import HomeButton from "./HomeButton";
import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton";

function NavBar(props){
    const navigate = useNavigate();
    const location = useLocation();

    const isAdmin = location.pathname.includes('/admin');

    const handleToggle = () => {
        navigate(isAdmin ? '/home' : '/home/admin');
  };
    return (
        <div className="navbar">
            <div className="navbar-left">
                <HomeButton />
                {props.isAdminUser && (
        <>
        <label className="switch">
          <input type="checkbox" checked={isAdmin} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
        <Shield className="admin-icon" title="Forum administrateur" />
        </>
        
      )}
            </div>
            <div className="navbar-center">
                <SearchBar search={props.onSearch}/>
            </div>
            <div className="navbar-right">
                <ProfileButton />
            </div>
        </div>
    )
}

export default NavBar;
