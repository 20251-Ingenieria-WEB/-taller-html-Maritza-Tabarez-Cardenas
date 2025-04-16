const statIcons = {
    "hp": "ti ti-clipboard-heart",
    "attack": "ti ti-sword",
    "defense": "ti ti-shield-chevron",
    "special-attack": "ti ti-swords",
    "special-defense": "ti ti-shield-checkered",
    "speed": "ti ti-brand-speedtest"
};

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