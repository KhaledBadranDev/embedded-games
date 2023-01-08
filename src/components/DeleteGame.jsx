import { React, useState, useCallback } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { handleDeleteSubmission } from "../utils/handleSubmissions";

const DeleteGame = ({ admin, platform}) => {
    const [id, setId] = useState()

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const setIdCallBack = useCallback(event => setId(event.target.value),[])
    const handleDeleteSubmissionCallBack = useCallback(event => handleDeleteSubmission(event, id, platform, admin), [id, platform, admin])

    return (
        <div className="mt-5 container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5">
            <h4 className="text-center text-white">Deleting a {platform.charAt(0).toUpperCase()+platform.slice(1)} Game</h4>
            <div className="container text-white">
                <Form onSubmit={handleDeleteSubmissionCallBack}>
                    <Form.Group className="mb-3">
                        <Form.Label>Game Id</Form.Label>
                        <Form.Control
                            type="Game ID"
                            placeholder="Enter id e.g. 723650095"
                            required
                            value={id}
                            onChange={setIdCallBack}
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
        </div>
    )
}



export default DeleteGame
