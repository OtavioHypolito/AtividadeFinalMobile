import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA4TtrfjqQ2l0FnJlSy7DEjr84Y6jqWvSE",
    authDomain: "atividadefinal-71c5a.firebaseapp.com",
    databaseURL: "https://atividadefinal-71c5a-default-rtdb.firebaseio.com",
    projectId: "atividadefinal-71c5a",
    storageBucket: "atividadefinal-71c5a.appspot.com",
    messagingSenderId: "380650804841",
    appId: "1:380650804841:web:527c601b070050dc40f4f8"
  };

 export const firebaseApp = firebase.initializeApp(firebaseConfig);
 export const cadastrosContasDB = firebaseApp.database().ref('cadastros');



