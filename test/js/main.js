/*

    1 - Show/hide nav
    2 - lock/allow scroll
    3 - pop-up maker

*/
console.log("%c what are you snooping around for?", "font-family:sans-serif; font-size:40px; color: red; text-shadow: 2px 2px 0 rgb(217,31,38) , 4px 4px 0 rgb(226,91,14) , 6px 6px 0 rgb(245,221,8) , 8px 8px 0 rgb(5,148,68)")

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
        }, 300) //wait 300ms before hiding menu so animation can complete
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