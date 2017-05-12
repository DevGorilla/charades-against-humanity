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

  window.timerActive = false;

  $("#timer").click((ev) => {
    var maxTime = 30;

    if (!window.timerActive) {
      document.getElementById("timer").style.color = 'BEBEBE';
      document.getElementById("time").innerText = maxTime;
      countDown(maxTime);
    } else {
      document.getElementById("timer").style.color = 'fff';
      clearInterval(window.timer);
    }
    // Flip the boolean
    window.timerActive = !window.timerActive;
  });
});

function countDown(i) {
  window.timer = setInterval(function () {
      document.getElementById("time").innerText = i;
      i--;
      if (i < 0 ) {
        clearInterval(timer);
        alert('Time\'s up yo!');
      }
  }, 1000);
}

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
