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
    return <button onClick={signInWithGoogle} className="signIn">Sign in With Google</button>;
}

function Token() {
    const [user] = useAuthState(auth);
    const studentNumber = user.email.replace(/@.*$/, "").slice(2);

    const [tokenValue, setTokenValue] = useState("");

    var docRef = db.collection("token").doc(studentNumber);
    const addNew = async () => {
        await docRef.set({
            stnum: studentNumber,
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
    return (<div className="userToken">
        <p className="userToken__num">{tokenValue}</p>
        <p className="userToken__text">tokens</p>
    </div>);
}

function Rank() {
    const Ref = db.collection("token");
    const query = Ref.orderBy("token", "desc").limit(5);
    const [tokens] = useCollectionData(query, { idField: "id" });
    return (
        <div className="ranking">
            <p className="ranking__title">Token Ranking</p>
            {tokens &&
                tokens.map((Token, index) => (
                    <p className="ranking__item">
                        {index+1}. {Token.stnum} - {Token.token} Tokens
                    </p>
                ))}
        </div>
    );
}

function User() {
    const [user] = useAuthState(auth);
    return (
        <>
            {user ? (
                <>
                    <p className="userName">{user.email.replace(/@.*$/, "").slice(2)} {user.displayName.slice(5)}</p>
                    <Token />
                    <div className="divider"></div>
                    <Rank />
                </>
            ) : (
                <SignIn />
            )}
        </>
    );
}

export default User;