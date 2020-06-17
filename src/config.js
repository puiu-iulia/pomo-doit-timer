import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyDGSuxb8cjmTzvt17ZRhQSGi87EA5LRwr0",
    authDomain: "pomodoit-a20ed.firebaseapp.com",
    databaseURL: "https://pomodoit-a20ed.firebaseio.com",
    projectId: "pomodoit-a20ed",
    storageBucket: "pomodoit-a20ed.appspot.com",
    messagingSenderId: "763515856964",
    appId: "1:763515856964:web:b50f1d92c57674c18fb411",
    measurementId: "G-MQPMHS2WJ1"
}

let app = Firebase.initializeApp(config);
export const db = app.database();