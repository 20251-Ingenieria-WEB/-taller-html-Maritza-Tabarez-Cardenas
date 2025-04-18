/**
 * Filters the Pokémon in the container based on the name entered in the search field.
 * Shows or hides the Pokémon cards depending on whether their name matches the search.
 * If no results are found, displays a message indicating that no Pokémon were found.
 * @returns {void}
 */

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

/**
 * Handles the message displayed when no search results are found.
 * If no results are found, displays a "No Pokémon found" message.
 * If results are found, removes the message if it was already displayed.
 * @param {boolean} hasResults - Indicates whether search results were found or not.
 * @param {HTMLElement} container - The container where the no-results message will be displayed.
 * @returns {void}
 */

function handleNoResultsMessage(hasResults, container) {
    let noResultsMessage = document.querySelector("#no-results");

    if (!hasResults) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement("p");
            noResultsMessage.id = "no-results";
            noResultsMessage.innerText = "No Pokémon found. Try another name.";
            container.appendChild(noResultsMessage);
        }
    } else if (hasResults && noResultsMessage) {
        noResultsMessage.remove();
    }
}


document.querySelector("#search-input").addEventListener("input", searchNamePokemon);
