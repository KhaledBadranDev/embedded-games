import { useState,useEffect } from "react";
import StructureGamesCards from './components/StructureGamesCards'
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
        StructureGamesCards(gamesArr, "scratch")
    )
    
}

export default Scratch