import { db } from "./firebaseInit"
import {
    collection,
    doc,
    setDoc,
    getDocs,
    deleteDoc as deleteFirestoreDoc,
    updateDoc as updateFirestoreDoc
} from "firebase/firestore"

import { isDocInDb } from "./dbHelpers"

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
    return new Promise( async (resolve, reject) => {
        const parsedDocObj = await isDocInDb(docId) // isDocInDb here is like getDocFromDb because it return the doc object if was found 
        const parsedDocName = parsedDocObj["title"].replace(/\s+/g, '_') // replace whitespaces with underscores
        const docRef = doc(db, collectionName, parsedDocName);    
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
        // delete a doc based on the id field not the document name in firestore
        // thus we need to parse all the documents in firestore in the given collection
        // and once the required id field is found, then we get the name/id of this document in firestore
        // lastly this name of the document will be passed as an argument to the delete function and the document will be deleted
        try {
            const parsedDocObj = await isDocInDb(docId) // isDocInDb here is like getDocFromDb because it return the doc object if was found 
            // name of documents in firestore = value of the title field however whitespaces are replaced with underscores
            const parsedDocName = parsedDocObj["title"].replace(/\s+/g, '_') // replace whitespaces with underscores
            const deletedDocObj = await deleteFirestoreDoc(doc(db, collectionName, parsedDocName))
            resolve(deletedDocObj)
        } catch (error) {
            reject(error)
        }
        
    })
}


export {
    createDoc,
    readDocs,
    updateDoc,
    deleteDoc
}

