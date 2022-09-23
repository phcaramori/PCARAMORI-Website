//I did not know any JS framework so bare with this
function intro() {
    //hide everything behind intro
    for (let i = 0; i < document.querySelectorAll("div:not(.intro)").length; i++) {
        document.querySelectorAll("div:not(.intro)")[i].style.zIndex = "0";
    }

    //hide navbar
    document.getElementById('navbar').style.display = "none"

    //put intro in front
    document.getElementsByClassName('intro')[0].style.zIndex = "1";


    setTimeout(function() {
        //add anim to make intro go up
        document.getElementsByClassName('intro')[0].classList.add('intro-away-anim')

        //Show navbar
        document.getElementById('navbar').style.zIndex = "0" //makes sure nav affets the dom but doesn't show
        document.getElementById('navbar').style.display = ""

        setTimeout(function() {
            //put content back on top
            for (let i = 0; i < document.querySelectorAll("div:not(.intro)").length; i++) {
                document.querySelectorAll("div:not(.intro)")[i].style.zIndex = ""
            }

            //hide intro
            document.getElementById('navbar').style.zIndex = ""
            document.getElementsByClassName('intro')[0].style.display = "none"

        }, 299)
    }, 1000)
}
intro()


//move intro box around mouse

// const anchor = document.getElementsByClassName('hero-title')[0]
//  //get coordinates for Y center of logo
// document.addEventListener('mousemove',(e) => {

//     const rect = anchor.getBoundingClientRect()
//     const anchorX = rect.left + rect.width / 2; //get coordinates for X center of logo
//     const anchorY = rect.top + rect.height / 2;

//     //get  position of  mouse relative to the center of the logo
//     const x = e.clientX - anchorX; 
//     const y = e.clientY - anchorY;

//     const rad = Math.atan2(x,y);
//     let deg = rad * 180 / Math.PI;
//     deg += 90
//     deg *= -1
//     anchor.style.transform = `rotate(${deg}deg)`;
// })