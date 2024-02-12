window.addEventListener('load', function () {
   styleNavBar();
   iniatiliseTooltips();
   iniatilisePopover();

})

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
};



