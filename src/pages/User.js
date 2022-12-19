import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
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

function SignIn() {
    const signInWithGoogle = () => {
        alert("Please Sign In with your School Account.");
        const provider = new GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };
    return <button onClick={signInWithGoogle}>signIn</button>;
}

function User() {
    const [user] = useAuthState(auth);
    return (
        <>
            {user ? <>{user.email.replace(/@.*$/, "").slice(2)}</> : <SignIn />}
        </>
    );
}

export default User;
