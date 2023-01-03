import React from "react";
import AddScratchGame from "./AddScratchGame"
import AddCodestersGame from "./AddCodestersGame"

const AddGame = ({platform}) => {
    return (
        <div className="mt-5 container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5">
            {platform === "Scratch" &&
                <AddScratchGame></AddScratchGame>
            }
            {platform === "Codesters" &&
                <AddCodestersGame></AddCodestersGame>
            }
        </div>
    )
}



export default AddGame
