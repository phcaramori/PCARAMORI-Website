function showNav(){
    document.getElementById('nav-window').style.display = 'flex';
    document.getElementById('nav-button').style.display = 'none';
    document.getElementById('close-nav').style.display = 'inline-block';
    //animating menu 
    document.getElementById('nav-window').classList.remove("menu-back")
    document.getElementById('nav-window').classList.add("from-left");
    let menuLine = document.getElementsByClassName('menu-line');
    for(let i = 0; i<menuLine.length; i++){
        menuLine[i].classList.add('hr-anim');
    }
    //setTimeout(function(){document.getElementById('nav-window').style.position = ''},1000)
}
function closeNav(){
    document.getElementById('nav-window').classList.add("menu-back")
    setTimeout(function(){
        document.getElementById('nav-button').style.display = 'inline-block';
        document.getElementById('close-nav').style.display = 'none';
        document.getElementsByClassName('menu-line');
    //animating menu
        document.getElementById('nav-window').classList.remove("from-left");
        let menuLine = document.getElementsByClassName('menu-line');
        for(let i = 0; i<menuLine.length; i++){
            menuLine[i].classList.remove('hr-anim');
        }
    } ,300) 
    setTimeout(function(){
        document.getElementById('nav-window').style.display = 'none';
    },900)

}
