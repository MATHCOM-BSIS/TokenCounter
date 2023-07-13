import { useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

import "./Admin.css";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKG6aVNcb2mvQNLYQWRHVme3p-dUvO1ks",
    authDomain: "tokenapp-efdd1.firebaseapp.com",
    projectId: "tokenapp-efdd1",
    storageBucket: "tokenapp-efdd1.appspot.com",
    messagingSenderId: "982760664951",
    appId: "1:982760664951:web:45ee7aaa2e198065937b72",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function InputForm() {
    const update = async () => {
        var st_name = document.getElementById("st_name").value;
        var tokenInput = document.getElementById("token").value;

        var docRef = db.collection("token").doc(st_name);
        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.set({
                    name: st_name,
                    token: doc.data().token + parseInt(tokenInput),
                });
            } else {
                alert("User not available");
            }
        });
        document.getElementById("st_name").value = "";
        document.getElementById("token").value = "";
    };
    return (
        <>
            <input type="text" placeholder="Student Name" id="st_name"></input>
            <input type="text" placeholder="Modificaiton" id="token"></input>
            <button onClick={update}>Submit</button>
        </>
    );
}

function Admin() {
    return (
        <>
            <p className="title">ADMIN</p>
            <InputForm />
        </>
    );
}

export default Admin;
