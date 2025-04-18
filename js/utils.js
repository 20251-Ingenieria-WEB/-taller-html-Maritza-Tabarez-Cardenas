/**
 * Capitalizes the first letter of a text and leaves the rest in lowercase.
 * @param {string} text - The text to be capitalized.
 * @returns {string} The text with the first letter in uppercase.
 */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Clears all the content inside a given HTML container, removing its contents.
 * @param {HTMLElement} container - The HTML container whose content will be cleared.
 * @returns {void}
 */
function clearContainer(container) {
  container.innerHTML = "";
}
/**
 * Displays an error message to the user. If the error message element exists in the DOM,
 * it uses it to display the message. If not, it shows an alert as an alternative.
 * @param {string} message - The error message to be displayed to the user.
 * @returns {void}
 */
function showUserError(message) {
  const errorBox = document.getElementById("error-message");
  if (errorBox) {
    errorBox.innerText = message;
    errorBox.style.display = "block";
  } else {
    alert(message);
  }
}