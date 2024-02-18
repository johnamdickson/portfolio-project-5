window.addEventListener('load', function () {
   styleNavBar();
   styleProductCards();
   iniatiliseTooltips();
   iniatilisePopover();
   initialiseToast();
})

// BS Boilerplate for initialising toasts.

const initialiseToast = () => {
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    });
    const toastShow = document.querySelector('.toast')
    if (toastShow) {
        const toast = new bootstrap.Toast(toastShow)
        toast.show()
    }
};

// BS boilerplate for initailising popover functionality
const iniatilisePopover = () => {
    
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
}

const iniatiliseTooltips = () => {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
}


const styleNavBar = () => {
/**
 * Dynamic styling of the navbar where the background color changes if the links are
 * hovered over as opposed to the navbar itself.
 */
    // check pathname to determine when not on home page and prevent console errors.
    // https://www.skillsugar.com/check-if-homepage-javascript?utm_content=cmp-true
    current = window.location.pathname;
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
                    })
                    let navLinks = dropdown.closest('.nav-item').getElementsByClassName('nav-link');
                    for (let navLink of navLinks) {
                        // remove show from class list to prevent issue where another link has to be clicked
                        // before this particular link will work again.
                        navLink.classList.remove('show');
                    }
                    };
                dropdown.style.backgroundColor = 'rgba(129,168,166,0.97)';
                dropdown.style.color = '#fff'
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
                    for (let navLink of navLinks){
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
                        for (let navLink of navLinks){
                            navLink.style.color = '#fff'
                            navLink.style.fontSize = 'clamp(1rem, 2vw, 1.1rem)';
                            }
                        link.style.color = '#fff';
                        link.style.fontWeight = '200';
                        event.target.style.backgroundColor = 'transparent';
                        };
                }
            };
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
                }
                link.onmouseenter = () => {
                    navBar.classList.add('shadow-sm');
                    link.style.color = '#f1d5e5';
                    link.style.fontWeight = '400';
                    };
                link.onmouseleave = () => {
                        link.style.color = '#fff';
                        link.style.fontWeight = '200';
                    };
            };
            navBar.onmouseleave = () => {
                navBar.classList.remove('shadow-sm');
            };
        };
    }
};


window.onscroll = () => {
 /**
 * use of onscroll function to adjust visibility of back to top
 * button. Once window scrolls down to and past 5px the button is visible and
 * hidden once the window scrolls back above 5px.
 */
    let topButton = document.getElementById('back-to-top')
    if (window.scrollY<=5) {
        topButton.style.visibility = 'hidden'
    } else {
        topButton.style.visibility = 'visible'
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
                if (attButtons){
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