import { useState, useEffect } from "react";
import StructureGamesCards from './components/StructureGamesCards'
import { readDocs } from "../firebase/dbCRUD"


const Scratch = () => {
    const [gamesArr, setGamesArr] = useState([])

    // * ONLY FOR DEV
    // This is tmp code to avoid fetching data from the firestore db
    // as the free plan gives us only limited number of invocations.
    // Afterwards we receive an error "FirebaseError: Quota exceeded."
    // const gamesArr = [
    //     {
    //         "adminEmail": "khaled@test.com",
    //         "id": "706887362",
    //         "title": "landing bird",
    //         "instructions": "use the arrow keys to change the angle of the bird",
    //         "description": "To win this game you need to land with 90 degree angle",
    //         "author":{
    //             username:"ProgrammingGym"
    //         },
    //         "image":"https://cdn2.scratch.mit.edu/get_image/project/706887362_480x360.png"
    //     }
    // ]

    useEffect(() => {
        readDocs("scratch")
            .then(parsedGamesArr => {
                setGamesArr(parsedGamesArr);
            })
    }, []); // keep the dependency array empty to avoid many reads from db  
    
    return (
        StructureGamesCards(gamesArr, "scratch")
    )
    
}

export default Scratch