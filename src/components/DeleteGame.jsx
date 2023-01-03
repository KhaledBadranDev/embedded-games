import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { deleteDoc } from "../firebase/dbCRUD"

const DeleteGame = ({ admin, platform}) => {
    const [id, setId] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO not working
        const collectionName = JSON.stringify(platform).toLowerCase()
        const docName = id.toString()
        console.log(docName)
        deleteDoc(collectionName, docName)
            .then(res =>{
                console.log("Game Deleted",res)
            })
            .catch(error => {
                console.log(error)
            })
    }






    return (
        <div className="text-white mt-5 container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5">
            <h4 className="text-center">Deleting a {platform} Game</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Game Id</Form.Label>
                    <Form.Control
                        type="Game ID"
                        placeholder="Enter id e.g. 723650095"
                        required
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <Form.Text className="text-muted mt-2">
                        You can delete only the games that have been created by you.<br/>
                        The game will be permanently deleted!
                    </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2 col-6 mx-auto">
                    <Button variant="danger" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}



export default DeleteGame
