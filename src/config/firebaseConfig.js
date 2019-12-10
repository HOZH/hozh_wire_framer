import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
  apiKey: "AIzaSyAC4M-Ct10pTD7wRYNR9yc8-SFhIo2kPjo",
  authDomain: "hong-zheng-hw3.firebaseapp.com",
  databaseURL: "https://hong-zheng-hw3.firebaseio.com",
  projectId: "hong-zheng-hw3",
  storageBucket: "hong-zheng-hw3.appspot.com",
  messagingSenderId: "91291002343",
  appId: "1:91291002343:web:f653c4db79bc94ad4f0942",
  measurementId: "G-1KVVK4X3FL"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;