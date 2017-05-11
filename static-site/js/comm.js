// Via Chirp

const apiURL = 'https://phvya9wj0j.execute-api.us-east-1.amazonaws.com/game/charadesagainsthumanity';

let score = {
  teamA: 0,
  teamB: 0,
};

$(document).ready(() => {
  console.log("Developed on AWS. https://github.com/devgorilla");
  $("#cardText").click((ev) => {
    console.log('click');
    newCard();
  });

  $("#teamA").click((ev) => {
    console.log('teamA');

    score.teamA +=1;
    $("#scoreA").html(score.teamA);
  });

  $("#teamB").click((ev) => {
    console.log('teamB');

    score.teamB +=1;
    $("#scoreB").html(score.teamB);
  });
});

function newCard() {
  httpGetAsync(apiURL, (results) => {
    const cardText = `<p>${results}</p>`
    $("#cardText").html(cardText);
  })
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
