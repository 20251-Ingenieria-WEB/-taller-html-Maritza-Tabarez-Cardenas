function filterPokemonFromAPI(type) {
    const pokemonContainer = document.querySelector("#pokemon-container");
    clearContainer(pokemonContainer);

    if (type === "all") {
        // Reset filter and fetch all Pokémon when "all" is selected
        currentFilter = null;
        offset = 0;
        fetchPokemon();
        return;
    }

    currentFilter = type;
    filteredOffset = 0;

    fetchPokemonByType(type)
        .then(pokemonList => {
            filteredPokemonList = pokemonList;
            renderFilteredPokemon();
        })
        .catch(error => {
            console.error("Error filtering Pokémon by type:", error);
            showUserError("Failed to load Pokémon of this type.");
        });
}

// Fetch Pokémon list from the API by type
async function fetchPokemonByType(type) {
    const url = `https://pokeapi.co/api/v2/type/${type}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Server responded with an error");

    const data = await response.json();
    return data.pokemon.map(p => p.pokemon);
}

// Render a "chunk" (slice) of the filtered Pokémon list, for manual pagination
function renderFilteredPokemon() {
    const chunk = filteredPokemonList.slice(filteredOffset, filteredOffset + limit);
    chunk.forEach(pokemon => {
        fetchPokemonData(pokemon);
    });
    filteredOffset += limit;
}



// Setup dropdown menu filters for Pokémon types
function setupTypeFilters() {
    document.querySelectorAll(".dropdown-content a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedType = link.getAttribute("data-type").toLowerCase();
            filterPokemonFromAPI(selectedType);
        });
    });
}

