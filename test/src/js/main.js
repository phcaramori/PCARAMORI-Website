/*

    0 - page constants maker
    1 - Show/hide nav
    2 - lock/allow scroll
    3 - pop-up maker
    4 - nav menu maker

*/

//create nav, footer, and other common elements
function populate() {
    /* ===========\
     *             | 
     *  LANGUAGES  |
     *             |
     *  ========= */
    //one object per language - order of items should be the same, just translated
    //first entry in footer column array should be the title of that collumn
    const en = {
        menuItemsArr: ["about-me", "projects", "progress", "contact"],
        footerTextArrs: [
            ["col1", "option", "option", "option", "option", "option"],
            ["col 2", "op1", "op2", "op3", "op4"]
        ],
        footerLinkArrs: [
            [null, "op1link", "op2link", "op3link", "op4link", "op5link"],
            [null, "op1link", "op2link", "op3link", "op4link"]
        ],
        copyright: "Made with lots of ❤️ and vanilla HTML, CSS & JS | © Pedro Caramori, 2018-2022"
    }
    const pt = {
        menuItemsArr: ["sobre-mim", "projetos", "progresso", "contato"],
        footerTextArrs: [],
        footerLinkArrs: [
            [],
            []
        ],
        copyright: "Feito com muito ❤️ e HTML, CSS & JS puros | © Pedro Caramori, 2018-2022"
    }
    const footerSocials = {
        name: ["GitHub", "LinkedIn", "Source Code", "Instagram"],
        link: ["https://github.com/phcaramori", "https://www.linkedin.com/in/pedro-caramori-b175a7240/", "https://github.com/phcaramori/PCARAMORI-Website", "https://www.instagram.com/phcaramori_/"],
        icon: ["fa-brands fa-github", "fa-brands fa-linkedin", "fa-solid fa-code", "fa-brands fa-instagram", ]
    }

    // ----- LANGUAGE-SENSING BASED ON DIRECTORY ----- //
    const lang = document.getElementsByTagName('html')[0].getAttribute('lang'); //en, pt
    const active = window.location.pathname.split('/')[3] //!CHANGE TO 2 ONCE TEST DIR IS GONE

    let navMenu = document.createElement('div')
    navMenu.classList.add("nav-window", "flex-center", "space-around", "noscroll")
    navMenu.id = "nav-window"
    navMenu.appendChild(document.createElement("h1"))

    let indexOfActivePage = eval(lang).menuItemsArr.indexOf(active);


    // ----- POPULATE NAV MENU ACCORDING TO LANGUAGE ----- //
    eval(lang).menuItemsArr.forEach(link => { //iterate through corrent language array
        let a = document.createElement("a")
        a.classList.add("nav-item")
        a.style.textTransform = 'capitalize';
        let finalText = link.split("-").join(" ") //replace each space with a -
        a.innerHTML = finalText
        if (link === active) {
            a.classList.add("active-nav-item") //make active link orange
        }
        a.addEventListener("click", (e) => {
            lockScroll()
            let cover = document.createElement("div")
            cover.classList.add("link-transition")
            document.body.appendChild(cover)
            setTimeout(() => {
                window.location.href = lang + '/' + link; //after animation is complete change link to simulate click
                document.body.classList.remove("link-transition")
            }, 300)
        })
        navMenu.appendChild(a)
        let b = document.createElement("hr")
        b.classList.add("menu-line")
        navMenu.appendChild(b)
    });


    // ----- POPULATE FLAGS ----- //
    let flags = document.createElement("div")
    flags.classList.add("flags")

    let linkAWrapper = document.createElement("a")
    let linkA = document.createElement("img")
    linkA.src = "./resources/br-flag.png"
    linkA.alt = "PT"
    linkA.id = "br-flag"
    linkAWrapper.href = "./pt/" + pt.menuItemsArr[indexOfActivePage] + "/"
    linkAWrapper.appendChild(linkA)

    let linkBWrapper = document.createElement("a")
    let linkB = document.createElement("img")
    linkB.src = "./resources/us-flag.png"
    linkB.alt = "EN"
    linkB.id = "us-flag"
    linkBWrapper.href = "./en/" + en.menuItemsArr[indexOfActivePage] + "/"
    linkBWrapper.appendChild(linkB)

    flags.appendChild(linkAWrapper)
    flags.appendChild(linkBWrapper)
    navMenu.appendChild(flags)
    if (document.querySelector('.s1')) { //is in index
        document.body.insertBefore(navMenu, document.querySelector('.s1')) //INSERT MENU 
    } else {
        document.body.insertBefore(navMenu, document.querySelector('.content')) //INSERT MENU
    }


    // ----- MAKE TOP NAVBAR ----- //
    let header = document.createElement('nav')
    header.classList.add("sticky", "navbar", "transparent-nav")
    header.id = 'navbar'


    // ----- LEFT NAV ----- //
    let left = document.createElement('div')
    left.classList.add("nav-left")
    let showNavBtn = document.createElement('i')
    showNavBtn.classList.add("fas", "fa-bars", "bar-2")
    showNavBtn.id = "nav-button"
    showNavBtn.addEventListener("click", function() { showNav() })
    let changeThemeBtn = document.createElement('i')
    changeThemeBtn.classList.add("fa-solid", "fa-sun", "change-theme-btn")
    changeThemeBtn.addEventListener("click", () => { changeTheme() })
    changeThemeBtn.id = "change-theme-btn"
    let closeNavBtn = document.createElement("i")
    closeNavBtn.classList.add("fas", "fa-times")
    closeNavBtn.id = "close-nav"
    closeNavBtn.style.display = "none"
    closeNavBtn.addEventListener("click", function() { closeNav() })
    left.appendChild(showNavBtn)
    left.appendChild(closeNavBtn)
    left.appendChild(changeThemeBtn)
    header.appendChild(left)


    // ----- RIGHT NAV ----- //
    let right = document.createElement('div')
    right.classList.add("nav-right")
    let link = document.createElement('a')
    link.href = lang + "/"
    let logo = document.createElement('div')
    logo.classList.add("logo", "logo-hover")
    logo.id = "logo"
    logo.style.display = "inline-block"
    logo.innerHTML = "Pcaramori"
    link.appendChild(logo)
    right.appendChild(link)
    header.appendChild(right)


    // ----- FOOTER ----- //
    let footerContainer = document.createElement('div')
    footerContainer.classList.add('footer-container')
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg") //! FIX THIS AAAAAAAAAA
    let path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
    footerContainer.appendChild(svg)
    svg.id = "footer-svg"
    svg.setAttribute("viewBox", "0 0 1440 320")
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svg.appendChild(path)
    path.setAttribute("fill", "var(--footer-bg-color)")
    path.setAttribute("fill-opacity", "1")
    path.setAttribute("d", "M0,256L48,234.7C96,213,192,171,288,149.3C384,128,480,128,576,138.7C672,149,768,171,864,192C960,213,1056,235,1152,208C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z")

    let footer = document.createElement('div')
    footer.classList.add("footer")
    for (let e = 0; e < eval(lang).footerTextArrs.length; e++) { //iterates through each col
        let col = document.createElement("div")
        let h2 = document.createElement("h2")
        h2.innerHTML = eval(lang).footerTextArrs[e][0] //set col title
        let ul = document.createElement("ul")
        col.appendChild(h2)
        col.appendChild(ul)
        for (let i = 1; i < eval(lang).footerTextArrs[e].length; i++) { //iterates through each option
            let listItem = document.createElement("li")
            let a = document.createElement("a")
            listItem.appendChild(a)
            a.innerHTML = eval(lang).footerTextArrs[e][i]
            a.href = eval(lang).footerLinkArrs[e][i]
            ul.appendChild(listItem)
        }
        col.className = "text-col"
        footer.appendChild(col)
    }
    footerIcons = document.createElement("div")
    footerIcons.className = "icon-col"

    for (let i = 0; i < footerSocials.name.length; i++) {
        let a = document.createElement("a")
        a.className = footerSocials.icon[i] + " footer-icon"
        a.href = footerSocials.link[i]
        a.setAttribute("title", footerSocials.name[i])
        footerIcons.appendChild(a)
    }

    footer.insertBefore(footerIcons, footer.children[1]) //INSERT FOOTER ICON BETWEEN BOTH COLS
    footerContainer.appendChild(footer)
    let copyright = document.createElement("div")
    copyright.className = "copyright"
    copyright.innerHTML = eval(lang).copyright
    footerContainer.appendChild(copyright)


    // ----- append the elements ----- // 
    if (document.querySelector('.s1')) { //is in index
        document.body.insertBefore(header, document.querySelector('.s1')) //INSERT NAVBAR HEADER
    } else {
        document.body.insertBefore(header, document.querySelector('.content')) //INSERT NAVBAR HEADER
    }
    document.querySelector('.content').after(footerContainer) //INSERT FOOTER AFTER CONTENT
}

//light/dark mode
let currentTheme = "dark"

function changeTheme() {
    let root = document.documentElement.style

    if (currentTheme == "dark") { //change to light
        currentTheme = "light";
        root.setProperty("--main-bg-color", "var(--LIGHT-main-bg-color)")
        root.setProperty("--secondary-bg-color", "var(--LIGHT-secondary-bg-color)")
        root.setProperty("--main-text-color", "var(--LIGHT-main-text-color)")
        root.setProperty("--footer-text-color", "var(--LIGHT-footer-text-color)")
        root.setProperty("--footer-bg-color", "var(--LIGHT-footer-bg-color)")
        root.setProperty("--navbar-bg-color", "var(--LIGHT-navbar-bg-color)")
        root.setProperty("--logo-text-color", "var(--LIGHT-logo-text-color)")
        document.getElementById('change-theme-btn').classList.add('fa-moon');
        document.getElementById('change-theme-btn').classList.remove('fa-sun');
    } else if (currentTheme == "light") { //change to dark
        currentTheme = "dark";
        root.setProperty("--main-bg-color", "var(--DARK-main-bg-color)")
        root.setProperty("--secondary-bg-color", "var(--DARK-secondary-bg-color)")
        root.setProperty("--main-text-color", "var(--DARK-main-text-color)")
        root.setProperty("--footer-text-color", "var(--DARK-footer-text-color)")
        root.setProperty("--footer-bg-color", "var(--DARK-footer-bg-color)")
        root.setProperty("--navbar-bg-color", "var(--DARK-navbar-bg-color)")
        root.setProperty("--logo-text-color", "var(--DARK-logo-text-color)")
        document.getElementById('change-theme-btn').classList.add('fa-sun');
        document.getElementById('change-theme-btn').classList.remove('fa-moon');
    }
}

// show/hide navigation
function showNav() {
    document.getElementById('nav-window').style.display = 'flex';
    document.getElementById('nav-button').style.display = 'none';
    document.getElementById('close-nav').style.display = 'inline-block';
    document.getElementsByClassName('flags')[0].style.display = '';

    //animating menu 
    document.getElementById('nav-window').classList.remove("menu-back");
    document.getElementById('nav-window').classList.add("menu-from-left");
    let menuLine = document.getElementsByClassName('menu-line');
    for (let i = 0; i < menuLine.length; i++) {
        menuLine[i].classList.add('hr-anim'); //add "hr-anim" to all lines in the nav menu. (the green lines that go from left to right as the menu comes in)
    }
}

function closeNav() {
    //animating menu
    document.getElementById('nav-window').classList.add("menu-back");

    //hiding menu
    setTimeout(function() {
            document.getElementById('nav-button').style.display = 'inline-block';
            document.getElementById('close-nav').style.display = 'none';
            document.getElementsByClassName('menu-line');
            document.getElementsByClassName('flags')[0].style.display = 'none'
            document.getElementById('nav-window').style.display = 'none';

            //removing animations from menu items
            document.getElementById('nav-window').classList.remove("menu-from-left");
            let menuLine = document.getElementsByClassName('menu-line');
            document.getElementById('nav-window').style.display = 'none';
            for (let i = 0; i < menuLine.length; i++) {
                menuLine[i].classList.remove('hr-anim'); //remove "hr-anim" from all lines in the nav menu. (the green lines that go from left to right as the menu comes in)
            }
        }, 501) //wait 500ms before hiding menu so animation can complete | 1 extra ms prevents flashing of menu of high refresh-rate screens, for whatever reason
}


// lock/allow scroll
function lockScroll() {
    document.getElementsByTagName('body')[0].classList.add('noscroll')
}

function allowScroll() {
    document.getElementsByTagName('body')[0].classList.remove('noscroll')
}


// pop-ups
function popUp(text, head) {
    //lock scrolling
    lockScroll();

    //create div and give it the pop-up class
    let newPopUp = document.createElement("div");
    document.body.appendChild(newPopUp);
    newPopUp.classList.add("pop-up");

    //add h1, hr, and p elements to div
    let h1 = document.createElement("h1");
    newPopUp.appendChild(h1);
    let hr = document.createElement("hr");
    newPopUp.appendChild(hr);
    let p = document.createElement("p");
    newPopUp.appendChild(p);

    //give h1 and p elements their text
    p.innerHTML = text;
    if (head) {
        h1.innerHTML = head;
    } else {
        h1.innerHTML = "Warning!"
    }

    // pop-up removal
    document.addEventListener('click', function(event) {
        let isClickInside = newPopUp.contains(event.target);
        if (!isClickInside) { //if the click isn't inside the pop-up, hide it.
            hidePopUp();
        }
    })
}

function hidePopUp() {
    document.getElementsByClassName("pop-up")[0].remove();
    allowScroll();
}

function animateTransition() {
    lockScroll()
    let loadingCover = document.createElement("div")
    document.body.appendChild(loadingCover)
    loadingCover.classList.add("link-transition")
    loadingCover.classList.add("link-transition-out")
    setTimeout(() => {
        loadingCover.remove()
        allowScroll()
    }, 500)
}