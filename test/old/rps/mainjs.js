window.onload = function() {

    const rock = document.getElementById('rock');
    const paper = document.getElementById('paper');
    const scissor = document.getElementById('scissor');
    const result_in = document.getElementById("result")
    let computer;
    let computer_pick;
    let result;

    //Player choice
    rock.addEventListener('click', function() {
        play('rock')
    })
    paper.addEventListener('click', function() {
        play('paper')
    })
    scissor.addEventListener('click', function() {
        play('scissor')
    })

    function play(userinput) {
        computer_pick = Math.floor(Math.random() * 3);
        console.log('computer_pick:', computer_pick);
        if (computer_pick === 0) {
            computer = 'rock'
        } else if (computer_pick === 1) {
            computer = 'paper';
        } else {
            computer = 'scissor';
        }
        console.log(`computer: ${computer}`)
            //user

        if (computer == userinput) { //tie
            result = 'tied';
        } else if (computer == 'rock' && userinput == 'paper' || computer == 'paper' && userinput == 'scissor' || computer == 'scissor' && userinput == "rock") {
            console.log('win');
            result = 'won';
        } else {
            console.log('loss');
            result = 'lost';
        };
        //output

        document.getElementById('result').innerHTML = `You ${result}! The computer threw ${computer}.`;
    }
}