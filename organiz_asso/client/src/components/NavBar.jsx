import HomeButton from "./HomeButton";
import SearchBar from "./SearchBar";
import ProfileButton from "./ProfileButton";
import "../css/NavBar.css";

function NavBar(){

    return (
        <div className="navbar">
            <div className="navbar-left">
                <HomeButton />
            </div>
            <div className="navbar-center">
                <SearchBar />
            </div>
            <div className="navbar-right">
                <ProfileButton />
            </div>
        </div>
    )
}

export default NavBar;
