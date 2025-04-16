function openModal(height, weight, abilities, evolutionData) {
  try {
    const modal = document.getElementById("pokemon-modal");
    if (!modal) throw new Error("Modal not found");

    setPokemonInfo(height, weight, abilities);
    renderEvolutionStages(evolutionData);

    modal.style.display = "block";
  } catch (error) {
    console.error("Error opening modal:", error);
    showUserError("Something went wrong while displaying the Pokémon details.");
  }
}

function setPokemonInfo(height, weight, abilities) {
  const heightElement = document.getElementById("pokemon-height");
  const weightElement = document.getElementById("pokemon-weight");
  const abilityElement = document.getElementById("pokemon-abilities");

  if (!heightElement || !weightElement || !abilityElement) {
    throw new Error("Pokemon info elements not found in the DOM");
  }

  heightElement.innerText = `${height ?? "N/A"} cm`;
  weightElement.innerText = `${weight ?? "N/A"} kg`;

  if (Array.isArray(abilities)) {
    abilityElement.innerText = abilities
      .map((ability) => ability?.ability?.name ?? "N/A")
      .join(", ");
  } else {
    abilityElement.innerText = "N/A";
  }
}

function renderEvolutionStages(evolutionData) {
  const evolutionElement = document.getElementById("pokemon-evolution");
  if (!evolutionElement) throw new Error("Evolution element not found");

  evolutionElement.innerHTML = "";

  if (!Array.isArray(evolutionData) || evolutionData.length === 0) {
    evolutionElement.innerText = "No evolution data available.";
    return;
  }

  evolutionData.forEach((stage, index) => {
    try {
      const container = createEvolutionStage(stage, index, evolutionData.length);
      evolutionElement.appendChild(container);
    } catch (e) {
      console.warn("Error rendering evolution stage:", e);
    }
  });
}

function createEvolutionStage(stage, index, totalStages) {
  if (!stage || !stage.img || !stage.name) {
    throw new Error("Invalid evolution stage data");
  }

  const container = document.createElement("div");
  container.classList.add("evolution-stage");
  if (index === 0) container.classList.add("active");

  const img = document.createElement("img");
  img.src = stage.img;
  img.alt = stage.name;
  img.classList.add("evolution-img");

  const name = document.createElement("p");
  name.innerText = stage.name;

  const nextBtn = document.createElement("i");
  nextBtn.className = "ti ti-arrow-right next-evo-btn";

  nextBtn.addEventListener("click", () => {
    const stages = document.querySelectorAll(".evolution-stage");
    stages.forEach((s) => s.classList.remove("active"));
    const nextIndex = (index + 1) % totalStages;
    stages[nextIndex].classList.add("active");
  });

  container.appendChild(img);
  container.appendChild(name);
  container.appendChild(nextBtn);

  return container;
}

async function pokemonEvolution(pokemonId, callback) {
  try {
    const speciesData = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    if (!speciesData) return callback([]);

    const evolutionData = await fetchJSON(speciesData.evolution_chain.url);
    if (!evolutionData) return callback([]);

    const evolutionStages = [];
    let current = evolutionData.chain;
    while (current) {
      evolutionStages.push(current.species.name);
      current = current.evolves_to[0] || null;
    }

    const evolutionDataWithImages = await Promise.all(
      evolutionStages.map(async (name) => {
        const data = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return {
          name: capitalize(data.name),
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
        };
      })
    );

    callback(evolutionDataWithImages);
  } catch (err) {
    console.error("Error fetching evolution chain:", err);
    callback([]);
  }
}

function closeModal() {
  const modal = document.getElementById("pokemon-modal");
  if (modal) modal.style.display = "none";
}

document.getElementById("close-btn").addEventListener("click", closeModal);



