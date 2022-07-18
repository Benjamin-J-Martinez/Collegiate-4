const characterImgs = document.getElementsByClassName('col')[0].getElementsByTagName('img');
const selectedp1 = document.getElementById('selectedp1');
const selectedp2 = document.getElementById('selectedp2')
const selectButton = document.getElementById('select');

let clickedOnce = false;
let clickedTwice = false;
let finish = false;

function displayCharacter(image, player=1) {
    if(player === 1)
        selectedp1.src = image;
    
    if(player === 2)
        selectedp2.src = image;
}

function selectCharacter() { localStorage.setItem('game', JSON.stringify(game)); }

function highLightCharacter(event) {
    if(!clickedTwice) {
        selectedp1.src = './images/' + event.target.id + '-Portrait.png';
        game.player1.character.imgSrc = './images/' + event.target.id + '-Cropped.png';
    } else{
        selectedp2.src = './images/' + event.target.id + '-Portrait.png';
        game.player2.character.imgSrc = './images/' + event.target.id + '-Cropped.png';
        selectCharacter();
        finish = true;
    }
        

    clickedOnce = true;
    if(clickedOnce) {
        for(let j = 0; j < characterImgs.length; j++) {
            characterImgs[j].removeAttribute('onmouseover');
        }
    }
}

for(let i = 0; i < characterImgs.length; i++) {
    characterImgs[i].addEventListener('click', highLightCharacter)
}

selectButton.addEventListener('click', () => {
    for(let i = 0; i < characterImgs.length; i++) {
        selectedSrc = './images/' + characterImgs[i].id + '-Portrait.png';
        parameterStr = "displayCharacter('" + selectedSrc + "', 2)";
        characterImgs[i].setAttribute('onmouseover', parameterStr);
        clickedTwice = true;
    }

    if(finish) {
        selectButton.href = 'game.html';
    }
})

const characters = [
    {
        name: 'Scrappy',
        college: 'University of North Texas', 
        info: 'Based in Denton, Scrappy was known as various names throughout the years, including "Eppy," though in 1995 the name "Scrappy" was chosen by the student body.',
        imgSrc: './images/scrappy-Cropped.png',
    },
    {
        name: 'Owl of Minerva',
        college: 'Texas Womens University',
        info: 'Put Info Here',
        imgSrc: './images/minerva-Cropped.png',
    },
    {
        name: 'Bevo',
        college: 'University of Texas',
        info: 'Put Info Here',
        imgSrc: './images/Bevo-Cropped.png',
    },
    {
        name: 'Boko the Bobcat',
        college: 'Texas State University',
        info: 'Put Info Here',
        imgSrc: './images/boko-Cropped.png',
    },
    {
        name: 'Joy',
        college: 'Baylor University',
        info: 'Put Info Here',
        imgSrc: './images/Joy-Cropped.png',
    },
    {
        name: 'Peruna',
        college: 'Southern Methodist University',
        info: 'Put Info Here',
        imgSrc: './images/Peruna-Cropped.png',
    },
    {
        name: 'Reveille X',
        college: 'Texas A&M University',
        info: 'Put Info Here',
        imgSrc: './images/reveille-Cropped.png',
    },
    {
        name: 'Sammy the Owl',
        college: 'Rice University',
        info: 'Put Info Here',
        imgSrc: './images/sammy-Cropped.png',
    },
    {
        name: 'Raider Red',
        college: 'Texas Tech University',
        info: 'Put Info Here',
        imgSrc: './images/raider-Cropped.png',
    },
    {
        name: 'Bucky the Buffalo',
        college: 'West Texas A&M University',
        info: 'Put Info Here',
        imgSrc: './images/Bucky-Cropped.png',
    },
    {
        name: 'Scrappy',
        college: 'University of North Texas', 
        info: 'Scrappy is the mascot of the University of North Texas. The name Scrappy wsa chosen by students in 1995.',
        imgSrc: './images/selected.png',
    }

]

const game = JSON.parse(localStorage.getItem('game'));
game.player1.character = characters[0];
game.player2.character = characters[1];



