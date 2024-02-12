window.addEventListener('load', function () {

  setUpSelect()
})

const setUpSelect = () => {
  // solution to obtaining and setting new url parameters from here:
  // https://www.sitepoint.com/get-url-parameters-with-javascript/
    const selector = document.getElementById('selector');
    const queryString = window.location.search;
   
    let currentUrl =  new URLSearchParams(queryString);

    selector.onchange = () => {
      let selectedVal = selector.value;
      if (selectedVal != 'reset'){
        let sort = selectedVal.split("_")[0];
        let direction = selectedVal.split("_")[1];
        currentUrl.set("sort", sort);
        currentUrl.set("direction", direction);
        window.location.URLSearchParams = null
        window.location.replace('?' + currentUrl);
      }

    }
}