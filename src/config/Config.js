import  firebase from 'firebase';

const settings = {timestampsInSnapshots : true};

var firebaseConfig = {
    apiKey: "AIzaSyCbL8Azqk1b_4oJS9SyfzrHeQrFVWnK5iU",
    authDomain: "reactfirebaseapp-297406.firebaseapp.com",
    databaseURL: "https://reactfirebaseapp-297406.firebaseio.com",
    projectId: "reactfirebaseapp-297406",
    storageBucket: "reactfirebaseapp-297406.appspot.com",
    messagingSenderId: "746312285860",
    appId: "1:746312285860:web:a7ad1c620a38cc9ac37031",
    measurementId: "G-PMSVXRD71F"
  };

  firebase.initializeApp(firebaseConfig);
  //firebase.firestone().settings(settings);
  firebase.firestore().settings(settings)

  export default firebase;