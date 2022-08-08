// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import {Board} from './board.js';

const board = new Board();

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

document.getElementById('create').addEventListener('click', () => {
  let playerId;
  let playerRef;

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if(user) {
      playerId = user.uid;
      playerRef = ref(database, `players/${playerId}/mode`);
      set(playerRef, 'create');

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
})

document.getElementById('join').addEventListener('click', () => {
  let playerId;
  let playerRef;
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if(user) {
      playerId = user.uid;
      playerRef = ref(database, `players/${playerId}/mode`);
      set(playerRef, 'join');

    } else {
      console.log('user signed out');
    }
  })

  signInAnonymously(auth)
    .then(() => {
      console.log('signed In');
      document.getElementById('cont1').innerHTML = "<h1 class=\"py-5 my-5 text-white display-1\">Collegiate 4</h1>" +
      "<div class=\"row g-3 justify-content-center\">" +
      "<div class=\"col-auto\"><label for=\"inputPassword6\" class=\"col-form-label text-white\"><h1>Room ID: </h1></label></div>" + 
      "<div class=\"col-auto\"><input type=\"text\" id=\"inputPassword6\" class=\"form-control-lg\" aria-describedby=\"passwordHelpInline\"></div>" +
      "<div class=\"col-auto\"><span id=\"passwordHelpInline\" class=\"form-text\"></span></div></div>" +
      "<button type=\"submit\" class=\"btn btn-dark\">Submit</button>";

      document.getElementsByTagName('button')[0].addEventListener('click', () => {
        const roomId = document.getElementById('inputPassword6').value;
        console.log(document.getElementById('inputPassword6').value);
        playerRef = ref(database, `players/${roomId}/mode`);
        get(playerRef).then((snapshot) => {
          if (snapshot.exists()) {
              if(snapshot.val() == 'create') {
                console.log(snapshot.val());
                playerRef = ref(database, `players/${playerId}/mode`);
                set(playerRef, 'join');
                playerRef = ref(database, `players/${playerId}/roomID`);
                set(playerRef, roomId);
                location.href = './online-game.html';
              }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          
          console.error(error);
        });
        
      })
    })
    .catch((error) => { 
      console.log(error.code, error.message);
    });
})

const table = document.getElementById('table');
const cols = table.getElementsByTagName('td');

let p1Turn = true;

for(let i = 0; i < cols.length; i++) {
  cols[i].addEventListener('mouseover', (event) => {
    if(board.getStatus())
      return;

    const col = event.target.id;
    const id = 'h' + col[1];
    const tileDiv = document.getElementById(id).getElementsByTagName('div')[0];

    if(p1Turn)
        tileDiv.className = 'rounded-circle bg-danger mx-auto';
    else 
        tileDiv.className = 'rounded-circle bg-warning mx-auto';
})

cols[i].addEventListener('mouseout', (event) => {
    const col = event.target.id;
    const id = 'h' + col[1];
    const tileDiv = document.getElementById(id).getElementsByTagName('div')[0];
    tileDiv.className = 'rounded-circle bg-danger mx-auto invisible';
})

cols[i].addEventListener('click', (event) => {
    const col = event.target.id[1];
    if(p1Turn)
        board.placeTile(col, 1);
    else
        board.placeTile(col, 2);

    renderGame(board);
    p1Turn = !p1Turn;
    if(board.getStatus() === 1) {
      const menuButton = document.getElementById('menu');
      const rematchButton = document.getElementById('rematch');
      rematchButton.className = 'btn btn-dark fs-4 mx-5 mt-4';
      document.getElementById('winner').innerHTML = 'Player 1 Wins!!!';
      document.getElementById('winner').className = 'text-center text-danger';
      menuButton.className = 'btn btn-dark fs-4 mt-4';
      removeListeners();
    }
    else if(board.getStatus() === 2) {
      const menuButton = document.getElementById('menu');
      menuButton.className = 'btn btn-dark fs-4 mt-4';
      const rematchButton = document.getElementById('rematch');
      rematchButton.className = 'btn btn-dark fs-4 mx-5 mt-4';
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


