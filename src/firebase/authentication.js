//Resource/docs: https://firebase.google.com/docs/auth/web/password-auth?authuser=1

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseInit"

const isAdmin = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // successfully Signed in 
                const user = userCredential.user;
                resolve(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                reject(errorCode)
            });
    })
}

export default isAdmin