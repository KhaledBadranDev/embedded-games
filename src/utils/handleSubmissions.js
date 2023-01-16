import {
    fetchScratchProject,
    fetchCodestersProject
} from "./consumeAPIs"

import {
    createDoc,
    deleteDoc,
    updateDoc
} from "../firebase/dbCRUD"

import {
    getAdminDocsFromCollection,
    updateAdminProjectsFields,
    isDocInDb,
    doesDocBelongToAdmin
} from "../firebase/dbHelpers"

import {
    isAdmin,
    createAdmin
} from "../firebase/authentication"

import {
    createScratchDocObj,
    createCodestersDocObj,
    createAdminDocObj
} from "../models/models"

import {
    isDeepEqual
} from "./utils"


// notice the difference between using (.then(),.catch()) and (async, await)

const handleAddSubmission = async (event, id, platform, admin, setAdmin) => {
    event.preventDefault()
    return new Promise(async (resolve, reject) => {
        try {
            // avoid having duplicates in db 
            // and disable other admins to change the adminEmail field
            // of a doc that they never added 
            // if the document exist already in the database,
            // then it can't be added again
            const foundDoc = await isDocInDb(id)
            if (foundDoc) 
                reject(`The document with the given id exists already in the database!\nIt has been added by ${foundDoc["adminEmail"]}`)
            else {
                // avoid having case sensitivity bugs
                const collectionName = platform.toLowerCase()
                // consume the right API and fetch the right data based on the collection
                const fetchedProject = collectionName === "scratch" ?
                    await fetchScratchProject(id) :
                    await fetchCodestersProject(id)
                // create the right schema for the document to be added to the db
                const createdDocObj = collectionName === "scratch" ?
                    createScratchDocObj(fetchedProject, id, admin) :
                    createCodestersDocObj(fetchedProject, id, admin)
                //naming the document in firestore db based on the title field 
                const firestoreDocName = createdDocObj["title"] !== undefined && createdDocObj["title"] !== null ? createdDocObj["title"].replace(/\s+/g, '_') : createdDocObj["id"]// replace whitespaces with underscores         
                // finally create/add/write this document to firestore db 
                const createdDocInDb = await createDoc(collectionName, firestoreDocName, createdDocObj)
                // updated admin details/info based after adding a document to db
                const updatedAdmin = await updateAdminProjectsFields(admin)
                setAdmin(updatedAdmin)
                resolve(createdDocInDb)
            }
        } catch (error) {
            reject(error)
        }
    })

}

const handleUpdateSubmission = async (event, platform, admin) => {
    event.preventDefault()
    return new Promise(async (resolve, reject) => {
        try {
            const updatedDocs = []
            const collectionName = platform.toLowerCase()
            const adminGames = await getAdminDocsFromCollection(admin, collectionName)
    
            // * you can't use async and await in foreach method
            // * thus use for of instead
            for (const game of adminGames) {
                const gameId = game["id"]
                const fetchedUpdatedProject = collectionName === "scratch" ?
                    await fetchScratchProject(gameId) :
                    await fetchCodestersProject(gameId)
    
                const newUpdatedDocObj = collectionName === "scratch" ?
                    createScratchDocObj(fetchedUpdatedProject, gameId, admin) :
                    createCodestersDocObj(fetchedUpdatedProject, gameId, admin)
    
                if (!isDeepEqual(newUpdatedDocObj, game)) {
                    await updateDoc(collectionName, gameId, newUpdatedDocObj)
                    updatedDocs.push(newUpdatedDocObj["id"])
                }
            }
            resolve(updatedDocs)
        } catch (error) {
            reject(error)
        }
    })
}

const handleDeleteSubmission = (event, id, platform, admin, setAdmin) => {
    event.preventDefault()
    return new Promise(async (resolve, reject) => {
        try {
            // if the document doesn't exist in the database, then it can't be deleted
            const foundDoc = await isDocInDb(id)
            if (!foundDoc) reject("The document with the given id can't be deleted because it doesn't exist in the database!")

            const collectionName = platform.toLowerCase()
            // ids of scratch projects are always int and stored as number in the db
            if (collectionName === "scratch") {
                // scratch platform provides ids that consists of digits only
                // To check if a string contains only numbers in JavaScript, call the test() method on this regular expression:
                //  ^\d+$. The test() method will return true if the string contains only numbers.
                //  Otherwise, it will return false.
                if (!(/^\d+$/.test(id))) reject("Ids of scratch projects are only digits! Maybe you choose the wrong platform.")
                else id = parseInt(id)
            }

            // if the project was not added by this admin then he/she is not allowed to delete it.
            if (doesDocBelongToAdmin(id, admin)) {
                deleteDoc(collectionName, id)
                    .then(async res => {
                        const updatedAdmin = await updateAdminProjectsFields(admin)
                        setAdmin(updatedAdmin)
                        resolve(res)
                    })
                    .catch(error => reject(error))
            }
            else reject(`Not enough permissions! This project wasn't added by you.\nIt has been added by ${foundDoc["adminEmail"]}`)
        } catch (error) {
            reject(error)
        }
    })
}

const handleSignInOrUpSubmission = (event, wantToSignedUp, email, password, setAdmin, setIsAdminSignedIn) => {
    event.preventDefault()
    return new Promise(async (resolve, reject) => {
        try {
            let res = null
            if (wantToSignedUp) res = await handleSignUpSubmission(email, password, setAdmin, setIsAdminSignedIn)
            else res = await handleSignInSubmission(email, password, setAdmin, setIsAdminSignedIn)
            resolve(res)
        } catch (error) {
            reject(error)
        }
    })
}

const handleSignInSubmission = (email, password, setAdmin, setIsAdminSignedIn) => {
    return new Promise((resolve, reject) => {
        isAdmin(email, password)
            .then(adminData => {
                // update last Sign In time in db
                // create new admin object, but that would miss up the projectsIds and numberOfProjects fields
                // to resolve this issue we need to refill these fields again
                const newAdminDocObj = createAdminDocObj(adminData)
                updateAdminProjectsFields(newAdminDocObj)
                    .then(updatedAdminDocObj => {
                        const AdminDocObjName = updatedAdminDocObj["email"]
                        setAdmin(updatedAdminDocObj)
                        setIsAdminSignedIn(true)
                        createDoc("admins", AdminDocObjName, updatedAdminDocObj)
                            .then(res => resolve(res))
                            .catch(error => reject(error))
                    })
                    .catch(error => reject(error));
            })
            .catch(error => {
                reject(error)
            })
    })
}

const handleSignUpSubmission = (email, password, setAdmin, setIsAdminSignedIn) => {
    return new Promise((resolve, reject) => {
        createAdmin(email, password)
            .then(adminData => {
                setIsAdminSignedIn(true)
                const createdAdminDocObj = createAdminDocObj(adminData)
                const AdminDocObjName = createdAdminDocObj["email"]
                setAdmin(createdAdminDocObj)
                createDoc("admins", AdminDocObjName, createdAdminDocObj)
                    .then(res => resolve(res))
                    .catch(error => reject(error))
            })
            .catch(error => {
                reject(error)
            })
    })

}



export {
    handleAddSubmission,
    handleUpdateSubmission,
    handleDeleteSubmission,
    handleSignInOrUpSubmission
}