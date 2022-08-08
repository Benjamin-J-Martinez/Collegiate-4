import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import {Board} from './board.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUm01C5N8w-gFoVRww9l2xdEMOKPL5du4",
  authDomain: "collegiate-4.firebaseapp.com",
  databaseURL: "https://collegiate-4-default-rtdb.firebaseio.com",
  projectId: "collegiate-4",
  storageBucket: "collegiate-4.appspot.com",
  messagingSenderId: "32314001392",
  appId: "1:32314001392:web:98641330c025deb24f3f35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let playerId;
let playerRef;

let difficulty;
const board = new Board();

(function () {

  onAuthStateChanged(auth, (user) => {
    if(user) {
      playerId = user.uid;

      playerRef = ref(database, `players/${playerId}/setting`);
      get(playerRef).then((snapshot) => {
          if (snapshot.exists()) {
            document.getElementById('mode').href = `${snapshot.val()}.css`;
          } else {
            console.log("No data available");
          }
      }).catch((error) => {
        console.error(error);
      });

      playerRef = ref(database, `players/${playerId}/player1/character`);
      get(playerRef).then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById('player1').src = JSON.parse(snapshot.val()).imgSrc;
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
      playerRef = ref(database, `players/${playerId}/player2/character`);
        get(playerRef).then((snapshot) => {
            if (snapshot.exists()) {
                document.getElementById('player2').src = JSON.parse(snapshot.val()).imgSrc;
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

      playerRef = ref(database, `players/${playerId}/player2/difficulty`);
      get(playerRef).then((snapshot) => {
        if (snapshot.exists()) {
            difficulty = snapshot.val();
            console.log(difficulty);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });


    } else {
      console.log('user signed out');
    }
  })

  signInAnonymously(auth)
    .then(() => {
      console.log('signed In');
    })
    .catch((error) => { 
      console.log(error.code, error.message);
    });

      console.log(difficulty);

})();


const table = document.getElementById('table');
const cols = table.getElementsByTagName('td');

let p1Turn = true;
let numTurns = 1;

for(let i = 0; i < cols.length; i++) {
    cols[i].addEventListener('mouseover', (event) => {
        if(board.getStatus())
            return;
            
        const col = event.target.id;
        const id = 'h' + col[1];

        if(p1Turn)
            document.getElementById(id).className = 'rounded-circle bg-danger mx-auto';
        else 
            document.getElementById(id).className = 'rounded-circle bg-warning mx-auto';
    })


    cols[i].addEventListener('mouseout', (event) => {
        const col = event.target.id;
        const id = 'h' + col[1];
        document.getElementById(id).className = 'rounded-circle bg-danger mx-auto invisible';
    })

    cols[i].addEventListener('click', (event) => {
        const col = event.target.id[1];
        board.placeTile(col, 1);
        numTurns++;
        
        if(numTurns <= 4 && difficulty !== 'hard'){
            let randCol = Math.floor(Math.random() * 7);
            board.placeTile(randCol, 2);
            numTurns++;
        } else {
            switch(difficulty) {
                case 'easy':
                   board.placeTile(makeEasyMove(), 2);
                   break;
                case 'normal':
                    board.placeTile(makeNormalMove(), 2);
                    break;
                case 'hard':
                    board.placeTile(makeHardMove(), 2);
                    break;
            }
            
            numTurns++;
        }
        

        renderGame(board);

        if(board.getStatus() === 1) {
          const menuButton = document.getElementById('menu');
          document.getElementById('winner').innerHTML = 'Player 1 Wins!!!';
          document.getElementById('winner').className = 'text-center text-danger';
          menuButton.className = 'btn btn-dark fs-4 mt-4';
          removeListeners();
        }
        else if(board.getStatus() === 2) {
            const menuButton = document.getElementById('menu');
            menuButton.className = 'btn btn-dark fs-4 mt-4';
            document.getElementById('winner').innerHTML = 'Player 2 Wins!!!';
            document.getElementById('winner').className = 'text-center text-warning';
            removeListeners();
        }
            
    })
}


function removeListeners() {
    for(let i = 0; i < cols.length; i++) {
        const col = cols[i].id;
        const id = 'h' + col[1];
        document.getElementById(id).className = 'rounded-circle bg-danger mx-auto invisible';
        cols[i].replaceWith(cols[i].cloneNode(true));
    }
}

function makeEasyMove() {
    let strBoard = JSON.stringify(board.board);
    let clone = new Board(JSON.parse(strBoard));

    const valid = [0, 0, 0, 0, 0, 0, 0];

    let maxConts = 0;
    let bestCol = -1;

    let randNum = Math.random() * 1;

    for(let i = 0; i < 7; i++)
    {
        clone = new Board(JSON.parse(strBoard));

        valid[i] = clone.placeTile(i, 2);
        if(clone.getStatus() == 2) {
            if(randNum <= 0.40) {
               return i; 
            }
            else {
                return Math.floor(Math.random() * 7);
            }
        }
            

        let continues = 7;
        for(let j = 0; j < 7; j++)
        {
            const strClone2 = JSON.stringify(clone.board);
            const clone2 = new Board(JSON.parse(strClone2));
            let valid2 = clone2.placeTile(j, 1);

            if(clone2.getStatus() == 1 && valid2) {
                continues--;
            }
                
        }

        if(continues > maxConts)
        {
            maxConts = continues;
            bestCol = i;
        }
    }

    if(valid[bestCol] && randNum <= 0.50) {
        return bestCol;
    }   
    else
    {
        for(let i = 0; i < 7; i++)
        {
            if(valid[i])
                return i;
        }
    }

    return bestCol;
}

function makeNormalMove() {
    let strBoard = JSON.stringify(board.board);
    let clone = new Board(JSON.parse(strBoard));

    const valid = [0, 0, 0, 0, 0, 0, 0];

    let maxConts = 0;
    let bestCol = -1;

    for(let i = 0; i < 7; i++)
    {
        clone = new Board(JSON.parse(strBoard));

        valid[i] = clone.placeTile(i, 2);
        if(clone.getStatus() == 2)
            return i;

        let continues = 7;
        for(let j = 0; j < 7; j++)
        {
            const strClone2 = JSON.stringify(clone.board);
            const clone2 = new Board(JSON.parse(strClone2));
            let valid2 = clone2.placeTile(j, 1);

            if(clone2.getStatus() == 1 && valid2) {
                continues--;
            }
                
        }

        if(continues > maxConts)
        {
            maxConts = continues;
            bestCol = i;
        }
    }

    if(valid[bestCol])
        return bestCol;
    else
    {
        for(let i = 0; i < 7; i++)
        {
            if(valid[i])
                return i;
        }
    }

    return bestCol;
}

function makeHardMove() {
    let strBoard = JSON.stringify(board.board);
    let clone = new Board(JSON.parse(strBoard));

    const valid = [0, 0, 0, 0, 0, 0, 0];
    const bestCol = [0, 100, 0]; //first index is the column and the second index is the number of possible losses, and third column is the possible wins.

    for(let i = 0; i < 7; i++) {
        clone = new Board(JSON.parse(strBoard));

        valid[i] = clone.placeTile(i, 2);
        console.log(valid[i]);
        if(!valid[i]) {
            continue;
        }
            
        if(clone.getStatus() == 2){
            return i;
        }
            

        let wins = 0;
        let losses = 0;
        let total = 0;

        for(let j = 0; j < 7; j++)
        {
            const strClone2 = JSON.stringify(clone.board);
            const clone2 = new Board(JSON.parse(strClone2));

            if(clone2.placeTile(j, 1))
                total++;
            else
                continue;

            if(clone2.getStatus() == 1) {
                losses++;
            }

            for(let k = 0; k < 7; k++) {
                const strClone3 = JSON.stringify(clone2.board);
                const clone3 = new Board(JSON.parse(strClone3));

                if(clone3.placeTile(j, 2))
                    total++;
                else
                    continue;

                if(clone3.getStatus() == 2) {
                    wins++;
                }
                
                for(let l = 0; l < 7; l++) {
                    const strClone4 = JSON.stringify(clone3.board);
                    const clone4 = new Board(JSON.parse(strClone4));
    
                    if(clone4.placeTile(l, 1))
                        total++;
                    else
                        continue;
    
                    if(clone4.getStatus() == 1) {
                        losses++;
                    } 
                }
            }   

        }

        if(losses < bestCol[1]) {
            bestCol[0] = i;
            bestCol[1] = losses;
            bestCol[2] = wins;
        }

        if(losses === bestCol[1] && wins > bestCol[2]) {
            bestCol[0] = i;
            bestCol[1] = losses;
            bestCol[2] = wins;
        }
    }

    if(valid[bestCol[0]])
        return bestCol[0];
    else{
        return Math.floor(Math.random() * 7);
    }
        
}
