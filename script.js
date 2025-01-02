// API key and endpoint
var API_KEY = "cbe55ac9-94b9-4ff0-90bd-f35a22620344"; // Replace this with a valid key
var API_URL = "https://api.cricapi.com/v1/currentMatches?apikey=" + API_KEY;

// HTML elements
var scoresContainer = document.getElementById("scoresContainer");
var loadingMessage = document.getElementById("loadingMessage");

// Function to get live cricket scores
function fetchLiveScores() {
  loadingMessage.style.display = "block"; // Show loading message

  fetch(API_URL) // Call the API
    .then(function (response) {
      return response.json(); // Convert response to JSON
    })
    .then(function (data) {
      if (data && data.data) {
        var matches = data.data; // Get match data
        if (matches.length > 0) {
          loadingMessage.style.display = "none"; // Hide loading message
          displayScores(matches); // Show the matches
        } else {
          loadingMessage.innerText = "No live matches right now.";
        }
      } else {
        loadingMessage.innerText = "Error: No data found.";
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
      loadingMessage.innerText = "Could not load scores. Try later.";
    });
}

// Function to show match data
function displayScores(matches) {
  scoresContainer.innerHTML = ""; // Clear old scores

  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];

    var team1 = "Team 1";
    var team2 = "Team 2";
    var score = "Score not available";
    var status = "N/A";

    // Check if team names are available
    if (match.teamInfo) {
      if (match.teamInfo[0]) {
        team1 = match.teamInfo[0].name || "Team 1";
      }
      if (match.teamInfo[1]) {
        team2 = match.teamInfo[1].name || "Team 2";
      }
    }

    // Check if score is available
    if (match.score && match.score.length > 0) {
      score = match.score[0].r + "/" + match.score[0].w;
    }

    // Check if status is available
    if (match.status) {
      status = match.status;
    }

    // Create a simple match card
    var matchDiv = document.createElement("div");
    matchDiv.className = "match";

    matchDiv.innerHTML =
      "<p><b>" +
      team1 +
      " vs " +
      team2 +
      "</b></p>" +
      "<p>🏏 Score: " +
      score +
      "</p>" +
      "<p>Status: " +
      status +
      "</p>";

    scoresContainer.appendChild(matchDiv); // Add match card to container
  }
}

// Fetch live scores when the page loads
fetchLiveScores();

// Refresh every 30 seconds
setInterval(fetchLiveScores, 30000);