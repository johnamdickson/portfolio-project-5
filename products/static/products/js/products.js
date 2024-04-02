/*jshint esversion: 6 */ 

window.addEventListener('load', function () {
  handleProductDelete();
  setUpSelect();
  styleProductCards();
  sizeSelectCheck();
  productQuantitySelect();
});

window.addEventListener('DOMContentLoaded', function() {
  setUpAddEditProduct();
});
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
      // how to clear search parameters prior to executing new search:
      // https://stackoverflow.com/questions/22753052/remove-url-parameters-without-refreshing-page
      window.history.replaceState({}, document.title, window.location.pathname);  
      let selectedVal = selector.value;
      if (selectedVal != 'reset') {
        let sort = selectedVal.split("_")[0];
        let direction = selectedVal.split("_")[1];
        currentUrl.set("sort", sort);
        currentUrl.set("direction", direction);       
        window.location.replace('?' + currentUrl);
      } else {
        currentUrl.delete("sort");
        currentUrl.delete("direction");
        if (currentUrl) {
          window.location.replace('?' + currentUrl);
        } else {
          window.location.replace(currentUrl);
        }
      }
    };
  }
};

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
        // style svgs
        let svgs = card.getElementsByClassName('svg-hover');
        for (let svg of svgs) {
          svg.style.transition = 'all 1.5s';
          svg.style.fill = '#f1d5e5';
        }
        // different property changed for gift set svg
        let giftSvgs = card.getElementsByClassName('gift');
        if (giftSvgs){
          for (let svg of giftSvgs){
            svg.style.transition = 'all 1.5s';
            svg.style.stroke = '#f1d5e5';
          }
        }

        let images = card.getElementsByClassName('product-image');
        // adjust scale of card images
        for (let image of images) {
          image.style.transition = 'all 1.5s';
          image.style.scale = '1.1 1.05';
          let img = image.getElementsByTagName('img')[0];
          img.style.borderRadius = '0';
        }
        // use of index to determine which card the attribute buttons belong to.
        // before adjusting position.
        let attButtons = document.getElementsByClassName('size-colour-row')[i];
        if (attButtons) {
          attButtons.style.transition = 'all 1s';
          attButtons.style.top = '10px';
          attButtons.style.left = '30px';
        }
      };
      // this function reverses the styling above in an identical manner.
      card.onmouseleave = () => {
        let svgs = card.getElementsByClassName('svg-hover');
        for (let svg of svgs) {
          svg.style.transition = 'all 1s';
          svg.style.fill = '#4d6562';
        }
        let giftSvgs = card.getElementsByClassName('gift');
        for (let svg of giftSvgs){
          svg.style.transition = 'all 1s';
          svg.style.stroke = '#4d6562';
        }
        let images = card.getElementsByClassName('product-image');
        for (let image of images) {
          image.style.transition = 'all 0.5s';
          image.style.scale = '1 1';
          let img = image.getElementsByTagName('img')[0];
          img.style.transition = 'all 0.5s';
          img.style.borderRadius = '20px';
        }
        let attButtons = document.getElementsByClassName('size-colour-row')[i];
        if (attButtons) {
          attButtons.style.transition = 'all 0.5s';
          attButtons.style.top = '15px';
          attButtons.style.left = '35px';
        }
      };
    }
  }
};

const sizeSelectCheck = () => {
  /**
   * This function performs checks that all product properties have been 
   * selected. If not, a popover is instantiated informing the user to make
   * a choice and what the available options are.
   */
  let sizesJson = JSON.parse(document.getElementById('sizes').innerHTML);
  let coloursJson = JSON.parse(document.getElementById('colours').innerHTML);
  let availableSizes = [];
  let availableColours = [];
  let submitButton = document.getElementById("product-submit");
  let form = document.getElementById("product-form");
  let sizeSelector = document.getElementById('id_product_size');
  let sizeSelectorValue = null;
  let colourSelector = document.getElementById('id_product_colour');
  let secColourSelector = document.getElementById('id_secondary_product_colour');
  let colourSelectorValue = null;
  let secColourSelectorValue = null;
  let sizeOption = "Please choose a size";
  let colourOption = "Please choose a colour";

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
    });
  }


  // access the list of available sizes for the product from the sizes json passed
  // into the template and add to an array.
  function setUpSizes() {
    sizesJson.forEach(element => {
      availableSizes.push(element.name);
    });
    sizeSelectorValue = sizeSelector.options[sizeSelector.selectedIndex].value;
  }

  // access the list of available colours for the product from the colours json passed
  // into the template and add to an array.
  function setUpColours() {
    coloursJson.forEach(element => {
      availableColours.push(element.name);
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
          sizePopover.show();
          // call function to hide popover after time delay.
          hidePopover(sizePopover);
        });
      } else if (sizeSelectorValue !== sizeOption) {
        submitButton.addEventListener("click", function () {
          sizePopover.hide();
        });
      }

      if (colourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          primaryColourPopover.show();
          hidePopover(primaryColourPopover);
        });
      } else if (colourSelectorValue !== colourOption) {
        submitButton.addEventListener("click", function () {
          primaryColourPopover.hide();
        });
      }
      if (secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          secondaryColourPopover.show();
          hidePopover(secondaryColourPopover);
        });
      } else if (secColourSelectorValue !== colourOption) {
        submitButton.addEventListener("click", function () {
          secondaryColourPopover.hide();
        });
      }
      // check each possible configuration of properties are in correct state prior to allowing form to be submitted.
      if (sizeSelectorValue !== sizeOption && colourSelectorValue !== colourOption && secColourSelectorValue !== colourOption) {
        form.onsubmit = () => {
          return true;
        };
      } else if (sizeSelectorValue !== sizeOption && colourSelectorValue !== colourOption && !secColourSelector) {
        form.onsubmit = () => {
          return true;
        };
      } else if (!sizeSelector && colourSelectorValue !== colourOption && secColourSelectorValue !== colourOption) {
        form.onsubmit = () => {
          return true;
        };
      } else if (sizeSelectorValue !== sizeOption && !colourSelector && !secColourSelector) {
        form.onsubmit = () => {
          return true;
        };
      } else if (!sizeSelector && colourSelectorValue !== colourOption && !secColourSelector) {
        form.onsubmit = () => {
          return true;
        };
      }

      setTimeout(function () {
        sizePopover.hide();
        primaryColourPopover.hide();
      }, 3000);
    };
  }

  function hidePopover(popover) {
    setTimeout(function () {
      popover.hide();
    }, 4000);
  }
  // creating an array from HTML:
  // https://stackoverflow.com/questions/26316536/javascript-array-and-innerhtml

  // first if statement checks that the two JSON arrays are not empty meaning product has both 
  // sizes and colours.
  if (sizesJson.length > 0 && coloursJson.length > 0) {
    setUpSizes();
    setUpColours();
    if (sizeSelectorValue && colourSelectorValue && secColourSelectorValue) {
      // no size, primary colour or secondary colour selected.
      if (sizeSelectorValue === sizeOption && colourSelectorValue === colourOption && secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          sizePopover.show();
          hidePopover(sizePopover);
          primaryColourPopover.show();
          hidePopover(primaryColourPopover);
          secondaryColourPopover.show();
          hidePopover(secondaryColourPopover);
        });
        form.onsubmit = () => {
          return false;
        };
        selectorChange(sizeSelector);
        selectorChange(colourSelector);
        selectorChange(secColourSelector);
      }
    } else if (sizeSelectorValue && colourSelectorValue) {
      // no size or primary colour selected.
      if (sizeSelectorValue === sizeOption && colourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          sizePopover.show();
          hidePopover(sizePopover);
          primaryColourPopover.enable();
          primaryColourPopover.show();
          hidePopover(primaryColourPopover);
        });
        form.onsubmit = () => {
          return false;
        };
        selectorChange(sizeSelector);
        selectorChange(colourSelector);
      }
    }
    // check if no sizes and only colours.
  } else if (sizesJson.length === 0 && coloursJson.length > 0) {
    setUpColours();
    if (colourSelectorValue && secColourSelectorValue) {
      if (colourSelectorValue === colourOption && secColourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          primaryColourPopover.show();
          hidePopover(primaryColourPopover);
          secondaryColourPopover.show();
          hidePopover(secondaryColourPopover);
        });
        form.onsubmit = () => {
          return false;
        };
        selectorChange(colourSelector);
        selectorChange(secColourSelector);
      }
    } else if (colourSelectorValue) {
      if (colourSelectorValue === colourOption) {
        submitButton.addEventListener("click", function () {
          primaryColourPopover.show();
          hidePopover(primaryColourPopover);
        });
        form.onsubmit = () => {
          return false;
        };
        selectorChange(colourSelector);
      }
    }
    // check if sizes and no colours.
  }  else if (sizesJson.length > 0 && coloursJson.length === 0) {
    setUpSizes();
    if (sizeSelectorValue === sizeOption) {
      submitButton.addEventListener("click", function () {
        sizePopover.show();
        hidePopover(sizePopover);
      });
      form.onsubmit = () => {
        return false;
      };
      selectorChange(sizeSelector);
    }
  }
};

const productQuantitySelect = () => {
    /**
   * This function handles quantity alterations to product. 
   * selected. If not, a popover is instantiated informing the user to make
   * a choice and what the available options are.
   */
  let minusButtons = document.getElementsByClassName('minus-button');
  let plusButtons = document.getElementsByClassName('plus-button');
  let quantityInput = document.getElementsByClassName('qty-input');
  let quantityInputArray = Array.from(quantityInput);

  // use indexing in for of loop to access the correct elements
  for (let [i, input] of quantityInputArray.entries()) {
    let inputValue = parseInt(input.value);
    let minusButton = minusButtons[i];
    let plusButton = plusButtons[i];

    checkInput();

    function checkInput() {
      /**
       * Helper function to enable/disable buttons depending on value
       * to ensure it remains between 0 and 99. Respective buttons are 
       * disabled if value is it either one of those figures.
       */
      if (inputValue === 0) {
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
      // if 0 call check input function otherwise decrement
      // by 1 and update the DOM
      if (inputValue === 0) {
        checkInput();
      } else {
        inputValue -= 1;
        quantityInput[i].value = inputValue;
        checkInput();
      }
    });

    plusButton.addEventListener('click', function () {
      // if 99 call check input function otherwise increment
      // by 1 and update the DOM
      if (inputValue === 99) {
        checkInput();
      } else {
        inputValue += 1;
        quantityInput[i].value = inputValue;
        checkInput();
      }
    });

    quantityInput.onchange = () => {
      // checks value of quantity and if it goes below 0
      // or above 99 resets it to 0 and 99 respectively.
      checkInput();
      inputValue = parseInt(quantityInput.value);
      if (inputValue >= 99) {
        inputValue = 99;
        quantityInput[i].value = inputValue;
        checkInput();
      } else if (inputValue < 0) {
        inputValue = 0;
        quantityInput[i].value = inputValue;
        checkInput();
      }
    };
  }
};

const handleProductDelete = () => {
    /**
     * Function to call confirm prompt and prevent default (form submit) if 
     * user changes their mind and wants to retain product in basket.
     */
  let productDeleteButton = document.getElementById('delete-product-button');
    if (productDeleteButton) {
        productDeleteButton.addEventListener("click", function(event) {
          if (confirm('Are you sure you want to delete this product?') === true) {
            return;
          } else {
            event.preventDefault();
          }
        });
    }
};

const setUpAddEditProduct = () => {
  /**
   * Function to configure checkboxes. At initial load, learn product pdf should have a display of none
   * and sceondary colour disabled. Enabling/disabling or changing display property will be dependant on 
   * what checkboxes are selected.
   */
  // declare all variables for the main page.
  const mainLearnInput = document.getElementById('id_learn_product');
  const mainSizeCheckBoxes = document.getElementsByName('sizes');
  const mainColourCheckBoxes = document.getElementsByName('colours');
  const mainSecondaryColour = document.getElementById('id_secondary_colour');
  const mainLearnPdfInput = document.getElementById('div_id_learn_product_pdf');
  const mainImgInput = document.getElementById('id_image');
  const mainDisplayImg = document.querySelector("#display-img");
  const mainPdfClear = document.getElementById('learn_product_pdf-clear_id');

  // declare variables for regular off canvas
  const offcanvasRegularLearnInput = document.getElementById('id_offcanvas_regular-learn_product');
  const offcanvasRegularSizeCheckBoxes = document.getElementsByName('offcanvas_regular-sizes');
  const offcanvasRegularColourCheckBoxes = document.getElementsByName('offcanvas_regular-colours');
  const offcanvasRegularSecondaryColour = document.getElementById('id_offcanvas_regular-secondary_colour');
  const offcanvasRegularLearnPdfInput = document.getElementById('div_id_offcanvas_regular-learn_product_pdf');
  const offcanvasRegularImgInput = document.getElementById('id_offcanvas_regular-image');
  const offcanvasRegularDisplayImg = document.querySelector("#offcanvas-regular-display-img");
  
 // declare variables for small off canvas
 const offcanvasSmallLearnInput = document.getElementById('id_offcanvas_small-learn_product');
 const offcanvasSmallSizeCheckBoxes = document.getElementsByName('offcanvas_small-sizes');
 const offcanvasSmallColourCheckBoxes = document.getElementsByName('offcanvas_small-colours');
 const offcanvasSmallSecondaryColour = document.getElementById('id_offcanvas_small-secondary_colour');
 const offcanvasSmallLearnPdfInput = document.getElementById('div_id_offcanvas_small-learn_product_pdf');
 const offcanvasSmallImgInput = document.getElementById('id_offcanvas_small-image');
 const offcanvasSmallDisplayImg = document.querySelector("#offcanvas-small-display-img");

// check if learnInputs exist before calling helper function on each. Prevents errors on other product pages.
  if (mainLearnInput){
    handleAddProductDisplay(
      mainLearnInput,
      mainSizeCheckBoxes,
      mainColourCheckBoxes,
      mainSecondaryColour,
      mainLearnPdfInput,
      mainImgInput,
      mainDisplayImg,
      mainPdfClear
      );
  } 

  if (offcanvasRegularLearnInput){
    handleAddProductDisplay(
      offcanvasRegularLearnInput,
      offcanvasRegularSizeCheckBoxes,
      offcanvasRegularColourCheckBoxes,
      offcanvasRegularSecondaryColour,
      offcanvasRegularLearnPdfInput,
      offcanvasRegularImgInput,
      offcanvasRegularDisplayImg
      );
  }

  if (offcanvasSmallLearnInput){
    handleAddProductDisplay(
      offcanvasSmallLearnInput,
      offcanvasSmallSizeCheckBoxes,
      offcanvasSmallColourCheckBoxes,
      offcanvasSmallSecondaryColour,
      offcanvasSmallLearnPdfInput,
      offcanvasSmallImgInput,
      offcanvasSmallDisplayImg
      );
}
  function handleAddProductDisplay (
    /**
     * Function takes in parameters from each of the three possible displays (main and small/regular offcanvases).
     * Initial set up takes place by hiding the 
     */
    learnInput, 
    sizeCheckBoxes,
    colourCheckBoxes,
    secondaryColour,
    learnPdfInput,
    imgInput,
    displayImg,
    pdfClear = null
      ) {
        if (!pdfClear) {
          // create a dummy input image to handle cases where no input is passed in or clear button does not exist yet. 
          // Prevents console errors when trying to assign attributes on a null object.
          pdfClear = document.createElement('input');
        }
        if (learnInput.checked === true) {
          // display the pdf input and make sure clear check is unchecked.
          learnPdfInput.style.display = 'block';
          pdfClear.checked = false;
        } else {
          // remove learn input display property and clear check becomes checked
          // to ensure that if user does not want a learn product the pdf is removed
          // on update.
          learnPdfInput.style.display = 'none';
          pdfClear.checked = true;
        }
        learnInput.addEventListener('change', function() {
          if (this.checked){
            // if learn input is checked, all sizes and colours options should be 
            // unchecked and disabled.
            secondaryColour.checked = false;
            for (let box of sizeCheckBoxes){
              box.disabled = true;
              box.checked = false;
            }
            for (let box of colourCheckBoxes){
              box.disabled = true;
              box.checked = false;
            }
            // display the learn_pdf input and uncheck the clear checkbox.
            learnPdfInput.style.display = 'block';
            pdfClear.checked = false;
          } else {
            // if unchecked, enable size and colour checkboxes.
            for (let box of sizeCheckBoxes){
              box.disabled = false;
            }
            for (let box of colourCheckBoxes){
              box.disabled = false;
            }
            // hide the learn_pdf input and check the clear checkbox again ensuring
            // file is removed on update.
            pdfClear.checked = true;
            learnPdfInput.style.display = 'none';
          }
        });
        for (let colourCheck of colourCheckBoxes) {
          colourCheck.addEventListener('change', function(){
            // add event listeners to all colour checkboxes to enable the secondary 
            // colour checkbox, disable the learn input checkbox and ensure the clear
            // checkbox is checked.
            if (this.checked){
              secondaryColour.disabled = false;
              learnInput.disabled = true;
              pdfClear.checked = true;
            } else {
              // solution to checking all checkboxes:
              // https://stackoverflow.com/questions/590018/getting-all-selected-checkboxes-in-an-array
              // create an array containing bool for checkboxes status. If none checked, disable secondary
              // colour and uncheck.
              let checkAllColoursFalse = Array
              .from(colourCheckBoxes)
              .filter(checkbox => checkbox.checked);
              if(checkAllColoursFalse.length === 0){
                secondaryColour.disabled = true;
                secondaryColour.checked = false;
              }
              // do same as above for sizes and then check if both sets of checkboxes are all unchecked
              // before enabling the learn input checkbox again.
              let checkAllSizesFalse = Array
              .from(sizeCheckBoxes)
              .filter(checkbox => checkbox.checked);
              if (checkAllColoursFalse.length === 0 && checkAllSizesFalse.length === 0) {
                learnInput.disabled = false;
              }
            }
          });
        }
        for (let sizeCheck of sizeCheckBoxes) {
          sizeCheck.addEventListener('change', function(){
            // do similar as above colour checkboxes with size checkboxes. 
            if (this.checked){
              learnInput.disabled = true;
              pdfClear.checked = true;
            } else {
              // solution to checking all checkboxes:
              // https://stackoverflow.com/questions/590018/getting-all-selected-checkboxes-in-an-array
              let checkAllColoursFalse = Array
              .from(colourCheckBoxes)
              .filter(checkbox => checkbox.checked);
              let checkAllSizesFalse = Array
              .from(sizeCheckBoxes)
              .filter(checkbox => checkbox.checked);
              if (checkAllColoursFalse.length === 0 && checkAllSizesFalse.length === 0) {
                learnInput.disabled = false;
              }
            }
          });
        }
        imgInput.addEventListener('change',(event)=>{
          // How to display image once selected on input:
          // https://stackoverflow.com/questions/72752673/how-to-show-image-just-after-uploading-in-django-form
          // display a thumbnail of image that is selected/already in db or a no image selected placeholder.
           const imgObject = event.target.files[0];
           if (imgObject) {
            displayImg.src = URL.createObjectURL(imgObject);
    			} else {
            displayImg.src = "https://little-woolly-snuggles.s3.amazonaws.com/media/no-image-selected.webp";
    			}
        });
  }
};