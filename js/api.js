/**
 * Function that makes an HTTP request to fetch data in JSON format.
 * @param {string} url - The URL to which the request is made.
 * @returns {Promise<Object|null>} The JSON data obtained from the URL or null in case of error.
 */

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    //console.error("Error fetching data from", url, error);
    showUserError("Something went wrong");
    return null;
  }
}
/**
 * Function that retrieves a list of Pokémon from the public API.
 * @param {number} limit - The number of Pokémon to retrieve.
 * @param {number} offset - The index from which to start retrieving Pokémon.
 */

async function fetchPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const data = await fetchJSON(url);

  if (!data || !Array.isArray(data.results)) {
    console.warn(" No Pokémon data found or data format is incorrect.");
    return;
  }

  // Loops through the list of Pokémon and fetches more details for each one
  data.results.forEach(pokemon => {
    if (pokemon?.url) {
      fetchPokemonData(pokemon);
    } else {
      //console.warn(" Missing 'url' in Pokémon data:", pokemon);
      showUserError("Something went wrong");
    }
  });
}
/**
 * Function that fetches the details of an individual Pokémon from the provided URL.
 * @param {Object} pokemon - The Pokémon object that contains the URL to fetch more details.
 */
async function fetchPokemonData(pokemon) {
  try {
    const data = await fetchJSON(pokemon.url);
    if (data) {
      pokemonDetails(data);
    }
  } catch (error) {
    //console.error("Error fetching Pokémon data:", error);
    showUserError("Failed to load Pokémon details.");
  }
}
/**
 * Creates and adds an image of the Pokémon to a container.
 * The image is fetched from a specific URL in the PokeAPI.
 * @param {number} id - The ID of the Pokémon to fetch its image.
 * @param {HTMLElement} container - The container to which the image will be added.
 * @returns {void}
 */
function pokemonImg(id, container) {
  if (!id || !container) return;

  const img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  img.alt = "Pokemon Image";
  container.appendChild(img);
}