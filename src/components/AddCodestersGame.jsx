import { React, useState, useCallback } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createDoc } from "../firebase/dbCRUD"


const AddCodestersGame = ({ admin }) => {
    const [id, setId] = useState() // id here is string
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [instructions, setInstructions] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const createdCodestersGameObj = createCodestersGameObj()
        const firestoreGameDocName = createdCodestersGameObj["title"].replace(/\s+/g, '_'); // replace whitespaces with underscores 
        createDoc("codesters", firestoreGameDocName, createdCodestersGameObj)
            .then(res => {
                console.log("res:", res)
            })
            .catch(error => {
                console.log("error:", error)
            })
    }

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const setIdCallBack = useCallback(e => setId(e.target.value), [])
    const setTitleCallBack = useCallback(e => setTitle(e.target.value), [])
    const setDescriptionCallBack = useCallback(e => setDescription(e.target.value), [])
    const setInstructionsCallBack = useCallback(e => setInstructions(e.target.value), [])

    const createCodestersGameObj = () => {
        // create an empty obj then fill it with the entered data.
        const createdCodestersGameObj = {}
        createdCodestersGameObj["id"] = id
        createdCodestersGameObj["title"] = title
        createdCodestersGameObj["description"] = description
        createdCodestersGameObj["instructions"] = instructions
        console.log(admin)
        createdCodestersGameObj["admin"] = admin
        return createdCodestersGameObj
    }


    return (
        <div className="container text-white">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">

                    <Form.Label>Game Id</Form.Label>
                    <Form.Control
                        type="Game ID"
                        placeholder="Enter id e.g. 723650095"
                        required
                        value={id}
                        onChange={setIdCallBack}
                    />


                    <Form.Label className="mt-3">Game Title</Form.Label>
                    <Form.Control
                        type="Game ID"
                        placeholder="Enter id e.g. 723650095"
                        required
                        value={title}
                        onChange={setTitleCallBack}
                    />

                    <Form.Label className="mt-3">Game Description</Form.Label>
                    <Form.Control
                        type="Game ID"
                        placeholder="Enter id e.g. 723650095"
                        required
                        value={description}
                        onChange={setDescriptionCallBack}
                    />

                    <Form.Label className="mt-3">Game Instructions</Form.Label>
                    <Form.Control
                        type="Game ID"
                        placeholder="Enter id e.g. 723650095"
                        required
                        value={instructions}
                        onChange={setInstructionsCallBack}
                    />

                </Form.Group>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}



export default AddCodestersGame
