import { useState, useEffect } from "react";
import "../css/SearchBar.css"

function SearchBar(props){

    const [query, setQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            props.search(query); // déclenche la recherche après 400ms d'inactivité
        }, 400); // ajuste le délai ici

        return () => clearTimeout(timer); // reset si l'utilisateur continue de taper
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.search(query);
    }

    return (
        <form className="searchBar" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Rechercher un message..." 
                value={query} 
                onChange={handleChange} 
                className="searchInput"
            />
            <button type="submit" className="searchButton">🔍</button>
        </form>
    )
}

export default SearchBar;
