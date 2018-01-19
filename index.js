const paragraphData = $("#data")
const currencyCode = $("#curreny-code")
const currencyName = $("#curreny-name")
const currencySymbol = $("#curreny-symbol")

// URL: https://restcountries.eu/rest/v2/alpha/id
// {code: "IDR", name: "Indonesian rupiah", symbol: "Rp"}

fetch('https://restcountries.eu/rest/v2/alpha/ind')
  .then(response => response.json()).then(data => {
    // GET CURRENCY ONLY
    const currency = data.currencies[0]

    // INSERT DATA INTO PARAGRAPH
    paragraphData.html(JSON.stringify(currency))

    // PROPRAGATE DATA INTO INPUT BOXES
    currencyCode.val(currency.code)
    currencyName.val(currency.name)
    currencySymbol.val(currency.symbol)
  });
