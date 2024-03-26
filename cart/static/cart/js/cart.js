/*jshint esversion: 6 */ 

window.addEventListener('load', function () {
  cartProductQuantitySelect();
  updateOrRemoveItems();
  // delay to scroll to top after reload. Without delay the window scrolls to 
  // top but then returns to position of removed item.
  var delayInMilliseconds = 500;
  setTimeout(function() {
    window.scrollTo(0, 0);
    }, delayInMilliseconds);

});

const cartProductQuantitySelect = () => {
/**
 * Handles product quantity changes by creating an array of quantity inputs
 * and then iterating through each using i as index to identify the elements
 * relative to each other in the sense of the functionality.
 */
  let quantityInputs = document.getElementsByClassName('qty-input');
  let quantityInputArray = Array.from(quantityInputs);

  for (let [i, input] of quantityInputArray.entries()) {
    let updateButton = document.getElementsByClassName('update-button')[i];
    let updateButtonPopover = document.getElementsByClassName('update-button-popover-container')[i];
    let staticInputValue = parseInt(input.value);
    let dynamicInputValue = parseInt(input.value);
    let minusButton = document.getElementById(`minus-button-${i}`);
    let plusButton = document.getElementById(`plus-button-${i}`);
    let popover =  new bootstrap.Popover(updateButtonPopover, {
      customClass: 'popover-info'
    });

    const checkInput = function (){
      // if the dynamic value is equal to static value then assumption 
      // is there has been no change from original quantity selected so 
      // the button is styled unavailable and popover enabled requesting 
      // user use buttons to change quantity if required.
      if (dynamicInputValue === staticInputValue) {
        updateButton.style.pointerEvents = 'none';
        updateButton.style.opacity = '0.4';
        // enabling and disabling popover from JS:
        // https://www.geeksforgeeks.org/bootstrap-5-popovers-disable-method/        
        popover.enable();
      }
      else if (dynamicInputValue === 0) {
        // minus button disabled to prevent quantity being less than zero and 
        // update button made available.
        minusButton.disabled = true;
        plusButton.disabled = false;
        updateButton.style.pointerEvents = 'auto'; 
        updateButton.style.cursor = 'pointer';
        updateButton.style.opacity = '1';
        popover.disable();
      } else if (dynamicInputValue === 99)  {
        // plus button disabled to prevent qauntity being more than 99 and 
        // update button made available.
        plusButton.disabled = true;
        minusButton.disabled = false;
        updateButton.style.pointerEvents = 'auto'; 
        updateButton.style.cursor = 'pointer';
        updateButton.style.opacity = '1';
        popover.disable();
      } else {
        // for any other values, plus, minus and update buttons made available.
        minusButton.disabled = false;
        plusButton.disabled = false;
        updateButton.style.pointerEvents = 'auto'; 
        updateButton.style.cursor = 'pointer';
        updateButton.style.opacity = '1';
        popover.disable();
        }
    };
    // perform input check on page load.
    checkInput();

    minusButton.addEventListener('click', function(){
      // click event listener on the minus button which checks if
      // value is first 0 before calling checkInput function expression.
      // If not 0, the dynamic input value is decremented and assigning 
      // as value the DOM before calling checkInput again.
      if (dynamicInputValue === 0){
        checkInput();
      } else {
        dynamicInputValue -= 1;
        quantityInputs[i].value = dynamicInputValue;
        checkInput();
      }
    }); 
  
    plusButton.addEventListener('click', function(){
      // click event listener on the plus button which checks if
      // value is first 99 before calling checkInput function expression.
      // If not 99, the dynamic input value is incremented and assigning 
      // as value the DOM before calling checkInput again.
      if (dynamicInputValue === 99){
        checkInput();
      } else {
        dynamicInputValue += 1;
        quantityInputs[i].value = dynamicInputValue;
        checkInput();
      }
    }); 
    
    quantityInputs[i].onchange = () => {
      // function to handle edge cases of quantity changes. If
      // dynamic input value is incremented above 99 it is reset
      // to 99. Similarly, if the value is less than 0, it is 
      // reset to 0.
      checkInput();
      dynamicInputValue = parseInt(quantityInputs[i].value);
      if (dynamicInputValue >= 99) {
        dynamicInputValue = 99;
        quantityInputs[i].value = dynamicInputValue;
        checkInput();
      } else if (dynamicInputValue < 0) {
        dynamicInputValue = 0;
        quantityInputs[i].value = dynamicInputValue;
        checkInput();
      } 
    }; 
  }
};


const updateOrRemoveItems = () => {
  /**
 * Handles product removal by submitting quantity form or performing an
 * 
 */
  let updateButtons = document.getElementsByClassName('update-button');
  let removeButtons = document.getElementsByClassName('remove-button');
  let quantityInputs = document.getElementsByClassName('qty-input');
  let forms = document.getElementsByClassName('cart-update-form');
  let sizes = document.getElementsByName('product_size');
  let primaryColours = document.getElementsByName('product_colour');
  let secondaryColours = document.getElementsByName('secondary_product_colour');
  
  let updateButtonsArray = Array.from(updateButtons);
  // 
  for (let [i, button] of updateButtonsArray.entries()) {
    let form = forms[i];
    button.style.cursor = 'pointer';
    button.addEventListener('click', function() {
      
      if ( parseInt(quantityInputs[i].value) === 0) {
        if (confirm("Are you sure you want to remove item from cart?")){
          form.submit();
        }
      } else {
        form.submit();
      }
    });
  }

  let removeButtonsArray = Array.from(removeButtons);
  for (let [i, button] of removeButtonsArray.entries()) {
    // using index to tie all relevant elements together, perform
    // an AJAX request to remove the item from the cart, followed by 
    // reloading the page after a short delay. The delay is to allow 
    // time for the AJAX request to be completed.
    button.style.cursor = 'pointer';
    button.addEventListener('click', function() {
      // solution to submiting form using vanilla js.
      // https://stackoverflow.com/questions/70842319/vanilla-javascript-ajax-form-submit
      let csrfToken = document.getElementsByName('csrfmiddlewaretoken')[i].value;

      let itemId = this.getAttribute('id').slice(-1);
      let itemSize = null;
      if (sizes[i]) {
        itemSize = sizes[i].value;
      } else {
        itemSize = 'None';
      }

      let itemPrimaryColour = null;
      if (primaryColours[i]) {
        itemPrimaryColour = primaryColours[i].value;
      } else {
        itemPrimaryColour = 'None';
      }

      let itemSecondaryColour = null;
      if (secondaryColours[i]) {
        itemSecondaryColour = secondaryColours[i].value;
      } else {
        itemSecondaryColour = 'None';
      }
      if (confirm("Are you sure you want to remove from cart?")) {
        var http = new XMLHttpRequest();
        var url = `/cart/remove/${itemId}/`;
        http.open('POST', url, true);
        http.setRequestHeader('X-CSRFToken', csrfToken);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // solution to sending data in http request:
        // https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest
        http.send(`&product_size=${itemSize}&product_colour=${itemPrimaryColour}&secondary_product_colour=${itemSecondaryColour}`);
        var delayInMilliseconds = 500;
        setTimeout(function() {
          location.reload();
        }, delayInMilliseconds);
      }
    });
  }
};