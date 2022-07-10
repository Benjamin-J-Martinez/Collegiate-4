let difficulty; //global variable to determine the difficulty of the bot

//Sets the difficulty to easy if the user selects the easy button
function changeDifficulty(diff) {
    difficulty = diff;
}

function changeSelected(imgPath) {
    const selected = document.getElementById('selected');
    selected.src = imgPath;
}

function dropTile()
