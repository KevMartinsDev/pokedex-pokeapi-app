import React, { useState } from "react";

const SearchField = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={query} 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown} 
                placeholder="Buscar Pokémon por nome ou ID" 
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default SearchField;