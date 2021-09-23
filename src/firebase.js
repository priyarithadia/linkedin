import firebase from 'firebase' 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADrXsIfQhLaY7icHxq4jTY5TZFwUgIN0g",
    authDomain: "linkedin-clone-42963.firebaseapp.com",
    projectId: "linkedin-clone-42963",
    storageBucket: "linkedin-clone-42963.appspot.com",
    messagingSenderId: "791179639340",
    appId: "1:791179639340:web:69bea163ce57e823652f89",
    measurementId: "G-KS95F9HQG4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage};
  export default db;