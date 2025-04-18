/**
 * Function that runs when the DOM content has fully loaded.
 * Ensures that the rendering and filter setup functions are executed when the page is initialized.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", function () {
    render();
    setupTypeFilters();
});