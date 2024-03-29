function renderGame(board) {
    const currentBoard = board.board;
    for(let i = 0; i < currentBoard.length; i++) {
        for(let j = 0; j < currentBoard[0].length; j++) {
            const row = 'r' + i;
            const col = j;
            const tile = document.getElementById(row).getElementsByTagName('td')[col].getElementsByTagName('div')[0];

            if(currentBoard[i][j] === 1) {
                tile.className = 'rounded-circle bg-danger mx-auto';
            }

            if(currentBoard[i][j] === 2) {
                tile.className = 'rounded-circle bg-warning mx-auto';
            }  
        }
    }
}

function displayCharacter(character, player=1) {
    const selectedp1 = document.getElementById('selectedp1');
    const selectedp2 = document.getElementById('selectedp2')
    const selectedBody1 = document.getElementById('body1');
    const selectedBody2 = document.getElementById('body2');

    if(player === 1) {

        selectedp1.src = characters[character].imgSrc;
        selectedBody1.getElementsByTagName('h5')[0].innerHTML = characters[character].name;
        selectedBody1.getElementsByTagName('p')[0].innerHTML = characters[character].info;
    }
        
    
    if(player === 2) {
        selectedp2.src = characters[character].imgSrc;
        selectedBody2.getElementsByTagName('h5')[0].innerHTML = characters[character].name;
        selectedBody2.getElementsByTagName('p')[0].innerHTML = characters[character].info;
    }
}

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
        info: 'Based in Denton, the Owl of Minerva was inspired by the "Pioneer Women" statue, which has been dubbed "Minerva" by students. The owl made her debut in August of 2017.',
        imgSrc: './images/minerva-Cropped.png',
    },
    {
        name: 'Bevo',
        college: 'University of Texas',
        info: 'Based in Austin, Bevo was originally called "Bo," though his name was changed to "Bevo" at the 1916 Thanksgiving Day game by Ben Dyer, the campus magazine editor.',
        imgSrc: './images/bevo-Cropped.png',
    },
    {
        name: 'Boko the Bobcat',
        college: 'Texas State University',
        info: 'Based in San Marcos, Bokos name was chosen in a "Name the Bobcat" contest held in 1964. The winner was Beth Greenless, a sophomore form Luling.',
        imgSrc: './images/boko-Cropped.png',
    },
    {
        name: 'Joy',
        college: 'Baylor University',
        info: 'Based in Waco, Joy is one of two live bears on the Baylor Campus. Joys full name is "Judge Joy Reyonolds" named after Joy Renolds, the wife of the 11th president of Baylor.',
        imgSrc: './images/joy-Cropped.png',
    },
    {
        name: 'Peruna',
        college: 'Southern Methodist University',
        info: 'Based in Dallas, the name Peruna originated from a well known "cure-all" elixir from the early 1900s. It was very popular during prohibition, since it contained 18% alchohol.',
        imgSrc: './images/peruna-Cropped.png',
    },
    {
        name: 'Reveille X',
        college: 'Texas A&M University',
        info: 'Based in College Station, the first Reveille was hit by a car in January of 1931. The students brought it back to campus, where its popularity sky rocketed, becoming the tradition known today. Revielle X assumed her duties on April 30, 2021.',
        imgSrc: './images/reveille-Cropped.png',
    },
    {
        name: 'Sammy the Owl',
        college: 'Rice University',
        info: 'Based in Houston, Sammy got its name when students from Texas A&M stole a canvas painting of the owl. Students banded together to hire a private detective to find the missing owl. After recovering the painting, the detective coined the name "Sammy."',
        imgSrc: './images/sammy-Cropped.png',
    },
    {
        name: 'Raider Red',
        college: 'Texas Tech University',
        info: 'Based in Lubbock, Raider Red was created as an alternative to "The Masked Rider," who was a masked person riding a live horse. This made it easier to for a mascot to appear in away games and situations where The Masked Rider would not be appropriate.',
        imgSrc: './images/raider-Cropped.png',
    },
    {
        name: 'Bucky the Buffalo',
        college: 'West Texas A&M University',
        info: 'Based in Canyon, Bucky is the alternative to the live mascot, "Thunder the Buffalo." We probably should have used Thunder instead, but I dont think anyone from Canyon will care.',
        imgSrc: './images/bucky-Cropped.png',
    },
]

