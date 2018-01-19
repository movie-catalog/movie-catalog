const mainRow = $("#main-row")
const buttonSearch = $("#buttonSearch")
const inputType = $("#inputType")
const inputYear = $("#inputYear")
const inputTitle = $("#inputTitle")


function searchMovie(title = null, type = null, year = null) {
  var fetchUrl = `http://www.omdbapi.com/?`
  var isFirstParam = true
  var innerHtml = ``;

  if (title !== null && title !== "") {
    fetchUrl = fetchUrl + `s=${title}`
    isFirstParam = false;
  }
  if (type !== null && type !== "") {
    (isFirstParam) ? (fetchUrl = fetchUrl + `type=${type}`) : (fetchUrl = fetchUrl + `&type=${type}`)
    isFirstParam = false;
  }
  if (year !== null && year !== "") {
    (isFirstParam) ? (fetchUrl = fetchUrl + `y=${year}`) : (fetchUrl = fetchUrl + `&y=${year}`)
    isFirstParam = false;
  }


  fetchUrl = fetchUrl + `&apikey=fbe6dc54&`
  fetchUrl.replace(" ", "+")
  console.log(fetchUrl);
  fetch(fetchUrl)
    .then(response => response.json()).then(data => {
      var searchData = data.Search;
      // console.log(typeof searchData);
      // console.log(searchData.length);
      // console.log(JSON.stringify(searchData[0]['Poster']));
      for (i = 0; i < searchData.length; i++) {
        var poster = JSON.stringify(searchData[i]['Poster'])
        var title = searchData[i]['Title'].replace("+", " ")
        var year = searchData[i]['Year'].replace("+", " ")
        var type = searchData[i]['Type'].replace("+", " ")

        if (poster === "N/A") {
          poster = "./assets/img/cover-not-available.jpg"
        }

        innerHtml = innerHtml + `
                <div class="col-md-15 col-xs-3 mb-2">
                  <div class="card">
                    <img class="card-img-top custom-res p-2" src=${poster} alt="Card image cap">
                    <div class="card-block">
                      <h4 class="card-title pl-2">${title}</h4>
                      <p class="card-text pl-2">Release ${type}: ${year}</p>
                      <a href="#" class="btn btn-primary ml-2 mb-2">Learn More</a>
                    </div>
                  </div>
                </div>`
      }
      mainRow.html(innerHtml)
    });
}

buttonSearch.click(function() {
  var title = inputTitle.val();
  var type = inputType.val()
  var year = inputYear.val()

  searchMovie(title, type, year)
});