function intro(){ 
    //hide everything behind intro
    for (let i = 0; i < document.querySelectorAll("div:not(.intro)").length; i++) {
        document.querySelectorAll("div:not(.intro)")[i].style.zIndex = "0";
    }

    //hide navbar
    document.getElementById('navbar').style.display="none"

    //put into in front
    document.getElementsByClassName('intro')[0].style.zIndex="1";


    setTimeout(function() {
        //add anim to make intro go up
        document.getElementsByClassName('intro')[0].classList.add('intro-away-anim')
        
        //Show navbar
        document.getElementById('navbar').style.zIndex="0" //makes sure nav affets the dom but doesn't show
        document.getElementById('navbar').style.display=""

        setTimeout(function(){
            //put content back on top
            for (let i = 0; i < document.querySelectorAll("div:not(.intro)").length; i++) {
                document.querySelectorAll("div:not(.intro)")[i].style.zIndex = ""
            }

            //hide intro
            document.getElementsByClassName('intro')[0].style.display="none"
            
        },299)
    },1000)
}