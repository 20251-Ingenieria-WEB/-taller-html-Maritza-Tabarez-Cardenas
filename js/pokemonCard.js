function pokemonTypes(types) {
  if (!Array.isArray(types)) return "Unknown";
  return types
    .map(type => type?.type?.name ? capitalize(type.type.name) : "Unknown")
    .join("/");
}

function pokemonImg(id, container) {
  if (!id || !container) return;

  const img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  img.alt = "Pokemon Image";
  container.appendChild(img);
}

function createCardHeader(pokeData) {
  if (!pokeData?.id) {
    console.warn("Invalid pokeData for header", pokeData);
    return document.createElement("div");
  }

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("pokemon-card-header");

  const imgContainer = document.createElement("div");
  pokemonImg(pokeData.id, imgContainer);

  cardHeader.appendChild(imgContainer);
  return cardHeader;
}

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

function createPokeName(name) {
  const nameElement = document.createElement("h2");
  nameElement.innerText = name ? capitalize(name) : "Unknown";
  return nameElement;
}

function createPokemonTypes(types) {
  const p = document.createElement("p");
  p.innerText = pokemonTypes(types);
  return p;
}

function createPokemonStats(stats) {
  const ul = document.createElement("ul");
  if (!Array.isArray(stats)) {
    ul.innerText = "Stats not available";
    return ul;
  }

  pokemonStats(stats, ul);
  return ul;
}

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
