import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AddGame from "./AddGame"
import UpdateGame from "./UpdateGame"
import DeleteGame from "./DeleteGame"

const AdminsToolbar = ({admin}) => {
    const [platform, setPlatform] = useState("Scratch")
    const [addGame, setAddGame] = useState(false)
    const [updateGame, setUpdateGame] = useState(false)
    const [deleteGame, setDeleteGame] = useState(false)
    const [isAddGameDisabled, setIsAddGameDisabled] = useState(false);
    const [isUpdateGameDisabled, setIsUpdateGameDisabled] = useState(false);
    const [isDeleteGameDisabled, setIsDeleteGameDisabled] = useState(false);

    const handelAddGame = (e) => {
        e.preventDefault()

        setAddGame(true)
        setUpdateGame(false)
        setDeleteGame(false)

        setIsAddGameDisabled(true)
        setIsUpdateGameDisabled(false)
        setIsDeleteGameDisabled(false)
    }

    const handelUpdateGame = (e) => {
        e.preventDefault()

        setUpdateGame(true)
        setAddGame(false)
        setDeleteGame(false)

        setIsUpdateGameDisabled(true)
        setIsAddGameDisabled(false)
        setIsDeleteGameDisabled(false)
    }

    const handelDeleteGame = (e) => {
        e.preventDefault()

        setDeleteGame(true)
        setAddGame(false)
        setUpdateGame(false)

        setIsDeleteGameDisabled(true)
        setIsAddGameDisabled(false)
        setIsUpdateGameDisabled(false)
    }

    return (
        <div className="container bg-dark rounded rounded-5 p-5">
            <div className="container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5 text-center">
                <h2 className="text-white mb-3">Admins Toolbar</h2>
                <Row className="mt-5" xs={1} md={3}>
                    <Col className="mt-md-0" key={1} >
                        <Button
                            className="px-4"
                            variant="success"
                            onClick={handelAddGame}
                            disabled={isAddGameDisabled}
                        >
                            Add a Game
                        </Button>
                    </Col>
                    <Col className="mt-2 mt-md-0" key={2} >
                        <Button
                            className="px-3"
                            variant="primary"
                            onClick={handelUpdateGame}
                            disabled={isUpdateGameDisabled}
                        >
                            Update a Game
                        </Button>
                    </Col>
                    <Col className="mt-2 mt-md-0" key={3} >
                        <Button
                            className="px-3"
                            variant="danger"
                            onClick={handelDeleteGame}
                            disabled={isDeleteGameDisabled}
                        >
                            Delete a Game
                        </Button>
                    </Col>
                </Row>

                <div className="text-white mt-4">
                    <label className="mx-2">Choose a Platform</label>
                    <select
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                    >
                        <option value={"scratch"}>Scratch</option>
                        <option value={"codesters"}>Codesters</option>
                    </select>
                </div>
            </div>
            
            {addGame &&
                <AddGame platform={platform} admin={admin}></AddGame>
            }
            {updateGame &&
                <UpdateGame></UpdateGame>
            }
            {deleteGame &&
                <DeleteGame platform={platform}></DeleteGame>
            }
        </div>
    )
}

export default AdminsToolbar
