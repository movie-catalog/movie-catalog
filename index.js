// const paragraphData = $("#data")
// const currencyCode = $("#curreny-code")
// const currencyName = $("#curreny-name")
// const currencySymbol = $("#curreny-symbol")
const mainRow = $("#main-row")
// const currencySymbol = $("#curreny-symbol")

// URL: https://restcountries.eu/rest/v2/alpha/id
// {code: "IDR", name: "Indonesian rupiah", symbol: "Rp"}

// fetch('https://restcountries.eu/rest/v2/alpha/ind')
//   .then(response => response.json()).then(data => {
//     // GET CURRENCY ONLY
//     const currency = data.currencies[0]
//
//     // INSERT DATA INTO PARAGRAPH
//     paragraphData.html(JSON.stringify(currency))
//
//     // PROPRAGATE DATA INTO INPUT BOXES
//     currencyCode.val(currency.code)
//     currencyName.val(currency.name)
//     currencySymbol.val(currency.symbol)
//   });

function searchMovie(searchTitle = null, type = null, year = null) {
  var fetchUrl = `http://www.omdbapi.com/?`
  var isFirstParam = true

  var innerHtml = ``;

  if (title !== null) {
    fetchUrl = fetchUrl + `s=${title}`
    isFirstParam = false;
  }
  if (type !== null) {
    (isFirstParam) ? (fetchUrl = fetchUrl + `type=${searchType}`) : (fetchUrl = fetchUrl + `&type=${searchType}`)
  }
  if (year !== null) {
    (isFirstParam) ? (fetchUrl = fetchUrl + `y=${searchYear}`) : (fetchUrl = fetchUrl + `&y=${searchYear}`)
  }

  fetchUrl = fetchUrl + `&apikey=fbe6dc54&`

  console.log(fetchUrl);

  fetch(fetchUrl)
    .then(response => response.json()).then(data => {

      var searchData = data.Search;
      console.log(typeof searchData);
      console.log(searchData.length);
      console.log(JSON.stringify(searchData[0]['Poster']));
      for (i = 0; i < searchData.length; i++) {
        var poster = JSON.stringify(searchData[i]['Poster'])
        var title = JSON.stringify(searchData[i]['Title'])
        if (poster === "N/A") {
          poster = "./assets/img/cover-not-available.jpg"
        }

        innerHtml = innerHtml + `
                <div class="col-md-15 col-xs-3 mb-2">
                  <div class="card">
                    <img class="card-img-top custom-res p-2" src=${poster} alt="Card image cap">
                    <div class="card-block">
                      <h4 class="card-title pl-2">${title} </h4>
                      <p class="card-text pl-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary  ml-2 mb-2">Go somewhere</a>
                    </div>
                  </div>
                </div>
                `
      }
      mainRow.html(innerHtml)


    });

  function getMovies(searchTitle) {
    axios.get('http://www.omdbapi.com?s=' + searchTitle + '&apikey=97e22bf3')
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
              <div class="col-md-3">
                <div class="well text-center">
                  <img src="${movie.Poster}">
                  <h5>${movie.Title}</h5>
                  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
              </div>
            `;
        });

        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  $(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
      let searchTitle = $('#searchTitle').val();
      getMovies(searchTitle);
      e.preventDefault();
    });
  });

  // fetch('')
  //   .then(response => response.json()).then(data => {
  //     // GET CURRENCY ONLY
  //     const currency = data.currencies[0]
  //
  //     // INSERT DATA INTO PARAGRAPH
  //     paragraphData.html(JSON.stringify(currency))
  //
  //     // PROPRAGATE DATA INTO INPUT BOXES
  //     currencyCode.val(currency.code)
  //     currencyName.val(currency.name)
  //     currencySymbol.val(currency.symbol)
  //   });
}