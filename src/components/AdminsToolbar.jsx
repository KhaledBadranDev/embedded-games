import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AddGame from "./AddGame"

const AdminsToolbar = (prop) => {
    const [addGame, setAddGame] = useState(false)
    const [updateGame, setUpdateGame] = useState(false)
    const [deleteGame, setDeleteGame] = useState(false)
    
    const handelAddGame = (e) => {
        e.preventDefault()
        setAddGame(true)
        setUpdateGame(false)
        setDeleteGame(false)
    }

    const handelUpdateGame = (e) => {

    }

    const handelDeleteGame = (e) => {

    }

    return (
        <div className="container bg-dark rounded pt-3 pb-5">
            <h2 className="text-white  text-center mb-3">Admins Toolbar</h2>
            <Row className="mt-5 text-center" xs={1} md={3}>
                <Col className="mt-md-0" key={1} >
                    <Button 
                        className="px-4" 
                        variant="success" 
                        onClick = {handelAddGame}
                    >
                        Add a Game
                    </Button>
                </Col>
                <Col className="mt-2 mt-md-0" key={2} >
                    <Button className="px-3" variant="primary">
                        Update a Game
                    </Button>
                </Col>
                <Col className="mt-2 mt-md-0" key={3} >
                    <Button className="px-3" variant="danger" >
                        Delete a Game
                    </Button>
                </Col>
            </Row>
            {addGame &&
                <AddGame></AddGame>
            }
        </div>

    )
}

export default AdminsToolbar
