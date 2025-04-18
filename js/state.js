/**
 * The offset for Pokémon pagination.
 * Determines from which Pokémon the loading will start in each request.
 * @type {number}
 */
let offset = 0;
/**
 * The current filter applied for searching or displaying specific Pokémon.
 * It may contain a Pokémon type (e.g., "fire", "water"), or be `null` if no filter is applied.
 * @type {string | null}
 */
let currentFilter = null;
/**
 * List of filtered Pokémon to be displayed in the UI.
 * It is updated when a filter or search is applied.
 * @type {Array<Object>}
 */
let filteredPokemonList = [];
/**
 * The offset for pagination when filters are applied.
 * Controls the starting point of the filtered Pokémon list.
 * @type {number}
 */
let filteredOffset = 0;
/**
 * The limit of Pokémon to load or display per page.
 * Sets how many Pokémon are shown per request or view.
 * @type {number}
 */
const limit = 12;


