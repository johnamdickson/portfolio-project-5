window.addEventListener('load', function () {
   styleNavBar();
   iniatiliseTooltips();
   iniatilisePopover();
   initialiseToast();
   offCanvasMethods();
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


const offCanvasMethods = () => {

    // solutions to showing offcanvas and hiding existing off canvas from SO:
    // https://stackoverflow.com/questions/66816000/how-to-open-offcanvas-programmatically-in-bootstrap-5
    // https://stackoverflow.com/questions/67770228/bootstrap-5-offcanvas-how-to-close-it-on-mouse-leave

    const loginOffcanvas = document.getElementById('offcanvas-menu-login')
    const loginOffcanvasSmall = document.getElementById('offcanvas-menu-login-sm')
    const accountOffcanvas = document.getElementById('offcanvas-menu-account')
    const accountOffcanvasSmall = document.getElementById('offcanvas-menu-account-sm')
    let loginButtons = Array.from(document.getElementsByClassName('offcanvas-login-button'))
    let usernameInput = document.getElementsByClassName('login-username-input')

    for (let [i, button] of loginButtons.entries()) {
        const delayInMilliseconds = 500;

        button.onclick = () => {
            if (i == 0) {
                const account = bootstrap.Offcanvas.getInstance(accountOffcanvasSmall)
                account.hide()
                const login = new bootstrap.Offcanvas(loginOffcanvasSmall)
                login.show()
                setTimeout(function() {
                    usernameInput[i].focus()
                  }, delayInMilliseconds);
            } else {
                const account = bootstrap.Offcanvas.getInstance(accountOffcanvas)
                account.hide()
                const login = new bootstrap.Offcanvas(loginOffcanvas)
                login.show()
                setTimeout(function() {
                    usernameInput[i].focus()
                  }, delayInMilliseconds);
            }
        }
    }

}

