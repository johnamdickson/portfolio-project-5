/*jshint esversion: 6 */ 

window.addEventListener('load', function () {
    styleNavBar();
    iniatiliseTooltips();
    iniatilisePopover();
    initialiseToast();
    offCanvasMethods();
    errorCountdown();
});

window.addEventListener('DOMContentLoaded', function() {
    setUpAddEditProduct();
  });

// BS Boilerplate for initialising toasts.
const initialiseToast = () => {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
    });
    const toastShow = document.querySelector('.toast');
    if (toastShow) {
        const toast = new bootstrap.Toast(toastShow);
        toast.show();
    }
};

// BS boilerplate for initailising popover functionality
const iniatilisePopover = () => {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
};

const iniatiliseTooltips = () => {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
};

const styleNavBar = () => {
    /**
     * Dynamic styling of the navbar where a shadow is added to navbar if the links are
     * hovered over as opposed to the navbar itself.
     */
    // check pathname to determine when not on home page and prevent console errors.
    // https://www.skillsugar.com/check-if-homepage-javascript?utm_content=cmp-true
    const current = window.location.pathname;
    if (current != '/') {
        let navBar = document.getElementsByClassName('navbar')[0];
        let dropdowns = navBar.getElementsByClassName('dropdown-menu');
        const navBarLinks = document.getElementById('main-nav').getElementsByClassName('nav-link');
        if (navBar) {
            // access dropdown menus and style according to user interaction.
            for (let dropdown of dropdowns) {
                // hide dropdown when mouseleaves the element.
                dropdown.onmouseleave = () => {
                    var bsCollapse = new bootstrap.Collapse(dropdown, {
                        toggle: true,
                    });
                    let navLinks = dropdown.closest('.nav-item').getElementsByClassName('nav-link');
                    for (let navLink of navLinks) {
                        // remove show from class list to prevent issue where another link has to be clicked
                        // before this particular link will work again.
                        navLink.classList.remove('show');
                    }
                };
                dropdown.style.backgroundColor = 'rgba(129,168,166,0.97)';
                dropdown.style.color = '#fff';
                dropdown.classList.add('shadow');
                let links = dropdown.getElementsByClassName('dropdown-item');
                for (let link of links) {
                    // access the nav-link that is parent of the links in dropdown to persist
                    // styling of selected links
                    let navLinks = dropdown.closest('.nav-item').getElementsByClassName('nav-link');
                    link.style.color = '#fff';
                    link.style.fontWeight = '200';
                    // style background link on mouseover along with the parent navlink.
                    link.onmouseover = (event) => {
                        for (let navLink of navLinks) {
                            navLink.style.color = '#eddfe7';
                            navLink.style.fontSize = '1.25rem';
                            navLink.style.fontWeight = '400';
                        }
                        link.style.color = '#eddfe7';
                        link.style.fontWeight = '400';
                        event.target.style.backgroundColor = '#4d6562';
                    };
                    // return style to normal on mouseleave event.
                    link.onmouseleave = (event) => {
                        for (let navLink of navLinks) {
                            navLink.style.color = '#fff';
                            navLink.style.fontSize = 'clamp(1rem, 2vw, 1.1rem)';
                        }
                        link.style.color = '#fff';
                        link.style.fontWeight = '200';
                        event.target.style.backgroundColor = 'transparent';
                    };
                }
            }
            // style the main navbar links on mouseenter and leave.
            for (const link of navBarLinks) {
                // increase font size of clicked nav-link
                link.onmousedown = () => {
                    for (const navLink of navBarLinks) {
                        navLink.style.fontSize = 'clamp(1rem, 2vw, 1.1rem)';
                        link.style.lineHeight = 'inherit';
                    }
                    link.style.fontSize = '1.25rem';
                    link.style.lineHeight = '1.5rem';
                };
                link.onmouseenter = () => {
                    navBar.classList.add('shadow-sm');
                    link.style.color = '#f1d5e5';
                    link.style.fontWeight = '400';
                };
                link.onmouseleave = () => {
                    link.style.color = '#fff';
                    link.style.fontWeight = '200';
                };
            }
            navBar.onmouseleave = () => {
                navBar.classList.remove('shadow-sm');
            };
        }
    }
};


window.onscroll = () => {
    /**
     * use of onscroll function to adjust visibility of back to top
     * button. Once window scrolls down to and past 5px the button is visible and
     * hidden once the window scrolls back above 5px.
     */
    let topButton = document.getElementById('back-to-top');
    if (window.scrollY <= 5) {
        topButton.style.visibility = 'hidden';
    } else {
        topButton.style.visibility = 'visible';
    }
};


const offCanvasMethods = () => {
    /**
   * Function to set up BS offcanvas feature for various menu items.
   */
    // solutions to showing offcanvas and hiding existing off canvas from SO:
    // https://stackoverflow.com/questions/66816000/how-to-open-offcanvas-programmatically-in-bootstrap-5
    // https://stackoverflow.com/questions/67770228/bootstrap-5-offcanvas-how-to-close-it-on-mouse-leave

    const accountOffcanvas = document.getElementById('offcanvas-menu-account');
    const accountOffcanvasSmall = document.getElementById('offcanvas-menu-account-sm');

// set up log in off canvases from bottom on small screens and from right on medium and above.
    const loginOffcanvas = document.getElementById('offcanvas-menu-login');
    const loginOffcanvasSmall = document.getElementById('offcanvas-menu-login-sm');
    const loginUsernameInputSmall = document.getElementById('id_login_1');
    const loginUsernameInput = document.getElementById('id_login');
    let loginButtons = Array.from(document.getElementsByClassName('offcanvas-login-button'));

// set up logout off canvases from bottom on small screens and from right on medium and above.
    const logoutOffcanvas = document.getElementById('offcanvas-menu-logout');
    const logoutOffcanvasSmall = document.getElementById('offcanvas-menu-logout-sm');
    let logoutButtons = Array.from(document.getElementsByClassName('offcanvas-logout-button'));
    
// set up register off canvases from bottom on small screens and from right on medium and above.
    const registerOffcanvas = document.getElementById('offcanvas-menu-register');
    const registerOffcanvasSmall = document.getElementById('offcanvas-menu-register-sm');
    let registerButtons = Array.from(document.getElementsByClassName('offcanvas-register-button'));
    const registerEmailInput = document.getElementById('id_email_register_regular');
    const registerEmailInputSmall = document.getElementById('id_email_register-small');

// set up profile off canvases from bottom on small screens and from right on medium and above.
    const profileOffcanvas = document.getElementById('offcanvas-menu-profile');
    const profileOffcanvasSmall = document.getElementById('offcanvas-menu-profile-sm');
    let profileButtons = Array.from(document.getElementsByClassName('offcanvas-profile-button'));

// set up product off canvases from bottom on small screens and from right on medium and above.
    const productOffcanvas = document.getElementById('offcanvas-menu-product');
    const productOffcanvasSmall = document.getElementById('offcanvas-menu-product-sm');
    let productButtons = Array.from(document.getElementsByClassName('offcanvas-product-button'));

// function call for each offcanvas type and associated buttons.
    configureOffCanvas(loginButtons, loginOffcanvas, loginOffcanvasSmall, 'login');
    configureOffCanvas(logoutButtons, logoutOffcanvas, logoutOffcanvasSmall);
    configureOffCanvas(registerButtons, registerOffcanvas, registerOffcanvasSmall, 'register');
    configureOffCanvas(profileButtons, profileOffcanvas, profileOffcanvasSmall);
    configureOffCanvas(productButtons, productOffcanvas, productOffcanvasSmall);

    function configureOffCanvas(buttons, regularOffcanvas, smallOffcanvas, action=null) {
    /**
     * Helper function to avoid repetition of assigning onclick functionality and other 
     * navigational features.
     */
        const delayInMilliseconds = 500;

        // declare variables to be updated based upon action.
        let initatingOffcanvasRegular;
        let initiatingOffcanvasSmall;
        let highlightedInputRegular;
        let highlightedInputSmall;
        // check if login or register action and then update variables above accordingly
        if (action == 'login') {
            initatingOffcanvasRegular = registerOffcanvas;
            initiatingOffcanvasSmall = registerOffcanvasSmall;
            highlightedInputRegular = loginUsernameInput;
            highlightedInputSmall = loginUsernameInputSmall;
        } else if (action == 'register') {
            initatingOffcanvasRegular = loginOffcanvas;
            initiatingOffcanvasSmall = loginOffcanvasSmall;
            highlightedInputRegular = registerEmailInput;
            highlightedInputSmall = registerEmailInputSmall;
        }
        
        for (let [i, button] of buttons.entries()) {
            // check length of buttons array and if 4 then configuration of off canvases will be
            // specific to the users log in status. The code needs to handle sign up or sign in links 
            // on off canvases and dismissing them if selected. 
            if (buttons.length === 4) {
                button.onclick = () => {
                    if (i === 0) {
                        const account = bootstrap.Offcanvas.getInstance(accountOffcanvasSmall);
                        account.hide();
                        const small = new bootstrap.Offcanvas(smallOffcanvas);
                        small.show();
                        setTimeout(function () {
                            highlightedInputSmall.focus();
                        }, delayInMilliseconds);
                    } else if (i === 1) {
                        const initiator = bootstrap.Offcanvas.getInstance(initiatingOffcanvasSmall);
                        initiator.hide();
                        const small = new bootstrap.Offcanvas(smallOffcanvas);
                        small.show();
                        setTimeout(function () {
                            highlightedInputSmall.focus();
                        }, delayInMilliseconds);
                    } else if (i === 2) {
                        const account = bootstrap.Offcanvas.getInstance(accountOffcanvas);
                        account.hide();
                        const regular = new bootstrap.Offcanvas(regularOffcanvas);
                        regular.show();
                        setTimeout(function () {
                            highlightedInputRegular.focus();
                        }, delayInMilliseconds);
                    } else {
                        const initiator = bootstrap.Offcanvas.getInstance(initatingOffcanvasRegular);
                        initiator.hide();
                        const regular = new bootstrap.Offcanvas(regularOffcanvas);
                        regular.show();
                        setTimeout(function () {
                            highlightedInputRegular.focus();
                        }, delayInMilliseconds);
                    }
                };
            } else {
                button.onclick = () => {
                    if (i == 0) {
                        const account = bootstrap.Offcanvas.getInstance(accountOffcanvasSmall);
                        account.hide();
                        const small = new bootstrap.Offcanvas(smallOffcanvas);
                        small.show();
                    } else {
                        const account = bootstrap.Offcanvas.getInstance(accountOffcanvas);
                        account.hide();
                        const regular = new bootstrap.Offcanvas(regularOffcanvas);
                        regular.show();
                    }
                };
            }
        }
    }
};

function goHome() {
    /**
     * go home function activated by a button used in HTTP status code
     * pages.
     */
        document.location.href="/";
    }

const errorCountdown = () => {
    /**
     * Function to countdown and display back to user for status code error
     * pages. Solution from codepen:
     * https://codepen.io/joshua-golub/pen/LYYKrKg
     */
            let timeLeft = 10;
            // check if the error-code is 400 or 500 assign 60 to timeLeft based on 
            // fact that errors are not related to wrong page or forbidden so a 10 second
            // timer to go back to home page would be excessive.
            if (document.getElementById("error-heading")) {
                timeLeft = 60;
                document.getElementById("error-timer").innerText = '60';
            }
            else {
                timeLeft = 10;
            }
            function countdown() {
                timeLeft--;
                document.getElementById("error-timer").innerText = String( timeLeft );
                if (timeLeft > 0) {
                    setTimeout(countdown, 1000);
                } else {
                    goHome();
                }
            }
            if (document.getElementById("error-timer")){
                setTimeout(countdown, 1000);
            }
          };

// solution to console error from stack overflow:
// https://stackoverflow.com/questions/66349868/jest-unit-testing-module-export-error-in-browser-console
var module = module || {};
if (module) {module.exports = errorCountdown;}


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
            // display the pdf input and make sure clear check is unchecked. This is only applicable in the Edit Product Page.
            learnPdfInput.style.display = 'block';
            pdfClear.checked = false;
            secondaryColour.checked = false;
            secondaryColour.disabled = true;

            for (let box of sizeCheckBoxes){
              box.disabled = true;
              box.checked = false;
            }
            for (let box of colourCheckBoxes){
              box.disabled = true;
              box.checked = false;
            }
          } else {
            // remove learn input display property and clear check becomes checked
            // to ensure that if user does not want a learn product the pdf is removed
            // on update.
            learnPdfInput.style.display = 'none';
            pdfClear.checked = true;
            for (let box of sizeCheckBoxes){
                box.disabled = false;
              }
              for (let box of colourCheckBoxes){
                box.disabled = false;
              }
          }
          learnInput.addEventListener('change', function() {
            if (this.checked){
              // if learn input is checked, all sizes and colours options should be 
              // unchecked and disabled.
              secondaryColour.checked = false;
              secondaryColour.disabled = true;

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
        //   check initial status of colours checkboxes. If all unchecked, disable
        // secondary colour checkbox.
          let checkAllColoursFalse = Array
          .from(colourCheckBoxes)
          .filter(checkbox => checkbox.checked);
          if(checkAllColoursFalse.length === 0){
            secondaryColour.disabled = true;
            secondaryColour.checked = false;
          }
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