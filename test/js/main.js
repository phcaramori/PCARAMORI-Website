function showNav(){
    document.getElementById('nav-window').style.display = 'flex';
    document.getElementById('nav-button').style.display = 'none';
    document.getElementById('close-nav').style.display = 'inline-block';
    document.getElementsByClassName('flags')[0].style.display = '';

    //animating menu 
    document.getElementById('nav-window').classList.remove("menu-back");
    document.getElementById('nav-window').classList.add("from-left");
    let menuLine = document.getElementsByClassName('menu-line');
    for(let i = 0; i<menuLine.length; i++){
        menuLine[i].classList.add('hr-anim'); //add "hr-anim" to all lines in the nav menu. (the green lines that go from left to right as the menu comes in)
    }
}

function closeNav(){
    //animating menu
    document.getElementById('nav-window').classList.add("menu-back");
    
    //hiding menu
    setTimeout(function(){
        document.getElementById('nav-button').style.display = 'inline-block';
        document.getElementById('close-nav').style.display = 'none';
        document.getElementsByClassName('menu-line');
        document.getElementsByClassName('flags')[0].style.display = 'none'
        document.getElementById('nav-window').style.display = 'none';

    //removing animations from menu items
        document.getElementById('nav-window').classList.remove("from-left");
        let menuLine = document.getElementsByClassName('menu-line');
        document.getElementById('nav-window').style.display = 'none';
        for(let i = 0; i<menuLine.length; i++){
            menuLine[i].classList.remove('hr-anim'); //remove "hr-anim" from all lines in the nav menu. (the green lines that go from left to right as the menu comes in)
        }
    } ,300) //wait 300ms before hiding menu so animation can complete
}
//
function lockScroll(){
    document.getElementsByTagName('body')[0].classList.add('noScroll')
}
function allowScroll(){
    document.getElementsByTagName('body')[0].classList.remove('noScroll')
}