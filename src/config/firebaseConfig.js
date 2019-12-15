import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCENiYkOKcGwiCoU4Ecb1mCk7jhk164PHo",
  authDomain: "hong-zheng-final.firebaseapp.com",
  databaseURL: "https://hong-zheng-final.firebaseio.com",
  projectId: "hong-zheng-final",
  storageBucket: "hong-zheng-final.appspot.com",
  messagingSenderId: "937444998226",
  appId: "1:937444998226:web:bb4f760c052dfae942f38b",
  // measurementId: "G-54C8PLL8B9"
};
firebase.initializeApp(firebaseConfig);

export default firebase;