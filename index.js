// const paragraphData = $("#data")
// const currencyCode = $("#curreny-code")
// const currencyName = $("#curreny-name")
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

  if (searchTitle !== null) {
    fetchUrl = fetchUrl + `s=${searchTitle}`
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
      var arrData = JSON.stringify(data);
      console.log(arrData);
      console.log(arrData.length);
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