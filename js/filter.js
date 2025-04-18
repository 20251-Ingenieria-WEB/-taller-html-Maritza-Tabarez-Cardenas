/**
 * Filters the Pokémon from the API by type and updates the view with the results.
 * @param {string} type - The type of Pokémon to filter by (e.g., "fire", "water", etc.). If it's "all", all Pokémon are shown.
 */

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

/**
 * Fetches a list of Pokémon from the API filtered by type.
 * @param {string} type - The type of Pokémon to search for (e.g., "fire", "water", etc.).
 * @returns {Promise<Object[]>} A promise that resolves with a list of Pokémon of that type.
 * @throws {Error} If an error occurs during the request.
 */

async function fetchPokemonByType(type) {
    const url = `https://pokeapi.co/api/v2/type/${type}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Server responded with an error");

    const data = await response.json();
    return data.pokemon.map(p => p.pokemon);
}

/**
 * Renders a "slice" of the filtered Pokémon list, with support for manual pagination.
 * @returns {void}
 */

function renderFilteredPokemon() {
    const chunk = filteredPokemonList.slice(filteredOffset, filteredOffset + limit);
    chunk.forEach(pokemon => {
        fetchPokemonData(pokemon);
    });
    filteredOffset += limit;
}

/**
 * Sets up the type filters in the dropdown menu to filter Pokémon.
 * @returns {void}
 */
function setupTypeFilters() {
    document.querySelectorAll(".dropdown-content a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedType = link.getAttribute("data-type").toLowerCase();
            filterPokemonFromAPI(selectedType);
        });
    });
}

