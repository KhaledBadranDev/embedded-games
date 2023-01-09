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
    try {
        event.preventDefault()
        // avoid having duplicates in db 
        // and disable other admins to change the adminEmail field
        // of a doc that they never added 
        // if the document exist already in the database,
        // then it can't be added again
        const foundDoc = await isDocInDb(id)
        if (foundDoc) {
            console.log(`The document with the given id exists already in the database!\nIt has been added by ${foundDoc["adminEmail"]}`)
            return
        }
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
        const firestoreDocName = createdDocObj["title"].replace(/\s+/g, '_'); // replace whitespaces with underscores         
        // finally create/add/write this document to firestore db 
        const createdDocInDb = await createDoc(collectionName, firestoreDocName, createdDocObj)
        // updated admin details/info based after adding a document to db
        const updatedAdmin = await updateAdminProjectsFields(admin)
        setAdmin(updatedAdmin)
        console.log("res:", createdDocInDb)
    } catch (error) {
        console.log("handleAddSubmission error", error)
    }

}

const handleUpdateSubmission = async (event, platform, admin) => {
    try {
        event.preventDefault()
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
                updatedDocs.push(newUpdatedDocObj)
            }
        }
        console.log("updatedDocs:", updatedDocs)
    } catch (error) {
        console.log(error)
    }
}

const handleDeleteSubmission = async (event, id, platform, admin, setAdmin) => {
    event.preventDefault()
    // if the document doesn't exist in the database, then it can't be deleted
    const foundDoc = await isDocInDb(id)
    if (!foundDoc) {
        console.log("The document with the given id can't be deleted because it doesn't exist in the database!")
        return
    }

    const collectionName = platform.toLowerCase()
    // ids of scratch projects are always int and stored as number in the db
    if (collectionName === "scratch") id = parseInt(id)

    // if the project was not added by this admin then he/she is not allowed to delete it.
    if (doesDocBelongToAdmin(id, admin)) {
        deleteDoc(collectionName, id)
            .then(async res => {
                const updatedAdmin = await updateAdminProjectsFields(admin)
                setAdmin(updatedAdmin)
                console.log("Game Deleted", res)
            })
            .catch(error => {
                console.log(error)
            })
    }
    else console.log(`Not enough permissions! This project wasn't added by you.\nIt has been added by ${foundDoc["adminEmail"]}`)
}

const handleSignInOrUpSubmission = (event, wantToSignedUp, email, password, setAdmin, setIsAdminSignedIn) => {
    event.preventDefault()
    if (wantToSignedUp) handleSignUpSubmission(email, password, setAdmin, setIsAdminSignedIn)
    else handleSignInSubmission(email, password, setAdmin, setIsAdminSignedIn)
}

const handleSignInSubmission = (email, password, setAdmin, setIsAdminSignedIn) => {
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
                        .then(res => console.log(res))
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error));
        })
        .catch(err => {
            console.log("err", err)
        })
}

const handleSignUpSubmission = (email, password, setAdmin, setIsAdminSignedIn) => {
    createAdmin(email, password)
        .then(adminData => {
            setIsAdminSignedIn(true)
            const createdAdminDocObj = createAdminDocObj(adminData)
            const AdminDocObjName = createdAdminDocObj["email"]
            setAdmin(createdAdminDocObj)
            createDoc("admins", AdminDocObjName, createdAdminDocObj)
                .then(res => console.log(res))
                .catch(error => console.log(error))
        })
        .catch(err => {
            console.log("err", err)
        })
}



export {
    handleAddSubmission,
    handleUpdateSubmission,
    handleDeleteSubmission,
    handleSignInOrUpSubmission
}