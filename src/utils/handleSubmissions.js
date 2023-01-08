import {
    fetchScratchProject,
    fetchCodestersProject
} from "./consumeAPIs"

import {
    createDoc,
    deleteDoc,
    updateDoc
} from "../firebase/dbCRUD"

import { getAdminDocs } from "../firebase/dbHelpers"

import {
    createScratchDocObj,
    createCodestersDocObj
} from "../models/models"

import {
    isDeepEqual
} from "./utils"

// notice the difference between using (.then(),.catch()) and (async, await)

const handleAddSubmission = async (event, id, platform, admin) => {
    event.preventDefault()
    // TODO FIX DON"T REPEAT YOURSELF
    if (platform.toLowerCase() === "scratch") {
        try {
            const fetchedScratchProject = await fetchScratchProject(id)
            const createdScratchDocObj = createScratchDocObj(fetchedScratchProject, id, admin)
            const firestoreScratchDocName = createdScratchDocObj["title"].replace(/\s+/g, '_'); // replace whitespaces with underscores 
            createDoc("scratch", firestoreScratchDocName, createdScratchDocObj)
                .then(res => {
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
        const adminGames = await getAdminDocs(admin, collectionName)
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

const handleDeleteSubmission = (event, id, platform, admin) => {
    event.preventDefault()
    const collectionName = platform.toLowerCase()
    // ids of scratch projects are always int and stored as number in the db
    if (collectionName === "scratch") id = parseInt(id)
    deleteDoc(collectionName, id)
        .then(res => {
            console.log("Game Deleted", res)
        })
        .catch(error => {
            console.log(error)
        })
}

const handleSignInSubmission = (event, email, password) => {
    event.preventDefault()
    // isAdmin(email, password)
    //     .then(res => {
    //         setAdminLoggedIn(true)
    //     })
    //     .catch(err => {
    //         console.log("err", err)
    //     })
}

const handleSignUpSubmission = (event, email, password) => {
    event.preventDefault()

}



export {
    handleAddSubmission,
    handleUpdateSubmission,
    handleDeleteSubmission,
    handleSignInSubmission,
    handleSignUpSubmission
}