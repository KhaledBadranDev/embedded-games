import axios from "axios";


// notice the difference between using (.then(),.catch()) and (async, await)

const fetchScratchProject = (id) => {
    // fix CORS bug
    // Reference: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
    // solution:
    // add the following proxy before the url you want to use:
    // https://cors-anywhere.herokuapp.com/
    return new Promise(async (resolve, reject) => {
        try {
            let headersList = {
                "Accept": "*/*",
            }
            // string interpolation syntax: `..... ${var} ..`
            let reqOptions = {
                url: `https://cors-anywhere.herokuapp.com/https://api.scratch.mit.edu/projects/${id}`,
                method: "GET",
                headers: headersList,
            }
            
            let response = await axios.request(reqOptions);
            resolve(response.data)            
        } catch (error) {
            reject(error + "\nCouldn't find any scratch project with the given id!")
        }
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