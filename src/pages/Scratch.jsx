import { useState,useEffect } from "react";
import GamesCards from '../components/GamesCards'
import { readDocs } from "../firebase/dbCRUD"


const Scratch = () => {
    const [gamesArr, setGamesArr] = useState([])

    useEffect(() => {
        readDocs("scratch")
            .then(parsedGamesArr => {
                setGamesArr(parsedGamesArr);
            })

    }, [gamesArr]);
    
    return (
        GamesCards(gamesArr, "scratch")
    )
    
}

export default Scratch