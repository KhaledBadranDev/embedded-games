import axios from "axios";


// notice the difference between using (.then(),.catch()) and (async, await)

const fetchScratchProject = (id) => {
    return new Promise(async (resolve, reject) => {
        // string interpolation syntax: `..... ${var} ..`
        axios.get(`/projects/${id}`) 
            .then(res => {
                if (res.status === 200) { // status 200 is a success response
                    const fetchedData = res.data
                    resolve(fetchedData)
                } else {
                    reject("Couldn't find any scratch project with the given id!")
                }
            })
            .catch(error => {
                reject(error + "\nCouldn't find any scratch project with the given id!")
            })
    })
}

const fetchCodestersProject = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // string interpolation syntax: `..... ${var} ..`
            const fetchedData = await fetch(`https://www.codesters.com/preview/${id}/`, {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                }
            })
            if (fetchedData.status === 200) { // status 200 is a success response
                const fetchedHTMLData = await fetchedData.text()
                resolve(fetchedHTMLData)
            } else {
                reject("Couldn't find any codesters project with the given id!")
            }
        } catch (error) {
            reject(error + "\nCouldn't find any codesters project with the given id!")
        }
    })
}

export {
    fetchScratchProject,
    fetchCodestersProject
}