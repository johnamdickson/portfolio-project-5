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
  let removeButton = document.getElementsByClassName('remove-button');
  let forms = document.getElementsByClassName('cart-update-form');
  let buttonsArray = Array.from(updateButtons)
  for (let [i, button] of buttonsArray.entries()) {
    button.addEventListener('click', function(event) {
      let form = forms[i]
      form.submit()
      // console.log(document.querySelector('.update-button').previousElementSibling('.cart-update-form'))
      // console.log(this.previousElementSibling('.cart-update-form'))
    })
  }

}