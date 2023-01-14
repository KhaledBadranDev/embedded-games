

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


function isDeepEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    // if the length of the keys is different, then the objects are not equal
    if (keys1.length !== keys2.length)
        return false;
    // if either keys or values not equal, then the objects are not equal
    for (const key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        const areObjects = isObject(val1) && isObject(val2);
        // recursive call if there are any nested objects
        // (areObjects && !deepEqual(val1, val2)) indicates that
        // as soon as the compared properties are objects, 
        // a recursive call starts to verify whether the nested objects are equal too.
        if ((areObjects && !isDeepEqual(val1, val2)) || (!areObjects && val1 !== val2))
            return false;

    }
    return true;
}
// helper function for deepEqual
function isObject(object) {
    return object != null && typeof object === 'object';
}


const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export {
    isValidId,
    isDeepEqual,
    sleep
}