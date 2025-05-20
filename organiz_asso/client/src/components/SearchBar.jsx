import { useState } from "react";
import "../css/SearchBar.css"

function SearchBar(){

    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Recherche de : " + query);
    }

    return (
        <form className="searchBar" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Rechercher un message..." 
                value={query} 
                onChange={handleChange} 
                className="searchInput"
                required
            />
            <button type="submit" className="searchButton">🔍</button>
        </form>
    )
}

export default SearchBar;
