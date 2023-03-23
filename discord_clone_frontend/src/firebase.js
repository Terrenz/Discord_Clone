import firebase from "firebase";

const firebaseConfig = {
 apiKey: "AIzaSyDgtP7PcQ8CO3zIqgtc4spW04B2gVQEg-I",
 authDomain: "discord-clone-a6469.firebaseapp.com",
 projectId: "discord-clone-a6469",
 storageBucket: "discord-clone-a6469.appspot.com",
 messagingSenderId: "511424022817",
 appId: "1:511424022817:web:eb1f6acdfc7aadebe09660",
 measurementId: "G-LN8WM2MLFK"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;