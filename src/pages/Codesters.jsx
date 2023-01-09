import { useState,useEffect } from "react";
import StructureGamesCards from './components/StructureGamesCards'
import { readDocs } from "../firebase/dbCRUD"

const Codesters = (prop) => {
    const [gamesArr, setGamesArr] = useState([])

    useEffect(() => {
        readDocs("codesters")
            .then(parsedGamesArr => {
                setGamesArr(parsedGamesArr);
            })

    }, [gamesArr]);
    
    return (
        StructureGamesCards(gamesArr, "codesters")
    )
}

export default Codesters