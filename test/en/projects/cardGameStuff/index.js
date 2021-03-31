//idea: have one div with all cards, which can be fully deleted and changed without changing the webpage
let Game = {
    deck: [], //the deck with all the playing cards for the game
    shuffledDeck: [], //the shuffled deck of cards for the game

    //constructors
    Card : function(suit, number){ //card constructor
        this.suit = suit;
        this.number = number;
    },

    shuffle : function(){ //shuffle the deck of cards
        let final = []; //output array
        let temp = Game.deck;
        for (let i = temp.length; i > 0; i--) { //loop from end of array to beginning
            let random = Math.floor(Math.random()*temp.length) //make rand num up to array length
            final.push(temp[random]) //get a random index from temp, push it to final
            temp.splice(random,1) //remove that index
        }
        Game.shuffledDeck = final;
    },

    //display functions
    display : {
        displayCard : function(element,card){ // put . in front of div name when calling function, Ex: .first
            //displays a specified card. Must call with the card's object
            let img = document.createElement('img');
            img.setAttribute('src',`./res/${card.number}_of_${card.suit}.png`); //add src to image
            img.setAttribute('class','card')
            element.appendChild(img) //create img element in given div
        },
        displayAll : function(element, deck){ // put . in front of div name when calling function, Ex: .first
            //displays all cards in the deck, in order.
            for (let i = 0; i < deck.length; i++) {
                this.displayCard(element, deck[i])
            }
        },
        displayClear : function(element){ //remove all children from element
            for (let i = 0; i < element.childElementCount; i++) {
                document.getElementById().removeChild()
            }
        }
    },
    numToCard : function(num){ //turns inputted number into corresponding playing card number (Ex: 11 = J)
        switch (num) {
            case 1:
                return "ace"
                break;
    
            case 11:
                return "jack"
                break;
        
            case 12:
                return "queen"
                break;
        
            case 13:
                return "king"
                break;
        
            default:
                return num
                break;
        }
    },

}



function init(numberOfDecks,joker){ //makes all cards | int, bool
    if(!numberOfDecks){ //default numberOfDecks to 1 if not specified
        numberOfDecks = 1;
    }
    for(let k = 0; k<numberOfDecks; k++){ //repeat for how many decks should be put in the shuffle*/
        for(let i = 1; i<14; i++){ //add 4 cards to deck, one of each suit
            Game.deck.push(new Game.Card("hearts",Game.numToCard(i)));
            Game.deck.push(new Game.Card("spades",Game.numToCard(i)));
            Game.deck.push(new Game.Card("clubs",Game.numToCard(i)));
            Game.deck.push(new Game.Card("diamonds",Game.numToCard(i)));
        }
        if(joker){ //add two jokers per deck
            Game.deck.push(new Game.Card("red","joker"));
            Game.deck.push(new Game.Card("black","joker"));
        }
    }
    console.log(Game.deck)
}

function $(selector){
    return document.querySelector(selector)
}
