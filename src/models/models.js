

const createScratchDocObj = (fetchJSONScratchProject, id, admin) => {
    // create an empty obj then fill it with some fetched data.
    const createdScratchDocObj = {}
    createdScratchDocObj["id"] = parseInt(id)
    createdScratchDocObj["description"] = fetchJSONScratchProject["description"]
    createdScratchDocObj["image"] = fetchJSONScratchProject["image"]
    createdScratchDocObj["instructions"] = fetchJSONScratchProject["instructions"]
    createdScratchDocObj["title"] = fetchJSONScratchProject["title"]
    createdScratchDocObj["author"] = {
        "profileImage": fetchJSONScratchProject["author"]["profile"]["images"]["55x55"],
        "username": fetchJSONScratchProject["author"]["username"]
    }
    createdScratchDocObj["admin"] = admin

    return createdScratchDocObj
}


const createCodestersDocObj = (fetchHTMLCodestersProject, id, admin) => {
    // parse html/xml response using DOMparse
    const DomParser = new DOMParser();
    const parsedCodestersDOMDoc = DomParser.parseFromString(fetchHTMLCodestersProject, "text/html")
    // trim() is a method that removes whitespaces from the start and end of a string.
    const projectTitle = parsedCodestersDOMDoc.getElementsByClassName("course-title")[0].innerHTML.trim();
    const projectDescription = parsedCodestersDOMDoc.getElementsByClassName("introBar")[0].getElementsByTagName("p")[0].innerHTML.trim();
    const author = parsedCodestersDOMDoc.getElementsByClassName("project-description")[0].getElementsByTagName("span")[1].innerHTML.trim();

    // create an empty obj then fill it with some fetched data.
    const createdCodestersDocObj = {}
    createdCodestersDocObj["id"] = id
    createdCodestersDocObj["title"] = projectTitle
    createdCodestersDocObj["description"] = projectDescription
    createdCodestersDocObj["image"] = `https://codestersbucket.s3.amazonaws.com/prod_media/all/activity_images/${id}-reduced.png`
    createdCodestersDocObj["author"] = { 
        "username": author
    }
    createdCodestersDocObj["admin"] = admin
    return createdCodestersDocObj
}


const createAdminDocObj = adminData => {
    // 
    console.log(adminData)
    const createdAdmin = {
        "email": adminData["email"],
        "creationTime": adminData["metadata"]["email"],
        "lastSignInTime": adminData["metadata"]["email"],

    }
    return createdAdmin
}


export {
    createScratchDocObj,
    createCodestersDocObj,
    createAdminDocObj
}