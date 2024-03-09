window.addEventListener('load', function () {
  cartProductQuantitySelect();
  updateOrRemoveItems();
  // delay to scroll to top after reload. Without delay the window scrolls to 
  // top but then returns to position of removed item.
  var delayInMilliseconds = 500;
  setTimeout(function() {
    window.scrollTo(0, 0);
    }, delayInMilliseconds);

})

const cartProductQuantitySelect = () => {

  let quantityInputs = document.getElementsByClassName('qty-input');
  let quantityInputArray = Array.from(quantityInputs)


  for (let [i, input] of quantityInputArray.entries()) {
    let updateButton = document.getElementsByClassName('update-button')[i];
    let updateButtonPopover = document.getElementsByClassName('update-button-popover-container')[i];
    let staticInputValue = parseInt(input.value);
    let dynamicInputValue = parseInt(input.value);
    let minusButton = document.getElementById(`minus-button-${i}`);
    let plusButton = document.getElementById(`plus-button-${i}`);
    let popover =  new bootstrap.Popover(updateButtonPopover, {
      customClass: 'popover-info'
    })

    function checkInput (){
      if (dynamicInputValue === staticInputValue) {
        updateButton.style.pointerEvents = 'none';
        updateButton.style.opacity = '0.4';
        // enabling and disabling popover from JS:
        // https://www.geeksforgeeks.org/bootstrap-5-popovers-disable-method/        
        popover.enable()
      }
      else if (dynamicInputValue === 0) {
        minusButton.disabled = true;
        plusButton.disabled = false;
        updateButton.style.pointerEvents = 'auto'; 
        updateButton.style.cursor = 'pointer';
        updateButton.style.opacity = '1';
        popover.disable()
      } else if (dynamicInputValue === 99)  {
        plusButton.disabled = true;
        minusButton.disabled = false;
        updateButton.style.pointerEvents = 'auto'; 
        updateButton.style.cursor = 'pointer';
        updateButton.style.opacity = '1';
        popover.disable()
      } else {
        minusButton.disabled = false;
        plusButton.disabled = false;
        updateButton.style.pointerEvents = 'auto'; 
        updateButton.style.cursor = 'pointer';
        updateButton.style.opacity = '1';
        popover.disable()
        }
    }

    checkInput()

    if (minusButton && plusButton) {
      minusButton.addEventListener('click', function(){
        if (dynamicInputValue === 0){
          checkInput()
        } else {
          dynamicInputValue -= 1
          quantityInputs[i].value = dynamicInputValue
          checkInput()
        }
      }) 
    
      plusButton.addEventListener('click', function(){
        if (dynamicInputValue === 99){
          checkInput()
        } else {
          dynamicInputValue += 1
          quantityInputs[i].value = dynamicInputValue
          checkInput()
        }
      }) 
    
      quantityInputs[i].onchange = () => {
        checkInput()
        dynamicInputValue = parseInt(quantityInputs[i].value);
        if (dynamicInputValue >= 99) {
          dynamicInputValue = 99
          quantityInputs[i].value = dynamicInputValue;
          checkInput()
        } else if (dynamicInputValue < 0) {
          dynamicInputValue = 0
          quantityInputs[i].value = dynamicInputValue;
          checkInput()
        } 
      } 
    }
  }
}


const updateOrRemoveItems = () => {
  let updateButtons = document.getElementsByClassName('update-button');
  let removeButtons = document.getElementsByClassName('remove-button');
  let quantityInputs = document.getElementsByClassName('qty-input');
  let forms = document.getElementsByClassName('cart-update-form');
  let sizes = document.getElementsByName('product_size');
  let primaryColours = document.getElementsByName('product_colour');
  let secondaryColours = document.getElementsByName('secondary_product_colour');
  
  let updateButtonsArray = Array.from(updateButtons)
  for (let [i, button] of updateButtonsArray.entries()) {
    let form = forms[i]
    button.style.cursor = 'pointer'
    button.addEventListener('click', function() {
      
      if ( parseInt(quantityInputs[i].value) === 0) {
        if (confirm("Are you sure you want to remove item from cart?")){
          form.submit()
        }
      } else {
        form.submit()
      }
    })
  }

  let removeButtonsArray = Array.from(removeButtons)
  for (let [i, button] of removeButtonsArray.entries()) {
    button.style.cursor = 'pointer'
    button.addEventListener('click', function() {
// solution to submiting form using vanilla js.
// https://stackoverflow.com/questions/70842319/vanilla-javascript-ajax-form-submit
      let csrfToken = document.getElementsByName('csrfmiddlewaretoken')[i].value;
      let itemId = this.getAttribute('id').slice(-1)
      let itemSize = null
      if (sizes[i]) {
        itemSize = sizes[i].value
      } else {
        itemSize = 'None'
      }

      let itemPrimaryColour = null
      if (primaryColours[i]) {
        itemPrimaryColour = primaryColours[i].value
      } else {
        itemPrimaryColour = 'None'
      }

      let itemSecondaryColour = null
      if (secondaryColours[i]) {
        itemSecondaryColour = secondaryColours[i].value
      } else {
        itemSecondaryColour = 'None'
      }
      if (confirm("Are you sure you want to remove from cart?")) {
        var http = new XMLHttpRequest();
        var url = `/cart/remove/${itemId}/`;
        http.open('POST', url, true);
        http.setRequestHeader('X-CSRFToken', csrfToken)
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // solution to sending data in http request:
        // https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest
        http.send(`&product_size=${itemSize}&product_colour=${itemPrimaryColour}&secondary_product_colour=${itemSecondaryColour}`);
        ;
        var delayInMilliseconds = 500;
        setTimeout(function() {
          location.reload()
        }, delayInMilliseconds);
      }

    })
  }
}