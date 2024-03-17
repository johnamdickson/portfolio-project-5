window.addEventListener('load', function () {
  handleProductDelete();
  setUpSelect();
  styleProductCards();
  sizeSelectCheck();
  productQuantitySelect();
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
  let sizeOption = "Please choose a size"
  let colourOption = "Please choose a colour"

  // instantiate popovers on size, primary colour and secondary colour inputs
  let sizePopoverContainer = document.getElementById('size-popover');
  let sizePopover = null;
  if (sizePopoverContainer) {
    sizePopover = new bootstrap.Popover(sizePopoverContainer, {
      customClass: 'popover-error'
    });
  }
  let primaryColourPopoverContainer = document.getElementById('primary-colour-popover');
  let primaryColourPopover = null;
  if (primaryColourPopoverContainer) {
    primaryColourPopover = new bootstrap.Popover(primaryColourPopoverContainer, {
      customClass: 'popover-error'
    });
  }

  let secondaryColourPopover = null;
  let secondaryColourPopoverContainer = document.getElementById('secondary-colour-popover');
  if (secondaryColourPopoverContainer) {
    secondaryColourPopover = new bootstrap.Popover(secondaryColourPopoverContainer, {
      customClass: 'popover-error'
    })
  }


  // access the list of available sizes for the product from the sizes json passed
  // into the template and add to an array.
  function setUpSizes() {
    sizesJson.forEach(element => {
      availableSizes.push(element.name)
    });
    sizeSelectorValue = sizeSelector.options[sizeSelector.selectedIndex].value;
  }

  // access the list of available colours for the product from the colours json passed
  // into the template and add to an array.
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
      // First check if selectors are present before checking value and assigning to variable.
      if (sizeSelector) {
        sizeSelectorValue = sizeSelector.options[sizeSelector.selectedIndex].value;
      }
      if (colourSelector) {
        colourSelectorValue = colourSelector.options[colourSelector.selectedIndex].value;
      }
      if (secColourSelector) {
        secColourSelectorValue = secColourSelector.options[secColourSelector.selectedIndex].value;
      }
  
      if (sizeSelectorValue === sizeOption) {
        submitButton.addEventListener("click", function () {
          sizePopover.show()
          hidePopover(sizePopover)
        })
      } else if (sizeSelectorValue !== sizeOption) {
        submitButton.addEventListener("click", function () {
          sizePopover.hide()
        })
      }

      if (colourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          primaryColourPopover.show()
          hidePopover(primaryColourPopover)
        })
      } else if (colourSelectorValue !== colourOption) {
        console.log('here')
        submitButton.addEventListener("click", function () {
          primaryColourPopover.hide()
        })
      }
      if (secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          secondaryColourPopover.show()
          hidePopover(secondaryColourPopover)
        })
      } else if (secColourSelectorValue !== colourOption) {
        submitButton.addEventListener("click", function () {
          secondaryColourPopover.hide()
        })
      }

      if (sizeSelectorValue !== sizeOption && colourSelectorValue !== colourOption && secColourSelectorValue !== colourOption) {
        form.onsubmit = () => {
          return true
        }
      } else if (sizeSelectorValue !== sizeOption && colourSelectorValue !== colourOption && !secColourSelector) {
        form.onsubmit = () => {
          return true
        }
      } else if (!sizeSelector && colourSelectorValue !== colourOption && secColourSelectorValue !== colourOption) {
        form.onsubmit = () => {
          return true
        }
      } else if (sizeSelectorValue !== sizeOption && !colourSelector && !secColourSelector) {
        form.onsubmit = () => {
          return true
        }
      } else if (!sizeSelector && colourSelectorValue !== colourOption && !secColourSelector) {
        form.onsubmit = () => {
          return true
        }
      }


      setTimeout(function () {
        sizePopover.hide()
        primaryColourPopover.hide()
      }, 5000);
    }
  }

  function hidePopover(popover) {
    setTimeout(function () {
      popover.hide()
    }, 4000);
  }
  // __________________________ Sizes and colours code ____________________________________
  // creating an array from HTML:
  // https://stackoverflow.com/questions/26316536/javascript-array-and-innerhtml

  // first if statement checks that the two JSON arrays are not empty.
  if (sizesJson.length > 0 && coloursJson.length > 0) {
    setUpSizes();
    setUpColours();
    if (sizeSelectorValue && colourSelectorValue && secColourSelectorValue) {
      if (sizeSelectorValue === sizeOption && colourSelectorValue === colourOption && secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          sizePopover.show()
          hidePopover(sizePopover)
          primaryColourPopover.show()
          hidePopover(primaryColourPopover)
          secondaryColourPopover.show()
          hidePopover(secondaryColourPopover)
        })
        form.onsubmit = () => {
          return false
        }
        selectorChange(sizeSelector)
        selectorChange(colourSelector)
        selectorChange(secColourSelector)
      }
    } else if (sizeSelectorValue && colourSelectorValue) {
      if (sizeSelectorValue === sizeOption && colourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          sizePopover.show()
          hidePopover(sizePopover)
          primaryColourPopover.enable()
          primaryColourPopover.show()
          hidePopover(primaryColourPopover)
        })
        form.onsubmit = () => {
          return false
        }
        selectorChange(sizeSelector)
        selectorChange(colourSelector)
      }
    }
  } else if (sizesJson.length === 0 && coloursJson.length > 0) {
    setUpColours();
    if (colourSelectorValue && secColourSelectorValue) {
      if (colourSelectorValue === colourOption && secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          primaryColourPopover.show()
          hidePopover(primaryColourPopover)
          secondaryColourPopover.show()
          hidePopover(secondaryColourPopover)
        })
        form.onsubmit = () => {
          return false
        }
        selectorChange(colourSelector)
        selectorChange(secColourSelector)
      }
    } else if (colourSelectorValue) {
      if (colourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          primaryColourPopover.show()
          hidePopover(primaryColourPopover)
        })
        form.onsubmit = () => {
          return false
        }
        selectorChange(colourSelector)
      }
    }
  }  else if (sizesJson.length > 0 && coloursJson.length === 0) {
    setUpSizes();
    if (sizeSelectorValue === sizeOption) {
      submitButton.addEventListener("click", function () {
        sizePopover.show()
        hidePopover(sizePopover)
      })
      form.onsubmit = () => {
        return false
      }
      selectorChange(sizeSelector)
    }
  }
}

const productQuantitySelect = () => {
  let minusButtons = document.getElementsByClassName('minus-button');
  let plusButtons = document.getElementsByClassName('plus-button');
  let quantityInput = document.getElementsByClassName('qty-input')
  let quantityInputArray = Array.from(quantityInput);

  for ([i, input] of quantityInputArray.entries()) {
    let inputValue = parseInt(input.value);
    let minusButton = minusButtons[i];
    let plusButton = plusButtons[i];

    checkInput()

    function checkInput() {
      if (inputValue === 1) {
        minusButton.disabled = true;
        plusButton.disabled = false;
      } else if (inputValue === 99) {
        plusButton.disabled = true;
        minusButton.disabled = false;
      } else {
        minusButton.disabled = false;
        plusButton.disabled = false;
      }
    }

    minusButton.addEventListener('click', function () {
      if (inputValue === 1) {
        checkInput()
      } else {
        inputValue -= 1
        quantityInput[i].value = inputValue
        checkInput()
      }
    })

    plusButton.addEventListener('click', function () {
      if (inputValue === 99) {
        checkInput()
      } else {
        inputValue += 1
        quantityInput[i].value = inputValue
        checkInput()

      }
    })

    quantityInput.onchange = () => {
      checkInput()
      inputValue = parseInt(quantityInput.value);
      if (inputValue >= 99) {
        inputValue = 99
        quantityInput[i].value = inputValue;
        checkInput()
      } else if (inputValue < 1) {
        inputValue = 1
        quantityInput[i].value = inputValue;
        checkInput()
      }
    }
  }

}

const handleProductDelete = () => {
  let productDeleteButton = document.getElementById('delete-product-button');
    if (productDeleteButton) {
        productDeleteButton.addEventListener("click", function(event) {
          console.log('clicked')
          if (confirm('Are you sure you want to delete this product?') === true) {
            return
          } else {
            event.preventDefault()
          }
        });
    }
}