import { readDocs } from "./dbCRUD"

const getAdminDocs = (admin, collection) => {
    return new Promise(async (resolve, reject) => {
        try {
            // step1 create an empty array that would be filled with all games added by this admin
            const adminGames = []
            // step2 get all documents in the given collection
            const allGames = await readDocs(collection)
            // step3 filter these documents by the "admin" field 
            // and add the ones that belong to this admin to the array
            allGames.forEach(game => {
                if (game["admin"] === admin) adminGames.push(game)
            })
    
            // finally return the array
            resolve(adminGames)
        } catch (error) {
            reject(error)
        }
    })
}


/**
 * check if a document exists in the database or not
 * @param {string} collectionName name of the collection where the document is stored.
 * @param {*} docId id of the document that will be checked.It can be number as well as string depending on the collection.
 * @returns {promise} searched document as an object if id exists in db, else false or error.
 * @author Khaled Badran (Programming Gym) <gym4programming@gmail.com>
 */
const isDocInDb = (collectionName, docId) => {
    return new Promise((resolve, reject) => {
        let docsArr = []
        readDocs(collectionName)
            .then(parsedGamesArr => {
                docsArr = [...parsedGamesArr];
                // [...arr] this is called javascript spread operator
                // it is used for deep copying/cloning
                for (const [index,docObj] of docsArr.entries()) {
                    if (docObj["id"] === docId) {
                        console.log("yes")
                        resolve(docObj);
                        break
                    }
                    // if we reached the last element/document of the array/db and the document isn't found
                    // that means this required document doesn't exist in db 
                    if (index === docsArr.length - 1 && docObj["id"] !== docId) { 
                        reject(false);
                        break
                    }
                }
            })
            .catch(error => {
                reject(false)
            })
    })
}

export {
    getAdminDocs,
    isDocInDb
}