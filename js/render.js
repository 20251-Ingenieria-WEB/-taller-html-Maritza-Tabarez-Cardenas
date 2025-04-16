async function render() {
    let pokemonContainer = document.querySelector("#pokemon-container");
    if (!pokemonContainer) return; // Verificar si el contenedor existe

    clearContainer(pokemonContainer);
    await fetchPokemon();
}

function pokemonDetails(pokeData) {
    const pokemonContainer = document.getElementById("pokemon-container");
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon-card");

    const cardHeader = createCardHeader(pokeData);
    const pokemonName = createPokeName(pokeData.name);
    const pokemonNumber = createPokemonNumber(pokeData.id);
    const pokemonTypesText = createPokemonTypes(pokeData.types);
    const pokemonStatsUl = createPokemonStats(pokeData.stats);
    const showMoreButton = createShowMoreButton(pokeData);

    pokemonDiv.append(pokemonNumber, cardHeader, pokemonName, pokemonTypesText, pokemonStatsUl, showMoreButton);
    pokemonContainer.appendChild(pokemonDiv);
}

const loadMoreBtn = document.getElementById("load-more");
loadMoreBtn.addEventListener("click", () => {
    if (currentFilter) {
        renderFilteredPokemon();
    } else {
        offset += limit;
        fetchPokemon();
    }
});
