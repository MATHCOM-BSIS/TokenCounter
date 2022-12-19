import { useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./User.css";

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
const auth = firebase.auth();
const db = firebase.firestore();

function SignIn() {
    const signInWithGoogle = () => {
        alert("Please Sign In with your School Account.");
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };
    return <button onClick={signInWithGoogle}>signIn</button>;
}

function Token() {
    const [user] = useAuthState(auth);
    const studentNumber = user.email.replace(/@.*$/, "").slice(2);

    const [tokenValue, setTokenValue] = useState("");

    var docRef = db.collection("token").doc(studentNumber);
    const addNew = async () => {
        await docRef.set({
            token: 0,
        });
    };
    docRef.get().then((doc) => {
        if (doc.exists) {
            setTokenValue(doc.data().token);
            console.log(tokenValue);
        } else {
            addNew();
            setTokenValue(0);
            console.log("Add new");
        }
    });
    return <p>{tokenValue} tokens</p>;
}

function User() {
    const [user] = useAuthState(auth);
    return (
        <>
            {user ? (
                <>
                    <p>{user.email.replace(/@.*$/, "").slice(2)}</p>
                    <Token />
                </>
            ) : (
                <SignIn />
            )}
        </>
    );
}

export default User;
