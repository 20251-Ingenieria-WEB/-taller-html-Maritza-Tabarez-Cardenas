function searchNamePokemon() {
    const searchInput = document.querySelector("#search-input").value.toLowerCase();
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    const container = document.querySelector("#pokemon-container");

    let foundMatch = false;

    pokemonCards.forEach(card => {
        const name = card.querySelector("h2").innerText.toLowerCase();
        const isMatch = name.includes(searchInput);

        card.style.display = isMatch ? "block" : "none";
        if (isMatch) foundMatch = true;
    });

    handleNoResultsMessage(foundMatch, container);
}


function handleNoResultsMessage(hasResults, container) {
    let noResultsMessage = document.querySelector("#no-results");

    if (!hasResults) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement("p");
            noResultsMessage.id = "no-results";
            noResultsMessage.innerText = "No Pokémon found. Try another name.";
            container.appendChild(noResultsMessage);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}


document.querySelector("#search-input").addEventListener("input", searchNamePokemon);
