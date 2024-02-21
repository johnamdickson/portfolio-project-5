window.addEventListener('load', function () {
  setUpSelect();
  styleProductCards();
  sizeSelectCheck();
})

const setUpSelect = () => {
  /**
   * Function to query URL search parameters and update on change of
   * select input.
   */
  // solution to obtaining and setting new url parameters from here:
  // https://www.sitepoint.com/get-url-parameters-with-javascript/
  const selector = document.getElementById('selector');
  if (selector) {
    const queryString = window.location.search;

    let currentUrl = new URLSearchParams(queryString);

    selector.onchange = () => {
      let selectedVal = selector.value;
      if (selectedVal != 'reset') {
        let sort = selectedVal.split("_")[0];
        let direction = selectedVal.split("_")[1];
        currentUrl.set("sort", sort);
        currentUrl.set("direction", direction);
        window.location.URLSearchParams = null
        window.location.replace('?' + currentUrl);
      } else {
        currentUrl.delete("sort")
        currentUrl.delete("direction")
        if (currentUrl) {
          window.location.replace('?' + currentUrl)
        } else {
          window.location.replace(currentUrl)
        }
      }

    }
  }

}

const styleProductCards = () => {
  /**
   * This function performs animation and styling otherwise difficult to
   * administer in CSS. The main purpose is to style elements based on hover
   * over parent element further up the DOM. 
   * Create an area of product cards 
   * button. Once window scrolls down to and past 5px the button is visible and
   * hidden once the window scrolls back above 5px.
   */
  // Create an array of product cards instead of class list so that it can be indexed
  // and used to locate the attribute buttons row. The solution to this was found in 
  // Stack Overflow:
  // https://stackoverflow.com/questions/63122180/using-entries-in-a-for-of-loop-iterating-over-an-htmlcollection
  let productCards = Array.from(document.getElementsByClassName('product-card'));
  if (productCards) {
    for (let [i, card] of productCards.entries()) {
      // use of mousenter into div to replicate the hover pseudo class.
      // style svg and images by getting elements by class name in the declared
      // card variable.
      card.onmouseenter = () => {
        let svgs = card.getElementsByClassName('svg-hover');
        for (let svg of svgs) {
          svg.style.transition = 'all 1.5s'
          svg.style.fill = '#f1d5e5';
        };
        let images = card.getElementsByClassName('product-image');
        for (let image of images) {
          image.style.transition = 'all 1.5s'
          image.style.scale = '1.1 1.05';
          let img = image.getElementsByTagName('img')[0]
          img.style.borderRadius = '0';
        }
        // use of index to determine which card the attribute buttons belong to.
        // before adjusting position.
        let attButtons = document.getElementsByClassName('size-colour-row')[i];
        if (attButtons) {
          attButtons.style.transition = 'all 1s'
          attButtons.style.top = '10px'
          attButtons.style.left = '30px'
        }
      };
      // this function reverses the styling above in an identical manner.
      card.onmouseleave = () => {
        let svgs = card.getElementsByClassName('svg-hover');
        for (let svg of svgs) {
          svg.style.transition = 'all 1s'
          svg.style.fill = '#4d6562';
        };
        let images = card.getElementsByClassName('product-image');
        for (let image of images) {
          image.style.transition = 'all 0.5s'
          image.style.scale = '1 1';
          let img = image.getElementsByTagName('img')[0]
          img.style.transition = 'all 0.5s'
          img.style.borderRadius = '20px';
        }
        let attButtons = document.getElementsByClassName('size-colour-row')[i];
        if (attButtons) {
          attButtons.style.transition = 'all 0.5s'
          attButtons.style.top = '15px'
          attButtons.style.left = '35px'
        }
      };
    }
  }
}

const addToast = (availableSizes, availableColours, coloursRequired) => {
  // how to pass parameters into event listener function:
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#:~:text=Getting%20data%20into%20an%20event%20listener%20using%20%22this%22
  let toastContainer = document.getElementsByClassName("toast-container")[0];
  toastContainer.innerHTML = ``
  let toastBody = ``
  if (availableSizes) {
    toastBody = `<strong><p class="mb-2">Please select a size from the following:</p></strong> <ul>`
    for (parameter of availableSizes) {
      toastBody += `<li>${parameter}</li>`
    }
    toastBody += `</ul>`
    toastContainer.innerHTML += `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="6000" data-bs-animation="true">
      <div class="toast-header text-white toast-header-error p-2">
        <img src="/media/logo-transparent-background.png" class="rounded me-2 toast-logo" alt="...">
        <span class="me-auto">NO SIZE SELECTED</span>
        <small class=""></small>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${toastBody}
      </div>
    </div>
    `
  }

  if (availableColours) {
    toastBody = `<strong><p class="mb-2">Please select a colour from the following</p></strong> <ul>`
    for (parameter of availableColours) {
      toastBody += `<li>${parameter}</li>`
    }
    toastBody += `</ul>`
    toastContainer.innerHTML += `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="6000" data-bs-animation="true">
      <div class="toast-header text-white toast-header-error p-2">
        <img src="/media/logo-transparent-background.png" class="rounded me-2 toast-logo" alt="...">
        <span class="me-auto">NO ${coloursRequired} SELECTED</span>
        <small class=""></small>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${toastBody}
      </div>
    </div>
    `
    // const toastShow = document.querySelector('.toast')
    // if (toastShow) {
    //   const toast = new bootstrap.Toast(toastShow)
    //   toast.show()
    // }
  }
  let toasts = document.getElementsByClassName('toast');
  for (let toast of toasts) {
    toast = new bootstrap.Toast(toast)
    toast.show()
  }

}

const sizeSelectCheck = () => {

  let sizesJson = JSON.parse(document.getElementById('sizes').innerHTML);
  let coloursJson = JSON.parse(document.getElementById('colours').innerHTML);
  let availableSizes = []
  let availableColours = []
  let submitButton = document.getElementById("product-submit");
  let form = document.getElementById("product-form");
  let sizeSelector = document.getElementById('id_product_size');
  let sizeSelectorValue = null
  let colourSelector = document.getElementById('id_product_colour');
  let secColourSelector = document.getElementById('id_secondary_product_colour');
  let colourSelectorValue = null
  let secColourSelectorValue = null
  let primaryOnlyString = "PRIMARY COLOUR"
  let secondaryOnlyString = "SECONDARY COLOUR"
  let primaryAndSecondary = "PRIMARY NOR SECONDARY COLOURS"
  let sizeOption = "Please choose a size"
  let colourOption = "Please choose a colour"

  function setUpSizes() {
    sizesJson.forEach(element => {
      availableSizes.push(element.name)
    });
    sizeSelectorValue = sizeSelector.options[sizeSelector.selectedIndex].value;
  }

  function setUpColours() {
    coloursJson.forEach(element => {
      availableColours.push(element.name)
    });
    colourSelectorValue = colourSelector.options[colourSelector.selectedIndex].value;
    if (secColourSelector) {
      secColourSelectorValue = secColourSelector.options[secColourSelector.selectedIndex].value;
    }
  }

  function selectorChange(selector) {
    selector.onchange = () => {
      if (sizeSelector) {
        sizeSelectorValue = sizeSelector.options[sizeSelector.selectedIndex].value;
      }
      if(colourSelector) {
        colourSelectorValue = colourSelector.options[colourSelector.selectedIndex].value;
      }
      if (secColourSelector) {
        secColourSelectorValue = secColourSelector.options[secColourSelector.selectedIndex].value;
      }
      if (colourSelectorValue === colourOption && secColourSelectorValue === colourOption) {
      
        submitButton.addEventListener("click", addToast.bind(null, null, availableColours, primaryAndSecondary))
        form.onsubmit = () => {
          return false
        }
      } else if (sizeSelectorValue !== sizeOption && colourSelectorValue === colourOption && secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", addToast.bind(null, null, availableColours, primaryAndSecondary))
        form.onsubmit = () => {
          return false
        }
      } else if (sizeSelectorValue !== sizeOption && colourSelectorValue !== colourOption && secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", addToast.bind(null, null, availableColours, secondaryOnlyString))
        form.onsubmit = () => {
          return false
        }
      } else if (sizeSelectorValue !== sizeOption && colourSelectorValue === colourOption && secColourSelectorValue !== colourOption) {
        submitButton.addEventListener("click", addToast.bind(null, null, availableColours, primaryOnlyString))
        form.onsubmit = () => {
          return false
        }
      } else if (sizeSelectorValue === sizeOption && colourSelectorValue !== colourOption && secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", addToast.bind(null, availableSizes, null, secondaryOnlyString))
        form.onsubmit = () => {
          return false
        }
      } else if (sizeSelectorValue === sizeOption && colourSelectorValue === colourOption && secColourSelectorValue !== colourOption) {
        submitButton.addEventListener("click", addToast.bind(null, availableSizes, null, primaryOnlyString))
        form.onsubmit = () => {
          return false
        }
      } else if (sizeSelectorValue !== sizeOption && colourSelectorValue === colourOption) {
        submitButton.addEventListener("click", addToast.bind(null, null, availableColours, primaryOnlyString))
        form.onsubmit = () => {
          return false
        }
      } else if (sizeSelectorValue === sizeOption && colourSelectorValue !== colourOption) {
        submitButton.addEventListener("click", addToast.bind(null, availableSizes, null, null))
        form.onsubmit = () => {
          return false
        }
      } else if (sizeSelectorValue !== sizeOption && colourSelectorValue !== colourOption && secColourSelectorValue !== colourOption) {
        submitButton.removeEventListener("click", addToast)
        form.onsubmit = () => {
          return true
        }
      }else if (sizeSelectorValue !== sizeOption && colourSelectorValue !== colourOption) {
        submitButton.removeEventListener("click", addToast)
        form.onsubmit = () => {
          return true
        }
      } else if (sizeSelectorValue !== sizeOption) {
        submitButton.removeEventListener("click", addToast)
        form.onsubmit = () => {
          return true
        }
      } 
    }
  }
  // __________________________ Sizes and colours code ____________________________________
  // creating an array from HTML:
  // https://stackoverflow.com/questions/26316536/javascript-array-and-innerhtml

  // first if statement checks that the two JSON arrays are not empty.
  if (sizesJson.length > 0 && coloursJson.length > 0) {
    setUpSizes();
    setUpColours();
    if (sizeSelectorValue === sizeOption && colourSelectorValue === colourOption && secColourSelectorValue === colourOption) {
      submitButton.addEventListener("click", addToast.bind(null, availableSizes, availableColours, primaryAndSecondary))
      form.onsubmit = () => {
        return false
      }
    } else if (sizeSelectorValue === sizeOption && colourSelectorValue === colourOption) {
      submitButton.addEventListener("click", addToast.bind(null, availableSizes, availableColours, primaryOnlyString))
      form.onsubmit = () => {
        return false
      }
    }
    selectorChange(sizeSelector)
    selectorChange(colourSelector)
    if (secColourSelector) {
      selectorChange(secColourSelector)
    }
  } else if (sizesJson.length > 0 && coloursJson.length === 0) {
    setUpSizes();
    if (sizeSelectorValue === sizeOption) {
      submitButton.addEventListener("click", addToast.bind(null, availableSizes, null))
      form.onsubmit = () => {
        return false
      }
    }
  selectorChange(sizeSelector)

  } else if (sizesJson.length === 0 && coloursJson.length > 0) {
    setUpColours();
    if (colourSelectorValue === colourOption) {
      submitButton.addEventListener("click", addToast.bind(null, null, availableColours))
      form.onsubmit = () => {
        return false
      }
    }
    colourSelector.onchange = () => {
      submitButton.removeEventListener("click", addToast)
      form.onsubmit = () => {
        return true
      }
    }
  }
}