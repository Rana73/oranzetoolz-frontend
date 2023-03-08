import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAZIKJRa-bdDZ2WGbzqtM0vBghBIS9aE-Q",
  authDomain: "nu-ems.firebaseapp.com",
  databaseURL: "https://nu-ems.firebaseio.com",
  projectId: "nu-ems",
  storageBucket: "nu-ems.appspot.com",
  messagingSenderId: "528880045940",
  appId: "1:528880045940:web:68a91b2cb89ae5e600a621",
  measurementId: "G-31J50SLVGH"
};

export const fb = firebase.initializeApp(firebaseConfig);
export const fs = fb.firestore();
