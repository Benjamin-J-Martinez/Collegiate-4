// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import {Board} from './board.js';

const game = JSON.parse(sessionStorage.getItem("game"));
//game.board = new Board();

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

(function () {

  let playerId;
  let playerRef;

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if(user) {
      playerId = user.uid;
      playerRef = ref(database, `players/${playerId}`);

      

      set(playerRef, {
        id: playerId,
        turn: 'false',
        //character: game.player1.character,
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
