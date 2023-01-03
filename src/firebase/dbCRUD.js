import { db } from "./firebaseInit"
import {
    collection,
    doc,
    setDoc,
    getDocs,
    deleteDoc as deleteFirestoreDoc,
    updateDoc as updateFirestoreDoc
} from "firebase/firestore"

// documentation1: https://firebase.google.com/docs/database/web/read-and-write?authuser=1
// documentation2: https://firebase.google.com/docs/firestore/manage-data/delete-data

const createDoc = (collectionName, docId, docObj) => {
    return new Promise((resolve, reject) => {
        setDoc(doc(db, collectionName, docId), docObj)
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const readDocs = (collectionName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const collectionRef = collection(db, collectionName)
            const docsQuerySnapshot = await getDocs(collectionRef)
            const docsArr = []
            docsQuerySnapshot.docs.forEach(doc => {
                //doc.id is the name of the document
                docsArr.push(doc.data())
            })
            resolve(docsArr)
        } catch (error) {
            reject(error)
        }
    })
}

const updateDoc = (collectionName, docId, newDocObj) => {
    const docRef = doc(db, collectionName, docId);
    return new Promise((resolve, reject) => {
        updateFirestoreDoc(docRef, newDocObj)
            .then(res => {
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const deleteDoc = (collectionName, docId) => {
    return new Promise(async (resolve, reject) => {
        console.log(docId)
        console.log(collectionName)
        deleteFirestoreDoc(doc(db, collectionName, docId))
        // collection(db, collectionName).doc(docId).delete()
            .then(res => {
                console.log("done")
                resolve(res)
            })
            .catch(error => {
                reject(error)
            })
    })
}


export {
    createDoc,
    readDocs,
    updateDoc,
    deleteDoc
}

