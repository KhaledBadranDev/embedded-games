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
    // TODO FIX DON"T REPEAT YOURSELF
    if (platform.toLowerCase() === "scratch") {
        try {
            const fetchedScratchProject = await fetchScratchProject(id)
            const createdScratchDocObj = createScratchDocObj(fetchedScratchProject, id, admin)
            const firestoreScratchDocName = createdScratchDocObj["title"].replace(/\s+/g, '_'); // replace whitespaces with underscores 
            createDoc("scratch", firestoreScratchDocName, createdScratchDocObj)
                .then(async res => {
                    const updatedAdmin = await updateAdminProjectsFields(admin)
                    setAdmin(updatedAdmin)
                    console.log("res:", res)
                })
                .catch(error => {
                    console.log("error:", error)
                })
        } catch (error) {
            console.log("handleAddSubmission error", error)
        }
    } else if (platform.toLowerCase() === "codesters") {
        fetchCodestersProject(id)
            .then(async fetchedCodestersProject => {
                const createdCodestersDocObj = createCodestersDocObj(fetchedCodestersProject, id, admin)
                const firestoreCodestersDocName = createdCodestersDocObj["title"].replace(/\s+/g, '_'); // replace whitespaces with underscores 
                try {
                    const res = await createDoc("codesters", firestoreCodestersDocName, createdCodestersDocObj)
                    await updateAdminProjectsFields(admin)
                    console.log("res:", res)
                } catch (error) {
                    console.log("error:", error)
                }

            })
            .catch((error) => {
                console.log("handleAddSubmission error", error)
            })
    }
}

const handleUpdateSubmission = async (event, platform, admin) => {
    try {
        // TODO FIX DON"T REPEAT YOURSELF
        event.preventDefault()
        const updatedDocs = []
        const collectionName = platform.toLowerCase()
        const adminGames = await getAdminDocsFromCollection(admin, collectionName)
        if (collectionName === "scratch") {
            // * you can't use async and await in foreach method
            // * thus use for of instead
            for (const game of adminGames) {
                const gameId = game["id"]
                const fetchedUpdatedScratchProject = await fetchScratchProject(gameId)
                const newUpdatedScratchDocObj = createScratchDocObj(fetchedUpdatedScratchProject, gameId, admin)
                // compare objects not the reference using deep comparison
                // if the objects are not equal then sync/update the document in db
                // add the updated doc to the array to track which ones got updated/synced.
                if (!isDeepEqual(newUpdatedScratchDocObj, game)) {
                    await updateDoc(collectionName, gameId, newUpdatedScratchDocObj)
                    updatedDocs.push(newUpdatedScratchDocObj)
                }
            }
        } else if (collectionName === "codesters") {
            // * you can't use async and await in foreach method
            // * thus use for of instead
            for (const game of adminGames) {
                const gameId = game["id"]
                const fetchedCodestersProject = await fetchCodestersProject(gameId)
                const newUpdatedCodestersDocObj = createCodestersDocObj(fetchedCodestersProject, gameId, admin)
                // compare objects not the reference using deep comparison
                // if the objects are not equal then sync/update the document in db
                // add the updated doc to the array to track which ones got updated/synced.
                if (!isDeepEqual(newUpdatedCodestersDocObj, game)) {
                    await updateDoc(collectionName, gameId, newUpdatedCodestersDocObj)
                    updatedDocs.push(newUpdatedCodestersDocObj)
                }
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
    else console.log("Not enough permissions! This project wasn't added by you.")
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