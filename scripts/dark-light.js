import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";

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