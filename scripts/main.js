const characters = [
    {
        name: 'Scrappy',
        college: 'University of North Texas', 
        info: 'Scrappy is the mascot of the University of North Texas. The name Scrappy wsa chosen by students in 1995.' 
    },

]

const player1 = {
    id: 1,
    character: null,
}

const player2 = {
    id: 2,
    character: null,
}

let difficulty; //global variable to determine the difficulty of the bot
let mode; //global variable to store the mode the user selects to be in.

function setMode(selectedMode) { mode = selectedMode; }

//Sets the difficulty to easy if the user selects the easy button
function setDifficulty(diff) { difficulty = diff; }

function changeSelected(imgPath) {
    const selected = document.getElementById('selected');
    selected.src = imgPath;
}

/*function placeTile(col) {

}

function playGame() {
    let game = new Game();
    while(1) {

    }
}*/
