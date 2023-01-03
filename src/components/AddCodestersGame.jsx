import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const AddScratchGame = ({admin}) => {
    const [id, setId] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
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
                        onChange={e => setId(e.target.value)}
                    />


                <Form.Label className="mt-3">Game Title</Form.Label>
                    <Form.Control
                        type="Game ID"
                        placeholder="Enter id e.g. 723650095"
                        required
                        value={id}
                        onChange={e => setId(e.target.value)}
                    /> 
                
                <Form.Label className="mt-3">Game Description</Form.Label>
                    <Form.Control
                        type="Game ID"
                        placeholder="Enter id e.g. 723650095"
                        required
                        value={id}
                        onChange={e => setId(e.target.value)}
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



export default AddScratchGame
