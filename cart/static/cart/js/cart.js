window.addEventListener('load', function () {
  cartProductQuantitySelect();
  updateOrRemoveItems();
})

const cartProductQuantitySelect = () => {

  let quantityInputs = document.getElementsByClassName('qty-input');
  let quantityInputArray = Array.from(quantityInputs)


  for (let [i, input] of quantityInputArray.entries()) {
  
    let inputValue = parseInt(input.value);
    let minusButton = document.getElementById(`minus-button-${i}`);
    let plusButton = document.getElementById(`plus-button-${i}`);

    function checkInput (){
      if (inputValue === 0) {
        minusButton.disabled = true;
        plusButton.disabled = false;
      } else if (inputValue === 99)  {
        plusButton.disabled = true;
        minusButton.disabled = false;
      } else {
        minusButton.disabled = false;
        plusButton.disabled = false;
      }
    }

    checkInput()

    if (minusButton && plusButton) {
      minusButton.addEventListener('click', function(){
        if (inputValue === 0){
          checkInput()
        } else {
          inputValue -= 1
          quantityInputs[i].value = inputValue
          checkInput()
        }
      }) 
    
      plusButton.addEventListener('click', function(){
        if (inputValue === 99){
          checkInput()
        } else {
          inputValue += 1
          quantityInputs[i].value = inputValue
          checkInput()
        }
      }) 
    
      quantityInputs[i].onchange = () => {
        checkInput()
        inputValue = parseInt(quantityInputs[i].value);
        if (inputValue >= 99) {
          inputValue = 99
          quantityInputs[i].value = inputValue;
          checkInput()
        } else if (inputValue < 0) {
          inputValue = 0
          quantityInputs[i].value = inputValue;
          checkInput()
        } 
      } 
    }
  }
}


const updateOrRemoveItems = () => {
  let updateButtons = document.getElementsByClassName('update-button');
  let removeButtons = document.getElementsByClassName('remove-button');
  let forms = document.getElementsByClassName('cart-update-form');
  let sizes = document.getElementsByName('product_size');
  let primaryColours = document.getElementsByName('product_colour');
  let secondaryColours = document.getElementsByName('secondary_product_colour');
  
  let updateButtonsArray = Array.from(updateButtons)
  for (let [i, button] of updateButtonsArray.entries()) {
    button.addEventListener('click', function() {
      let form = forms[i]
      form.submit()
    })
  }

  let removeButtonsArray = Array.from(removeButtons)
  for (let [i, button] of removeButtonsArray.entries()) {
    button.addEventListener('click', function() {
// solution to submiting form using vanilla js.
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

      var http = new XMLHttpRequest();
      var url = `/cart/remove/${itemId}/`;
      http.open('POST', url, true);
      http.setRequestHeader('X-CSRFToken', csrfToken)
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // solution to sending data in http request:
      // https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest
      http.send(`&product_size=${itemSize}&product_colour=${itemPrimaryColour}&secondary_product_colour=${itemSecondaryColour}`);
    })
  }
}