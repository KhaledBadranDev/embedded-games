import React from "react";
import AddScratchGame from "./AddScratchGame"
import AddCodestersGame from "./AddCodestersGame"

const AddGame = ({platform, admin}) => {
    return (
        <div className="mt-5 container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5">
            <h4 className="text-white text-center">Adding a {platform} Game</h4>
            {platform === "Scratch" &&
                
                <AddScratchGame admin={admin}></AddScratchGame>
            }
            {platform === "Codesters" &&
                <AddCodestersGame admin={admin}></AddCodestersGame>
            }
        </div>
    )
}



export default AddGame
