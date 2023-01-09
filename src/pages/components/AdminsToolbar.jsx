import { React, useState, useCallback } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AddGame from "./AddGame"
import UpdateGame from "./UpdateGame"
import DeleteGame from "./DeleteGame"

const AdminsToolbar = ({ admin}) => {
    const [platform, setPlatform] = useState("Scratch")
    const [addGame, setAddGame] = useState(false)
    const [updateGame, setUpdateGame] = useState(false)
    const [deleteGame, setDeleteGame] = useState(false)
    const [isAddGameDisabled, setIsAddGameDisabled] = useState(false);
    const [isUpdateGameDisabled, setIsUpdateGameDisabled] = useState(false);
    const [isDeleteGameDisabled, setIsDeleteGameDisabled] = useState(false);

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const handelAddGameCallBack = useCallback(event => {
        event.preventDefault()

        setAddGame(true)
        setUpdateGame(false)
        setDeleteGame(false)

        setIsAddGameDisabled(true)
        setIsUpdateGameDisabled(false)
        setIsDeleteGameDisabled(false)
    }, [])

    const handelUpdateGameCallBack = useCallback(event => {
        event.preventDefault()

        setUpdateGame(true)
        setAddGame(false)
        setDeleteGame(false)

        setIsUpdateGameDisabled(true)
        setIsAddGameDisabled(false)
        setIsDeleteGameDisabled(false)
    }, [])

    const handelDeleteGameCallBack = useCallback(event => {
        event.preventDefault()

        setDeleteGame(true)
        setAddGame(false)
        setUpdateGame(false)

        setIsDeleteGameDisabled(true)
        setIsAddGameDisabled(false)
        setIsUpdateGameDisabled(false)
    }, [])



    return (
        <div className="container bg-dark rounded rounded-5 p-md-5 p-3">
            <div className="container text-muted bg-dark rounded rounded-3 shadow-lg pt-2 pb-2 mb-2 text-white">
                <Row className="" xs={1} md={2}>
                    <Col className="mt-md-0 text-center text-lg-start" key={1} >
                        <span className="px-1">
                            {/* string interpolation syntax: `..... ${var} ..` */}
                            {`email: ${admin["email"]}`}
                        </span>
                    </Col>
                    <Col className="mt-2 mt-md-0 text-center text-lg-end" key={2} >
                        <span className="px-1">
                            {/* string interpolation syntax: `..... ${var} ..` */}
                            {`lastSignInTime: ${admin["lastSignInTime"]}`}
                        </span>
                    </Col>
                    <Col className="mt-2 mt-md-0 text-center text-lg-start" key={3} >
                        <span className="px-1">
                            {/* string interpolation syntax: `..... ${var} ..` */}
                            {`projectsAddedByYou: ${admin["numberOfProjects"]}`}
                        </span>
                    </Col>
                    <Col className="mt-2 mt-md-0 text-center text-lg-end" key={4} >
                        <span className="px-1">
                            {/* string interpolation syntax: `..... ${var} ..` */}
                            {`becameAdminOn: ${admin["creationTime"]}`}
                        </span>
                    </Col>
                </Row>
            </div>
            <div className="container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5 text-center">
                <h2 className="text-white mb-3">Admins Toolbar</h2>
                <Row className="mt-5" xs={1} md={3}>
                    <Col className="mt-md-0" key={1} >
                        <Button
                            className="px-4"
                            variant="success"
                            onClick={handelAddGameCallBack}
                            disabled={isAddGameDisabled}
                        >
                            Add a Game
                        </Button>
                    </Col>
                    <Col className="mt-2 mt-md-0" key={2} >
                        <Button
                            className="px-3"
                            variant="primary"
                            onClick={handelUpdateGameCallBack}
                            disabled={isUpdateGameDisabled}
                        >
                            Update a Game
                        </Button>
                    </Col>
                    <Col className="mt-2 mt-md-0" key={3} >
                        <Button
                            className="px-3"
                            variant="danger"
                            onClick={handelDeleteGameCallBack}
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
                        onChange={e => setPlatform((e.target.value).toLowerCase())}
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
                <UpdateGame platform={platform} admin={admin}></UpdateGame>
            }
            {deleteGame &&
                <DeleteGame platform={platform} admin={admin}></DeleteGame>
            }
        </div>
    )
}

export default AdminsToolbar
