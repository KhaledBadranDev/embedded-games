//Resource/docs: https://firebase.google.com/docs/auth/web/password-auth?authuser=1

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebaseInit"


const isAdmin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            // successfully Signed in                
            const user = userCredential.user;
            resolve(user)
        } catch (error) {
            // couldn't sign in
            const errorCode = error.code;
            reject(errorCode)
        }
    })
}


const createAdmin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // successfully Signed up                
            const user = userCredential.user;
            // add user to admin collection in db
            // const createdUserDoc = await 
            resolve(user)
        } catch (error) {
            // couldn't sign up
            const errorCode = error.code;
            reject(errorCode)
        }
    })
}

export {
    createAdmin,
    isAdmin,
} 