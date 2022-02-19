/*Finished on 17th of December, 2021*/
let Game = {
    meta: {
        difficulty: '',
        getOffset: function(el) {
            const rect = el.getBoundingClientRect();
            return {
                top: rect.top + window.scrollY,
                bottom: rect.bottom - window.scrollY
            }
        },
        difficultyMultiplier: 1, //Increase for difficulty Easy = 1, Medium = 1.4, Hard = 1.8, Impossible 2.2. Makes obstacles more common and shortens space in between
        toPercent: function(n) {
            return n + "%"
        },
        tickSpeed: 15, //Default: 15, around 60 times a second
        updateBird: function() {
            if (Game.bird.gravity.goingUp === false) { //if bird is not going up, increase the gravity
                Game.bird.gravity.increase()
            }
            Game.meta.updateCollision();
        },
        updateCollision: function() { //also handles score, called by updateBird()
            if (Game.bird.bottom.value <= 9) { //if bird hits the floor
                Game.interface.gameOver()
            } else if (Game.bird.bottom.value >= 95) {
                Game.interface.gameOver()
            }
            for (let i = 0; i < Game.obstacle.obstacles.length; i++) {
                let obstacle = Game.obstacle.obstacles[i];
                if (obstacle.isInCollision()) {
                    /*really long stupid if statement to calculate collission with obstacle.*/
                    if (Game.meta.getOffset(Game.bird.e).bottom > Game.meta.getOffset(obstacle.bottomEl).top || Game.meta.getOffset(Game.bird.e).top < Game.meta.getOffset(obstacle.topEl).bottom) {
                        Game.interface.gameOver()
                    }

                    if (!obstacle.hasPassed) { //add to score if object is in collision
                        obstacle.hasPassed = true; //does not run if already true
                        Game.interface.score.increase();
                        //this is horribly inneficienty holy jesus
                    }
                }
            }
        },
        obstacleTimer: 1,
        updateObstacles: function() { //iterate through obstacles array and update each one
            for (let i = 0; i < Game.obstacle.obstacles.length; i++) {
                let x = Game.obstacle.obstacles[i];
                if (parseInt(x.e.style.right) > 120) { //when off screen, delete
                    Game.obstacle.obstacles.splice(i, 1);
                    x.delete()
                }

                x.update()
            }
            Game.meta.obstacleTimer += 1;
            if (Game.meta.obstacleTimer >= 90 / Game.meta.difficultyMultiplier) {
                new Game.obstacle.Create()
                Game.meta.obstacleTimer = 1;
            }
        },
        addToTicker: function(input) {
            update.push(input);
        },
        removeFromTicker: function(input) {
            let i = update.indexOf(input);
            update.splice(i, 1);
        },
        endTicker: function() {
            update = [];
        },
        setup: function(difficulty) {
            switch (difficulty) {
                case 'easy':
                    this.difficulty = 'easy'
                    this.difficultyMultiplier = 1
                    break;
                case 'medium':
                    this.difficulty = 'medium'
                    this.difficultyMultiplier = 1.4
                    break;
                case 'hard':
                    this.difficulty = 'hard'
                    this.difficultyMultiplier = 1.8
                    break;
                case 'impossible':
                    this.difficulty = 'impossible'
                    this.difficultyMultiplier = 2.2
                    document.getElementById('body').style.backgroundColor = "rgb(150,50,50)"
                    break;
            }
            startClock()
            Game.meta.addToTicker(Game.meta.updateBird);
            Game.meta.addToTicker(Game.meta.updateObstacles);
            Game.interface.hide('menu');
            Game.interface.show('game');
            document.getElementById('body').addEventListener('click', function() { Game.bird.gravity.goUp() })
            document.getElementById('body').style.overflow = 'hidden'
            document.getElementById('body').addEventListener('keydown', function() { Game.bird.gravity.goUp(); }) //press space bar
        },
        saveScore: function() { //checks to see if current score is higher than previous, changes localStorage value
            if (Game.interface.score.value > localStorage.getItem(Game.meta.difficulty) || !localStorage.getItem(Game.meta.difficulty)) { //if new High Score
                localStorage.setItem(Game.meta.difficulty, Game.interface.score.value)
                Game.interface.show('new-high-score')
            }
        },
        loadScores: function() { //load all high scores into menu
            let diffArray = ["easy", "medium", "hard", "impossible"]
            for (let i = 0; i < diffArray.length; i++) {
                if (!localStorage.getItem(diffArray[i])) { //sets high score to 0 if it is non-existent
                    localStorage.setItem(diffArray[i], 0)
                }
                document.getElementById(diffArray[i] + '-score').innerHTML = localStorage.getItem(diffArray[i]) //update innerHTML to display HighScores
            }
        },
        eraseScores: function() {
            localStorage.clear()
            window.location.reload()
        }
    },
    bird: {
        e: document.getElementById('bird'),
        bottom: {
            value: 40,
        },
        gravity: {
            value: 1,
            goingUp: false,
            increase: function() { //Happens every tick
                Game.bird.bottom.value -= 0.3 * Game.bird.gravity.value;
                Game.bird.gravity.value = Game.bird.gravity.value * Game.bird.gravity.multiplier;
                // quadratic: Speed shoud increase as x^n, not n^x (where x is speed)
                // set gravity to new value * multiplier
                Game.bird.e.style.bottom = Game.meta.toPercent(Game.bird.bottom.value);
            },
            goUp: function() { //called on user click
                Game.bird.gravity.value = 1
                update.push(Game.bird.gravity.goingUpAnim)
                Game.bird.gravity.goingUp = true
                    //document.getElementById('bird').classList.add('going-up')
                setTimeout(() => { //undo everything that was changed by the function, reset gravity
                    Game.bird.gravity.goingUp = false
                    Game.meta.removeFromTicker(Game.bird.gravity.goingUpAnim)
                    Game.bird.gravity.value = 1
                        //document.getElementById('bird').classList.remove('going-up')
                }, 250);
            },
            goingUpAnim: function() { //called from goUp()
                Game.bird.bottom.value += 1.6 / Game.bird.gravity.value;
                Game.bird.gravity.value *= 1.1;
                /* decrease as a quadratic.. or attempt to idk if this 
                works as I think it does but hey */

                /*
                To make linear:
                Game.bird.bottom.value += 1
                */
                Game.bird.e.style.bottom = Game.meta.toPercent(Game.bird.bottom.value);
            },
            multiplier: 1.06 //multiplier to increase gravity. 
        }
    },
    obstacle: {
        obstacles: [],
        Create: class { //creates every obstacle.  
            /*
             *  Each obstacle has an update() method and is responsible
             *  for its own logic, but not collision. Collision is handeled by Game.meta.collision, 
             *  but the obstacle.isInCollision method is called on every obstacle every tick to see
             *  if certain element is in the collision space of the bird, handled in Game.meta.collision
             */
            constructor() {
                this.heightTop = Math.floor(Math.random() * 80 * Game.meta.difficultyMultiplier - 10);
                this.heightBottom = Math.floor(Math.random() * 80 * Game.meta.difficultyMultiplier);
                this.pos = -25
                this.e = document.createElement("div");
                this.e.style.right = Game.meta.toPercent(this.pos)
                    //The top and bottom height are randomized, and the middle height takes up the rest (100% height)

                // initialize obstacle
                this.e.classList.add("obstacle");

                this.topEl = document.createElement("div");
                this.topEl.classList.add("top-obstacle");
                this.topEl.style.height = Game.meta.toPercent(this.heightTop)

                this.middleEl = document.createElement("div");
                this.middleEl.classList.add("middle-obstacle");

                this.bottomEl = document.createElement("div");
                this.bottomEl.classList.add("bottom-obstacle");
                this.bottomEl.style.height = Game.meta.toPercent(this.heightBottom)

                this.e.append(this.topEl);
                this.e.append(this.middleEl);
                this.e.append(this.bottomEl);
                document.getElementById('game').append(this.e)

                Game.obstacle.obstacles.push(this)

                //individual obstacle functions 
                this.update = function() {
                    this.pos++;
                    this.e.style.right = Game.meta.toPercent(this.pos)
                }

                this.delete = function() {
                    this.e.parentNode.removeChild(this.e);
                }

                this.isInCollision = function() {
                    if (this.pos < 80 && this.pos > 60) { //checks if the obstacle is inside the bird's x pos
                        return true
                    }
                }
                this.hasPassed = false
            }
        },
        populate: function() { //gets called when obstacle leaves screen
            this.obstacles.push(this.Create())
        },
    },
    interface: {
        score: {
                e: document.getElementById('score'),
                value: 0,
                increase: function() {
                    this.value += 1;
                    this.e.innerHTML = this.value
                },
                reset: function() {
                    this.value = 0;
                    this.e.innerHTML = value
                },
            },
            setup: function() { //add all event listeners
                document.getElementById('easy').addEventListener("click", function() { Game.meta.setup('easy') });
                document.getElementById('medium').addEventListener("click", function() { Game.meta.setup('medium') });
                document.getElementById('hard').addEventListener("click", function() { Game.meta.setup('hard') });
                document.getElementById('impossible').addEventListener("click", function() { Game.meta.setup('impossible') });
                document.getElementById('high-scores').addEventListener("click", function() {
                    Game.interface.show('high-score-menu');
                    Game.interface.hide('menu')
                })
                document.getElementById('back-to-menu').addEventListener("click", function() {
                    Game.interface.hide('high-score-menu');
                    Game.interface.show('menu')
                })
                document.getElementById('play-again').addEventListener("click", function() { window.location.reload() })
                document.getElementById('erase-high-scores').addEventListener('click', function() { Game.meta.eraseScores() })
                Game.meta.loadScores()
            },
            show: function(el) {
                document.getElementById(el).style.display = 'block'
            },
            hide: function(el) {
                document.getElementById(el).style.display = 'none'
            },
            gameOver: function() {
                this.hide('game');
                this.show('game-over')
                document.getElementById('final-score').innerHTML = "Your Score: " + Game.interface.score.value;
                Game.meta.endTicker();
                Game.meta.saveScore() //also handles the "new high score!" message
            },
    },
    testing: {
        invunerable: function() {
            Game.meta.removeFromTicker(Game.meta.updateBird);
            Game.meta.tickSpeed = 100
        },
        birdFall: function() {
            Game.bird.bottom.value -= 30;
            Game.bird.e.style.bottom = Game.meta.toPercent(Game.bird.bottom.value)
        }
    }
}

//TICK - UPDATE
var update = []

function startClock() {
    setInterval(() => {
        if (update) {
            for (let i = 0; i < update.length; i++) {
                update[i]();
            }
        }
    }, Game.meta.tickSpeed);
}

Game.interface.setup();