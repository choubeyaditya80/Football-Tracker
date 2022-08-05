fetch(`./data/leagues.json`).then((response) => {
  return response.json();
}).then((json) => {
  hideLoader();
 inflateLeagueCards(json);
}).catch((err) => {
  console.write(err);
})

function inflateLeagueCards(data) {
  const div = document.getElementById("leagues-container");
  data.response.forEach((league) => {
    div.appendChild(createLeagueCard(league));
  })
}

function createLeagueCard(leagueData) {
  const colDiv = document.createElement('div');
  colDiv.className = "col";
  
  const cardDiv = document.createElement('div');
  cardDiv.className = "card rounded-3 h-100 mx-auto";
  colDiv.appendChild(cardDiv);
  
  const logoImg = document.createElement('img');
  logoImg.className = "card-img";
  logoImg.src = leagueData.league.logo;
  cardDiv.appendChild(logoImg);
  
  const cardOverlay = document.createElement('div');
  cardOverlay.className = "standings-link card-img-overlay text-center";
  cardDiv.appendChild(cardOverlay);

  const linkStandings = document.createElement('a');
  linkStandings.href = `./standings/?id=${leagueData.league.id}`;
  linkStandings.className = "btn stretched-link";
  linkStandings.text = "Check Standings";
  cardOverlay.appendChild(linkStandings);

  return colDiv;
}

function hideLoader() {
  const loader = document.getElementById('page-loader');
  loader.style.display = 'none';
}