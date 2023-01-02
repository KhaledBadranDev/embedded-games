import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const AddScratchGame = (prop) => {
    const [id, setId] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("id", id)
    }



    return (
        <div className="container">
            <Form className="container text-white  rounded-3 shadow p-3 mb-5 bg-dark rounded" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="Game ID"
                        placeholder="Enter id e.g. 723650095"
                        required
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <Form.Text className="text-muted mt-2">
                        All the other details will be fetched automatically using Scratch REST API.
                    </Form.Text>
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



export default AddScratchGame
