// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import {Board} from './board.js';

const b = new Board();

let dark = true;
let s;

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

(function () {

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if(user) {
      playerId = user.uid;
      playerRef = ref(database, `players/${playerId}/setting`);
      get(playerRef).then((snapshot) => {
          if (snapshot.exists()) {
            document.getElementById('mode').href = `${snapshot.val()}.css`;
            s = snapshot.val();
          } else {
            console.log("No data available");
          }
      }).catch((error) => {
        console.error(error);
      });

      playerRef = ref(database, `players/${playerId}`);

      set(playerRef, {
        id: playerId,
        mode: 'null',
        setting: s,
        player1: {
            id: '1',
            character: 'null',
            turn: true
        },
        player2: {
            id: '2',
            character: 'null',
            turn: false,
            difficulty: 'null'
        },
        board: JSON.stringify(b.board)
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

const buttons = document.getElementsByTagName('a');
console.log(buttons);
for(let i = 0; i < buttons.length-1; i++) {
    buttons[i].addEventListener('click', event => {
        playerRef = ref(database, `players/${playerId}/mode`);
        set(playerRef, event.target.id)
    })
}

document.getElementById("light-dark").addEventListener('click', () => {
  if(dark){
    document.getElementById('mode').href = 'light.css';
    playerRef = ref(database, `players/${playerId}/setting`);
    set(playerRef, 'light');
    dark = false;
  } else {
    document.getElementById('mode').href = 'dark.css';
    playerRef = ref(database, `players/${playerId}/setting`);
    set(playerRef, 'dark');
    dark = true;
  }
    

})