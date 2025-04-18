/**
 * Returns a string with the Pokémon's types, formatted and separated by "/".
 * If a valid array of types is not provided, "Unknown" is returned.
 * @param {Array} types - An array of objects containing the Pokémon's types.
 * @returns {string} A string with the formatted Pokémon types.
 */
function pokemonTypes(types) {
  if (!Array.isArray(types)) return "Unknown";
  return types
    .map(type => type?.type?.name ? capitalize(type.type.name) : "Unknown")
    .join("/");
}
/**
 * Creates and returns the header of a Pokémon card, which includes the Pokémon's image.
 * @param {Object} pokeData - The Pokémon data, which must include its ID.
 * @returns {HTMLElement} A DOM element representing the header of the Pokémon card.
 */
function createCardHeader(pokeData) {
  if (!pokeData?.id) {
    //console.warn("Invalid pokeData for header", pokeData);
    showUserError("Something went wrong");
    return document.createElement("div");
  }

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("pokemon-card-header");

  const imgContainer = document.createElement("div");
  pokemonImg(pokeData.id, imgContainer);

  cardHeader.appendChild(imgContainer);
  return cardHeader;
}
/**
 * Creates and returns an element that displays the Pokémon's number (in #XXX format).
 * @param {number} id - The Pokémon's ID to generate its number.
 * @returns {HTMLElement} A DOM element containing the Pokémon's number.
 */
function createPokemonNumber(id) {
  const number = document.createElement("h3");
  if (!id) {
    number.innerText = "#000";
    return number;
  }

  const paddedId = String(id).padStart(3, "0");
  number.innerText = `#${paddedId}`;
  return number;
}
/**
 * Creates and returns an element that displays the Pokémon's name.
 * If the name is not available, it shows "Unknown".
 * @param {string} name - The name of the Pokémon.
 * @returns {HTMLElement} A DOM element containing the Pokémon's name.
 */
function createPokeName(name) {
  const nameElement = document.createElement("h2");
  nameElement.innerText = name ? capitalize(name) : "Unknown";
  return nameElement;
}
/**
 * Creates and returns a <p> element that displays the Pokémon's types.
 * The types are obtained by calling the `pokemonTypes()` function.
 * @param {Array} types - An array of objects containing the Pokémon's types.
 * @returns {HTMLElement} A <p> element displaying the Pokémon's types.
 */

function createPokemonTypes(types) {
  const p = document.createElement("p");
  p.innerText = pokemonTypes(types);
  return p;
}
/**
 * Creates and returns a list of the Pokémon's stats.
 * If a valid array of stats is not provided, a message is shown indicating that they are unavailable.
 * @param {Array} stats - An array of objects containing the Pokémon's stats.
 * @returns {HTMLElement} A <ul> element containing the Pokémon's stats.
 */

function createPokemonStats(stats) {
  const ul = document.createElement("ul");
  if (!Array.isArray(stats)) {
    ul.innerText = "Stats not available";
    return ul;
  }

  pokemonStats(stats, ul);
  return ul;
}
/**
 * Creates and returns a "Show More" button to display more details about the Pokémon.
 * When clicked, the button opens a modal with additional information about the Pokémon.
 * @param {Object} pokeData - The full Pokémon data, including its ID, height, weight, and abilities.
 * @returns {HTMLElement} A "Show More" button.
 */

function createShowMoreButton(pokeData) {
  const button = document.createElement("button");
  button.innerText = "Show More";
  button.classList.add("show-more-button");

  button.addEventListener("click", () => {
    if (!pokeData?.id) return;

    const height = pokeData.height ? pokeData.height * 10 : 0;
    const weight = pokeData.weight ? pokeData.weight / 10 : 0;

    pokemonEvolution(pokeData.id, function (evolutionInfo) {
      openModal(height, weight, pokeData.abilities || [], evolutionInfo);
    });
  });

  return button;
}
