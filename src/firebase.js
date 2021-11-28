// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyAe-mWHBzyyXVQ93CwMKapNG4f4Dv7cP-o",
    authDomain: "daily-wage-workers.firebaseapp.com",
    projectId: "daily-wage-workers",
    storageBucket: "daily-wage-workers.appspot.com",
    messagingSenderId: "506619901212",
    appId: "1:506619901212:web:dcef0ad04e0261cb2036d9",
    measurementId: "G-B9J4HHKG8Y"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebaseApp.auth();

const googlelogin = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();

const storage = firebase.storage

export {auth,googlelogin,db,storage}