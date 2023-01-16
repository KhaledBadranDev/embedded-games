import { useState, useEffect } from "react";
import StructureGamesCards from './components/StructureGamesCards'
import { readDocs } from "../firebase/dbCRUD"

const Codesters = (prop) => {
    const [gamesArr, setGamesArr] = useState([])

    // * ONLY FOR DEV
    // This is tmp code to avoid fetching data from the firestore db
    // as the free plan gives us only limited number of invocations.
    // Afterwards we receive an error "FirebaseError: Quota exceeded."
    // const gamesArr = [
    //     {
    //         "adminEmail": "khaled@test.com",
    //         "id": "6d0b4111d7464bca9d9effdc23534884",
    //         "title": "Tiger vs Covid",
    //         "description": "if you don't catch one Covid germ you lose the game.",
    //         "author":{
    //             username:"ProgrammingGym"
    //         },
    //         "image":"https://codestersbucket.s3.amazonaws.com/prod_media/all/activity_images/6d0b4111d7464bca9d9effdc23534884.png"
    //     }
    // ]

    useEffect(() => {
        readDocs("codesters")
            .then(parsedGamesArr => {
                setGamesArr(parsedGamesArr);
            })
    }, []); // keep the dependency array empty to avoid many reads from db  

    return (
        StructureGamesCards(gamesArr, "codesters")
    )
}

export default Codesters