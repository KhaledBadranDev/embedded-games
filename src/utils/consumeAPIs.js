import axios from "axios";


// notice the difference between using (.then(),.catch()) and (async, await)

const fetchScratchProject = (id) => {
    return new Promise(async (resolve, reject) => {
        // string interpolation syntax: `..... ${var} ..`
        axios.get(`https://api.scratch.mit.edu/projects/${id}`)
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
    // codesters platform don't provide a REST API
    // hence AJAX, JavaScript and HTML DOM have to be used here to parse the data
    // use Fetch API instead of the XMLHttpRequest Object, because fetch can do the same, but in a simpler way.
    // The Fetch API interface allows web browser to make HTTP requests to web servers.
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

const sendEmail = (emailInfoObj) => {
    // Reference/Documentation: https://formsubmit.co/ajax-documentation
    return new Promise(async (resolve, reject) => {
        fetch("https://formsubmit.co/ajax/adc8426fa7d0c56378adbc291f7a614e", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(emailInfoObj)
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));    
    })
}


export {
    fetchScratchProject,
    fetchCodestersProject,
    sendEmail
}