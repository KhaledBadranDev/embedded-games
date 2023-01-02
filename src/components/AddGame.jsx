import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AddScratchGame from "./AddScratchGame"

const AddGame = (prop) => {
    const [platform, setPlatform] = useState("Scratch")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("platform", platform)
    }


    return (
        <div className="container">
            <Form className="container text-white  rounded-3 shadow p-3 mb-5 bg-dark rounded" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Choose a Platform</Form.Label>
                    <select
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                    >
                        <option value={"Scratch"}>Scratch</option>
                        <option value={"Codesters"}>Codesters</option>
                    </select>
                </Form.Group>
            </Form>
            {platform === "Scratch" &&
                <AddScratchGame></AddScratchGame>
            }
        </div>
    )
}



export default AddGame
