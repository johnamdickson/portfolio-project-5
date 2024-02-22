window.addEventListener('load', function () {
  productQuantitySelect();
})

const productQuantitySelect = () => {

  let quantityInputs = document.getElementsByClassName('qty-input');
  let quantityInputArray = Array.from(quantityInputs)


  for (let [i, input] of quantityInputArray.entries()) {
  
    let inputValue = parseInt(input.value);
    let minusButton = document.getElementById(`minus-button-${i}`);
    let plusButton = document.getElementById(`plus-button-${i}`);
    
    if (minusButton && plusButton) {
      function checkInput (){
        if (inputValue === 1) {
          console.log('here')
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
  
      minusButton.addEventListener('click', function(){
        if (inputValue === 1){
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
        console.log('changed')
        console.log(quantityInputArray[i])
        checkInput()
        inputValue = parseInt(quantityInputs[i].value);
        if (inputValue >= 99) {
          inputValue = 99
          quantityInputs[i].value = inputValue;
          checkInput()
        } else if (inputValue < 1) {
          inputValue = 1
          quantityInputs[i].value = inputValue;
          checkInput()
        } 
      } 
    }
    
  }
}