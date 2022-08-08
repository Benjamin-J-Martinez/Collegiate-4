import {Board} from './board.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

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
  
  })();

const table = document.getElementById('table');
const cols = table.getElementsByTagName('td');

let p1Turn = true;

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
        if(p1Turn)
            board.placeTile(col, 1);
        else
            board.placeTile(col, 2);

        renderGame(board);
        p1Turn = !p1Turn;
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
