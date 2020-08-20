function bodyClick() {
    /* Delete eberything in between <body> */
    document.getElementById('fakeBody1').innerHTML = '';
    document.getElementById('fakeBody1').remove();
    document.getElementById('body').style.backgroundColor = 'var(--main-bg-color)';
}

function dropdown() {
    document.getElementById("nav-menu").classList.toggle("show");
}

function settingsClick() {
    window.location.href = 'settings.html'
}

function home() {
    window.location.href = 'index.html'
}
/* Theme changing*/
function theme1() { //original
    document.documentElement.style.setProperty('--main-nav-color', 'rgb(205, 205, 205)');
    document.documentElement.style.setProperty('--secondary-accent-color', 'rgb(0, 113, 128)');
    document.documentElement.style.setProperty('--main-accent-color', 'rgb(255, 94, 0)');
    document.documentElement.style.setProperty('--main-text-color', 'black');
    document.documentElement.style.setProperty('--main-bg-color', 'white');
    localStorage.setItem('Theme', 'theme1');
}

function theme2() { //dark mode
    document.documentElement.style.setProperty('--main-nav-color', 'rgb(50,50,50)');
    document.documentElement.style.setProperty('--secondary-accent-color', 'rgb(30,30,30)');
    document.documentElement.style.setProperty('--main-accent-color', 'rgba(0, 200, 0,0.5)');
    document.documentElement.style.setProperty('--main-text-color', 'white');
    document.documentElement.style.setProperty('--main-bg-color', 'black');
    localStorage.setItem('Theme', 'theme2');
}

function theme3() { //Beach
    document.documentElement.style.setProperty('--main-nav-color', '#c8a415');
    document.documentElement.style.setProperty('--secondary-accent-color', '#004293');
    document.documentElement.style.setProperty('--main-accent-color', '#ffff81');
    document.documentElement.style.setProperty('--main-text-color', 'white');
    document.documentElement.style.setProperty('--main-bg-color', '#066cc4');
    localStorage.setItem('Theme', 'theme3');
}

function theme4() { //abyss
    document.documentElement.style.setProperty('--main-nav-color', '#599315');
    document.documentElement.style.setProperty('--secondary-accent-color', '#3fc0c4');
    document.documentElement.style.setProperty('--main-accent-color', '#006ccb');
    document.documentElement.style.setProperty('--main-text-color', '#bdf779');
    document.documentElement.style.setProperty('--main-bg-color', '#000045');
    localStorage.setItem('Theme', 'theme4');
}

function theme5() { //Val. day
    document.documentElement.style.setProperty('--main-nav-color', '#ff3d00');
    document.documentElement.style.setProperty('--secondary-accent-color', '#c30000');
    document.documentElement.style.setProperty('--main-accent-color', '#ff7539');
    document.documentElement.style.setProperty('--main-text-color', '#ff77a9');
    document.documentElement.style.setProperty('--main-bg-color', '#e91e63');
    localStorage.setItem('Theme', 'theme5');
}

let myArray = ['yeet', 'yeet', 'yeet']

function loadTheme() {
    let theme = localStorage.getItem('Theme');
    switch (theme) {
        case 'theme1':
            theme1()
            break;
        case 'theme2':
            theme2()
            break;
        case 'theme3':
            theme3()
            break;
        case 'theme4':
            theme4()
            break;
        case 'theme5':
            theme5()
            break;
    }
}

function a() {
    let name = window.prompt('Please enter your name')
}

function b() {
    let confirmation = window.confirm('Are you sure?')
}

function c() {
    window.alert('Things happened.')
}

function d() {
    document.getElementById('btn').style.backgroundColor = 'red'
}