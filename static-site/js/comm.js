// Via Chirp

var pingInterval = 20000
const apiURL = 'https://phvya9wj0j.execute-api.us-east-1.amazonaws.com/game/charadesagainsthumanity';

$(document).ready(() => {
  console.log("Developed on AWS. https://github.com/devgorilla");
  $("#cardText").click((ev) => {
    console.log('click');
    newCard();
  });
});

function newCard() {
  httpGetAsync(apiURL, (results) => {
      const newHtml = `<p>${results}</p>`
    $("#cardText").html(newHtml);
  })
}

function httpPostAsync(url, message) {
const http = new XMLHttpRequest()
  /*
  const message = {
    decks: ["base"],
    level: 4,
    score: {
      team_a: 0,
      team_b: 0
    }, // game_name
  }
  httpPostAsync(apiURL, message);
  */

  var params = JSON.stringify(message)
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json")
  http.onreadystatechange = () => {
    console.log(http.status);
    if (http.readyState == 4 && http.status == 200) {
      //TODO Make #chirpText value clear after Post
    }
  }
  http.send(params)
}

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
