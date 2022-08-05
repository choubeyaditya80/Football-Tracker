const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let leagueId = params.id;


function hideLoader() {
  const loader = document.getElementById("page-loader");
  loader.style.display = "none";
}


// local
fetch(`../data/standings/${leagueId}.json`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    hideLoader();
    inflateStandings(json);
  })
  .catch((err) => {
    console.error(err);
  });

  // API
// fetch(
//   `https://v3.football.api-sports.io/standings?league=${leagueId}&season=2021`,
//   {
//     method: "GET",
//     headers: {
//       "x-rapidapi-host": "v3.football.api-sports.io",
//       "x-rapidapi-key": "7aa0148ccedb969dfde2c978f033be0e",
//     },
//   }
// )
//   .then((response) => {
//     return response.json();
//   })
//   .then((json) => {
//     hideLoader();
//     inflateStandings(json);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

function getStandings(leagueData) {
  if (leagueData.standings.length === 1) {
    return leagueData.standings[0];
  }
  // const standings = [];
  // leagueData.standings.forEach(standing => { standings.push(...standing) })
  // return standings;
  return leagueData.standings[0];
}

function inflateStandings(data) {
  const leagueData = data.response[0].league;
  const standingsData = getStandings(leagueData);

  // set background
  document.body.style.backgroundImage = `url(${leagueData.background})`;

  // create table
  const container = document.getElementById("content-container");
  const table = createTable(standingsData);

  container.appendChild(table);
}

function createTable(standingsData) {
  const tableContainer = document.createElement("div");
  tableContainer.className = "table-responsive";

  const table = document.createElement("table");
  table.className = "table table-light table-hover table-bordered";
  tableContainer.appendChild(table);

  const tableHead = document.createElement("thead");
  const tableHeaderRow = document.createElement("tr");
  tableHead.appendChild(tableHeaderRow);
  table.appendChild(tableHead);

  const tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  // add headers
  addTableHeaders(tableHeaderRow);

  // add content
  addTableContent(tableBody, standingsData);

  return tableContainer;
}

function addTableHeaders(tableHeaderRow) {
  const headers = [
    "Rank",
    "Team",
    "Played",
    "Wins",
    "Draws",
    "Losses",
    "Points",
    "Form",
  ];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = header;
    tableHeaderRow.appendChild(th);
  });
}

function addTableContent(tableBodyRow, standingsData) {
  standingsData.forEach((data) => {
    const row = document.createElement("tr");
    addTableRow(row, data);
    tableBodyRow.appendChild(row);
  });
}

function addTableRow(row, data) {
  // rank
  const rank = document.createElement("th");
  rank.scope = "row";
  rank.textContent = data.rank;
  row.appendChild(rank);

  // team
  const team = document.createElement("td");
  team.innerHTML = `<p><span class="team-logo"><img src=${data.team.logo}></span>${data.team.name}</p>`;
  row.appendChild(team);

  // played
  const played = document.createElement("td");
  played.textContent = data.all.played;
  row.appendChild(played);

  // win
  const win = document.createElement("td");
  win.textContent = data.all.win;
  row.appendChild(win);

  // draw
  const draw = document.createElement("td");
  draw.textContent = data.all.draw;
  row.appendChild(draw);

  // lose
  const lose = document.createElement("td");
  lose.textContent = data.all.lose;
  row.appendChild(lose);

  // points
  const points = document.createElement("td");
  points.textContent = data.points;
  row.appendChild(points);

  // form
  const formCell = document.createElement("td");
  createColoredForm(formCell, data.form);
  row.appendChild(formCell);
}

function createColoredForm(formCell, formData) {
  const para = document.createElement('p');
  const wld = formData.split('');
  wld.forEach(status => {
    const statusSpan = document.createElement('span');
    statusSpan.className = status === 'W' ? 'win' : status === 'D' ? 'draw' : status === 'L' ? 'loss' : '';
    statusSpan.textContent = status;
    para.appendChild(statusSpan);
  })
  formCell.appendChild(para);
}
