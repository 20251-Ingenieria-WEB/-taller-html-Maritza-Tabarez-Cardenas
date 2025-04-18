/**
 * A map that assigns Pokémon stat names to their corresponding icons.
 * The icons are used to visually represent each stat in the user interface.
 * @type {Object.<string, string>}
 */

const statIcons = {
    "hp": "ti ti-clipboard-heart",
    "attack": "ti ti-sword",
    "defense": "ti ti-shield-chevron",
    "special-attack": "ti ti-swords",
    "special-defense": "ti ti-shield-checkered",
    "speed": "ti ti-brand-speedtest"
};
/**
 * Creates and adds a list of Pokémon stats to a `<ul>` element,
 * using icons and values based on the provided data.
 * @param {Array<Object>} stats - An array of objects containing the Pokémon's stats.
 * Each object must have a `stat.name` property for the stat name and a `base_stat` property for its value.
 * @param {HTMLElement} ul - The `<ul>` container to which the stats will be added.
 * @returns {void}
 */

function pokemonStats(stats, ul) {
    stats.forEach(function (stat) {
        let statLi = document.createElement('li');
        statLi.classList.add(`stat-${stat['stat']['name']}`);

        // Icon
        let icon = document.createElement('i');
        icon.className = statIcons[stat['stat']['name']] || "ti ti-star";
        icon.classList.add("stat-icon");

        // Name
        let label = document.createElement('div');
        label.className = "stat-label";
        label.innerText = capitalize(stat.stat.name);

       
        let value = document.createElement('div');
        value.className = "stat-value";
        value.innerText = stat['base_stat'];

        statLi.append(icon, label, value);
        ul.appendChild(statLi);
    });
}