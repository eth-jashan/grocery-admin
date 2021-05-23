import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB7WOvpxFTPd06DEDiWax_JX-rzRi5-n9A",
    authDomain: "grocery-app-6bdd0.firebaseapp.com",
    databaseURL: "https://grocery-app-6bdd0-default-rtdb.firebaseio.com",
    projectId: "grocery-app-6bdd0",
    storageBucket: "grocery-app-6bdd0.appspot.com",
    messagingSenderId: "708472397556",
    appId: "1:708472397556:web:a4a82a699aa85f516608a1"

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default firebase