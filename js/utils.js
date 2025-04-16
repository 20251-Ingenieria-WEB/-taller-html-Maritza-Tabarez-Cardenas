function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

//  Clear all content inside a given container
function clearContainer(container) {
  container.innerHTML = "";
}

function showUserError(message) {
  const errorBox = document.getElementById("error-message");
  if (errorBox) {
    errorBox.innerText = message;
    errorBox.style.display = "block";
  } else {
    alert(message);
  }
}