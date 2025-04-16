async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data from", url, error);
    return null;
  }
}

async function fetchPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const data = await fetchJSON(url);

  if (!data || !Array.isArray(data.results)) {
    console.warn(" No Pokémon data found or data format is incorrect.");
    return;
  }

  data.results.forEach(pokemon => {
    if (pokemon?.url) {
      fetchPokemonData(pokemon);
    } else {
      console.warn(" Missing 'url' in Pokémon data:", pokemon);
    }
  });
}

async function fetchPokemonData(pokemon) {
  const data = await fetchJSON(pokemon.url);
  if (data) {
    pokemonDetails(data);
  }
}