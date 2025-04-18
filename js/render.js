/**
 * Renders the Pokémon on the page.
 * Gets the Pokémon container and calls `fetchPokemon` to fetch the data.
 * If an error occurs during the rendering process, shows an error message to the user.
 * @returns {Promise<void>} Returns a promise that resolves when the rendering operations are complete.
 */

async function render() {
  let pokemonContainer = document.querySelector("#pokemon-container");
  if (!pokemonContainer) return;
  try {
    clearContainer(pokemonContainer);
    await fetchPokemon();
  } catch (error) {
    //console.error("Error rendering Pokémon:", error);
    showUserError("There was an issue rendering Pokémon.");
  }
}
/**
 * Displays the details of a Pokémon on the page.
 * Creates a `div` to contain the Pokémon card with its information,
 * including the header, name, number, types, stats, and a button to show more.
 * @param {Object} pokeData - The complete Pokémon data, including its ID, name, types, and stats.
 * @returns {void}
 */

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

  pokemonDiv.append(
    pokemonNumber,
    cardHeader,
    pokemonName,
    pokemonTypesText,
    pokemonStatsUl,
    showMoreButton
  );
  pokemonContainer.appendChild(pokemonDiv);
}
/**
 * Click event to load more Pokémon when the user clicks the "Load More" button.
 * If there is an active filter, the filtered Pokémon are rendered; otherwise, the offset is increased, and more Pokémon are fetched.
 * If an error occurs, it shows a message to the user.
 * @returns {void}
 */

const loadMoreBtn = document.getElementById("load-more");
loadMoreBtn.addEventListener("click", () => {
  try {
    if (currentFilter) {
      renderFilteredPokemon();
    } else {
      offset += limit;
      fetchPokemon();
    }
  } catch (error) {
    //console.error("Error loading more Pokémon:", error);
    showUserError("There was an issue loading more Pokémon.");
  }
});
