import {
    fetchScratchProject,
    fetchCodestersProject
} from "./consumeAPIs"

import {
    createDoc,
    deleteDoc
} from "../firebase/dbCRUD"

import {
    createScratchDocObj,
    createCodestersDocObj
} from "../models/models"

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

    // const [scratchGameFields] = useAxios(`/projects/${id}`) // string interpolation syntax: `..... ${var} ..`
    // console.log("scratchGameFields", scratchGameFields)
    // const [fetchedCodestersProjectFields] =  useFetch(`https://www.codesters.com/preview/${id}/`) // string interpolation syntax: `..... ${var} ..`
    // console.log("fetchedCodestersProjectFields", fetchedCodestersProjectFields)

    // const createdScratchGameObj = {}
    // const firestoreGameDocName = createdScratchGameObj["title"].replace(/\s+/g, '_'); // replace whitespaces with underscores 
    // createDoc("scratch", firestoreGameDocName, createdScratchGameObj)
    //     .then(res => {
    //         console.log("res:", res)
    //     })
    //     .catch(error => {
    //         console.log("error:", error)
    //     })
}

const handleUpdateSubmission = (event, id, platform, admin) => {

}

const handleDeleteSubmission = (event, id, platform, admin) => {
    event.preventDefault()
    const collectionName = platform.toLowerCase()
    deleteDoc(collectionName, id)
        .then(res => {
            console.log("Game Deleted", res)
        })
        .catch(error => {
            console.log(error)
        })
}


export {
    handleAddSubmission,
    handleUpdateSubmission,
    handleDeleteSubmission
}