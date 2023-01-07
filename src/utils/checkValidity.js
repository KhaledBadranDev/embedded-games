import { readDocs } from "../firebase/dbCRUD"
// import useAxios from "../hooks/useAxios"


/**
 * check if an id valid or not
 * valid id fulfills following requirements:
 * 1. the format is accurate 
 * 2. the id actually exists on scratch or codesters platform 
 * @param {string} platform name of the platform where the project/game with the given id exists.
 * @param {*} id id of the project/game that should be checked. It can be number as well as string depending on the platform.
 * @returns {Array} array of either one element true, else 2 elements - false and the error message 
 * @author Khaled Badran (Programming Gym) <gym4programming@gmail.com>
 */
const isValidId = (id, platform) => {
    // accurate format means:
    // only numbers for a scratch game 
    // and string for a codesters game
    if (platform === "scratch") {
        if (typeof id !== "number")
            return [false, "id is not a number"]
        else {
            // const [ScratchGameFields] = useAxios(`/projects/${id}`)
            // axios.get()
            // .then(res => {
            //     const data = res.data;
            //     setData(data);
            // })
            // console.log(ScratchGameFields)
        }
        return [true]
    } else if (platform === "codesters") {

    }

    return [false]
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
    isValidId,
    isDocInDb
}