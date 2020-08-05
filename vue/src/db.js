import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }