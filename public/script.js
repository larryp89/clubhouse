async function checkRiddle(event) {
  event.preventDefault();
  const answer = document
    .querySelector("#riddleAnswer")
    .value.trim()
    .toLowerCase();
  if (answer === "fire") {
    // Send a request to the server to udpate the user status
    const response = await fetch("/verify", {
      method: "POST",
    });
    if (response.ok) {
      alert("Congratulations, you are now a member!");
      window.location.href = "/"; // Redirects to the homepage
    } else {
      alert("Error updating membership status.");
    }
  } else {
    alert("Incorrect answer. Please try again.");
  }
}

const riddleForm = document.querySelector("#riddleForm");
riddleForm.addEventListener("submit", checkRiddle);
