var API_KEY = "cbe55ac9-94b9-4ff0-90bd-f35a22620344"; 
var API_URL = "https://api.cricapi.com/v1/currentMatches?apikey=" + API_KEY;

var scoresContainer = document.getElementById("scoresContainer");
var loadingMessage = document.getElementById("loadingMessage");

function fetchLiveScores() {
  loadingMessage.style.display = "block"; 

  fetch(API_URL) 
    .then(function (response) {
      return response.json(); 
    })
    .then(function (data) {
      if (data && data.data) {
        var matches = data.data; 
        if (matches.length > 0) {
          loadingMessage.style.display = "none";
          displayScores(matches); 
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

function displayScores(matches) {
  scoresContainer.innerHTML = ""; 

  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];

    var team1 = "Team 1";
    var team2 = "Team 2";
    var score = "Score not available";
    var status = "N/A";

    if (match.teamInfo) {
      if (match.teamInfo[0]) {
        team1 = match.teamInfo[0].name || "Team 1";
      }
      if (match.teamInfo[1]) {
        team2 = match.teamInfo[1].name || "Team 2";
      }
    }

    if (match.score && match.score.length > 0) {
      score = match.score[0].r + "/" + match.score[0].w;
    }

    if (match.status) {
      status = match.status;
    }
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

    scoresContainer.appendChild(matchDiv); 
  }
}

// Fetch live scores when the page loads
fetchLiveScores();

// Refresh every 30 seconds
setInterval(fetchLiveScores, 30000);
