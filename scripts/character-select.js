const characterImgs = document.getElementsByClassName('col')[0].getElementsByTagName('img');
const selected = document.getElementById('selected');
let clicked = false;

function displayCharacter(image) {
    selected.src = image;
}

function selectCharacter() { localStorage.setItem('game', JSON.stringify(game)); }

for(let i = 0; i < characterImgs.length; i++) {
    characterImgs[i].addEventListener('click', event => {
        selected.src = './images/' + event.target.id + '-Portrait.png';
        if(!clicked) {
            for(let j = 0; j < characterImgs.length; j++) {
                characterImgs[j].removeAttribute('onmouseover');
            }
        }
        clicked = true;
    })
}

const characters = [
    {
        name: 'Scrappy',
        college: 'University of North Texas', 
        info: 'Scrappy is the mascot of the University of North Texas. The name Scrappy wsa chosen by students in 1995.',
        imgSrc: './images/scrappy-Cropped.png',
    },

]

const game = JSON.parse(localStorage.getItem('game'));
game.player1.character = characters[0];



