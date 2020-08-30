 import firebase from 'firebase';
 
  var config = {
    apiKey: "AIzaSyDfIjU9yio_hDBgT_l70fW2y6Y7d1LkuvQ",
    authDomain: "newchatapp-6c5ca.firebaseapp.com",
    databaseURL: "https://newchatapp-6c5ca.firebaseio.com",
    projectId: "newchatapp-6c5ca",
    storageBucket: "newchatapp-6c5ca.appspot.com",
    messagingSenderId: "593848515107"
  };
  const fire=firebase.initializeApp(config);
  export default fire;