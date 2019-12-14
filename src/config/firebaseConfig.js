import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
// const firebaseConfig = {
//     apiKey: "AIzaSyBP-pCijY5txVIDv0hZIpA6aYoOZK35qxY",
//     authDomain: "wireframer-e5e85.firebaseapp.com",
//     databaseURL: "https://wireframer-e5e85.firebaseio.com",
//     projectId: "wireframer-e5e85",
//     storageBucket: "wireframer-e5e85.appspot.com",
//     messagingSenderId: "977237593197",
//     appId: "1:977237593197:web:5c75f254d1400b01748364"
//   };

var firebaseConfig = {
  apiKey: "AIzaSyCENiYkOKcGwiCoU4Ecb1mCk7jhk164PHo",
  authDomain: "hong-zheng-final.firebaseapp.com",
  databaseURL: "https://hong-zheng-final.firebaseio.com",
  projectId: "hong-zheng-final",
  storageBucket: "hong-zheng-final.appspot.com",
  messagingSenderId: "937444998226",
  appId: "1:937444998226:web:bb4f760c052dfae942f38b",
  measurementId: "G-54C8PLL8B9"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;