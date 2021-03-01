const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search state.json and filter it
const searchState = async (searchText) => {
  const res = await fetch("../states.json");
  const states = await res.json();

  // Get matches to current text input
  let matches = states.filter((state) => {
    const regx = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regx) || state.abbr.match(regx);
  });
  if (searchText.length === 0) {
    matches = [];
  }
  outputHtml(matches);
};

//Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
            <div class='card card-body mb-1'>
                <h4>${match.name} (${match.abbr}) <span class='text-warning'>${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long} </small>
            </div>
        `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchState(search.value));
