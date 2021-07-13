/*

TO-DO

-Make better looking alert message.
-Add upgrades
-More efficient saving
-2 new buildings
-"Golden Cup"
*/

const cup = document.getElementById('cup');
let cupIncreaseVal = 1 //how much to increase money when clicked
let mps = 0; //Money Per Second
let cps = 0; //current cps
let Mcps = 0; //max cps
let coinsTrue = 1; //integer. Actual coin number.
let coins = 1; //string. Showcased coin number.
/*
function Nalert(str) {
    TO IMPLEMENT

    document.getElementById('alert').innerHTML = str
        
    document.getElementById('alert').style.animation = 'alertAnim 3s'
    setTimeout(function() { document.getElementById('alert').style.animation = '' }, 3500)
    
}
*/

function blur(str) {
    if (str.cost <= coinsTrue) {
        document.getElementById(str.name).style.backgroundColor = 'rgb(112, 64, 2)'
    } else {
        document.getElementById(str.name).style.backgroundColor = 'rgb(30, 14, 1)'
    }
}

//onclick functions
cup.onclick = function() {
    coinsTrue += cupIncreaseVal;
    cps++;
}

document.getElementById('ant').onclick = function() { ant.buy() }
document.getElementById('worker').onclick = function() { worker.buy() }

//time functions 
setInterval(function() { //Resets max cps
    Mcps = 0
}, 60000);

setInterval(function() { //update most values. 20x per second
    coinsTrue = parseFloat(coinsTrue)
    coins = commas(coinsTrue)
    document.getElementById('val').innerHTML = coins
    document.getElementById('mps').innerHTML = Math.round(mps * 10) / 10
    document.getElementById('mpc').innerHTML = 'Money Per Click: ' + Math.round(cupIncreaseVal)
    document.getElementById('cps').innerHTML = 'Max CPS: ' + Math.round(Mcps)
    document.getElementById('antPrice').innerHTML = 'Cost: ' + commas(ant.cost)
    document.getElementById('workerPrice').innerHTML = 'Cost: ' + commas(worker.cost)

    blur(ant)
    blur(worker)
}, 50);

setInterval(function() { //add money per second to total. Makes max cps equal to new max. once per second.
    coinsTrue += mps
    if (Mcps < cps) { Mcps = cps }
    cps = 0
}, 1000);
//add commas to the numbers
function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//buildings
function newBuilding(name, baseCost, nMps) {
    this.name = name;
    this.mps = nMps;
    this.totalMps;
    this.count = 0;
    this.cost = baseCost;
    this.buy = function() {
        if (this.cost <= coinsTrue) {
            coinsTrue -= this.cost
            if (this.cost < 1000) {
                this.cost = this.cost + Math.round(this.cost / 100 * (Math.round(Math.random() * 100) + 30)); //add between 130 and 30% to current value
            } else {
                this.cost = this.cost + Math.round(this.cost / 100 * (Math.round(Math.random() * 35) + 10)); //add between 45 and 10% to current value
            }
            this.count++;
            this.totalMps = this.totalMps + this.mps
            mps += this.mps
        } else {

        }
    }
}
//initializing buildings
let ant = new newBuilding('ant', 10, 1);
let worker = new newBuilding('worker', 100, 5);
let factory = new newBuilding('factory', 500, 10);
//

/*=====================
========SAVING========
=====================*/

setInterval(function() { //SAVING. Every 2 seconds. Make slower if game gets heavier.
    let buildingSave = [ant.cost, ant.count, worker.cost, worker.count]
    window.localStorage.setItem('buildings', JSON.stringify(buildingSave))
        /*

        */
    if (coinsTrue === 0 || Number.isNaN(coinsTrue)) {
        coinsTrue = 1
        window.localStorage.setItem('coins', coinsTrue)
    } else {
        window.localStorage.setItem('coins', coinsTrue)
    }
    if (cupIncreaseVal === 0 || Number.isNaN(cupIncreaseVal)) {
        cupIncreaseVal = 1
        window.localStorage.setItem('cupIncreaseVal', parseFloat(cupIncreaseVal))
    } else {
        window.localStorage.setItem('cupIncreaseVal', parseFloat(cupIncreaseVal))
    }
    if (Number.isNaN(mps)) {
        mps = 1
        window.localStorage.setItem('mps', parseFloat(mps))
    } else {
        window.localStorage.setItem('mps', parseFloat(mps))
    }
}, 2000);

/*=====================
========SAVING========
=====================*/


/*=====================
========LOADING========
=====================*/

coinsTrue = parseFloat(localStorage.getItem('coins'))
cupIncreaseVal = parseFloat(localStorage.getItem('cupIncreaseVal'))
mps = parseFloat(localStorage.getItem('mps'))
buildingSave = JSON.parse(localStorage.getItem('buildings'))
    //cost, count, totalMps
ant.cost = buildingSave[0]
ant.count = buildingSave[1]

worker.cost = buildingSave[2]
worker.count = buildingSave[3]

/*=====================
========LOADING========
=====================*/

function clear() {
    window.localStorage.clear()
    location.reload()
}