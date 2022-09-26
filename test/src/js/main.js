/*

    1 - Show/hide nav
    2 - lock/allow scroll
    3 - pop-up maker

*/
console.log("%c What are you snooping around for?", "font-family:sans-serif; font-size:40px; color: red; text-shadow: 2px 2px 0 rgb(217,31,38) , 4px 4px 0 rgb(226,91,14) , 6px 6px 0 rgb(245,221,8) , 8px 8px 0 rgb(5,148,68)")

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
//
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

//create nav, footer, and other repeated elements

function populate(){
    // ----- CUSTOM LANGUAGE-SENSING BASED ON DIRECTORY ----- //
    const lang = document.getElementsByTagName('html')[0].getAttribute('lang'); //en, pt
    const active = window.location.pathname.split('/')[3] //CHANGE TO 2 ONCE TEST DIR IS GONE
    
    let navMenu = document.createElement('div')
    navMenu.classList.add("nav-window", "flex-center", "space-around", "noscroll")
    navMenu.id = "nav-window"
    navMenu.appendChild(document.createElement("h1"))

    let textArren = ["about-me", "projects", "history", "contact"] //must be the same in EN and PT
    let textArrpt = ["sobre-mim", "projetos", "historico", "contato"]

    let indexOfPage ;
    if(lang === "en"){
        indexOfPage = textArren.indexOf(active)
    }else if(lang === "pt"){
        indexOfPage = textArrpt.indexOf(active)
    }


    // ----- POPULATE NAV MENU ACCORDING TO LANGUAGE ----- //
    eval('textArr'+lang).forEach(link => {
        let a = document.createElement("a")
        a.classList.add("nav-item")
        a.style.textTransform = 'capitalize';
        let finalText = link.split("-").join(" ") //replace each space with a -
        a.innerHTML = finalText
        if(link === active){
            a.classList.add("active-nav-item") //make active link orange
        }
        a.href = link
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
    linkAWrapper.href = "./pt/"+ textArrpt[indexOfPage] + "/"
    linkAWrapper.appendChild(linkA)

    let linkBWrapper = document.createElement("a")
    let linkB = document.createElement("img")
    linkB.src = "./resources/us-flag.png"
    linkB.alt = "EN"
    linkB.id = "us-flag"
    linkBWrapper.href = "./en/"+ textArren[indexOfPage] + "/"
    linkBWrapper.appendChild(linkB)

    flags.appendChild(linkAWrapper)
    flags.appendChild(linkBWrapper)
    navMenu.appendChild(flags)
    document.body.insertBefore(navMenu, document.querySelector('.content')) //INSERT NAV MENU


    // ----- MAKE TOP NAVBAR ----- //
    let header = document.createElement('nav')
    header.classList.add("sticky", "navbar", "transparent-nav")
    
    // ----- LEFT NAV ----- //
    let left = document.createElement('div')
    left.classList.add("nav-left")
    let showNavBtn = document.createElement('i')
    showNavBtn.classList.add("fas", "fa-bars", "bar-2")
    showNavBtn.id = "nav-button"
    showNavBtn.addEventListener("click",function(){showNav()})
    let closeNavBtn = document.createElement("i")
    closeNavBtn.classList.add("fas", "fa-times")
    closeNavBtn.id = "close-nav"
    closeNavBtn.style.display = "none"
    closeNavBtn.addEventListener("click",function(){closeNav()})
    left.appendChild(showNavBtn)
    left.appendChild(closeNavBtn)
    header.appendChild(left)
    
    // ----- RIGHT NAV ----- //
    let right = document.createElement('div')
    right.classList.add("nav-right")
    let link = document.createElement('a')
    link.href = "./index.html"
    let logo = document.createElement('div')
    logo.classList.add("logo", "logo-hover")
    logo.id = "logo"
    logo.style.display = "inline-block"
    logo.innerHTML = "Pcaramori"
    link.appendChild(logo)
    right.appendChild(link)
    header.appendChild(right)

    document.body.insertBefore(header, document.querySelector('.content')) //INSERT NAVBAR HEADER
}
