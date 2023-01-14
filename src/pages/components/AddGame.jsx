import { React, useState, useCallback, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { handleAddSubmission } from "../../utils/handleSubmissions"
import { AdminContext } from "../Admins"
import SubmissionStatus from "./SubmissionStatus";


const AddGame = ({ platform }) => {
    const [id, setId] = useState()
    // the use context will return an object with 2 fields:
    // admin itself as an object and the setAdmin function
    const { admin, setAdmin } = useContext(AdminContext)
    const [submissionStatusString, setSubmissionStatusString] = useState("initial")
    const [isError, setIsError] = useState(false)
    const [isProgressBarDone, setIsProgressBarDone] = useState(false)
    const [isNewSubmit, setIsNewSubmit] = useState(false)
    // const [isSignInOrUpBtnDisabled, setIsSignInOrUpBtnDisabled] = useState(false);

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const setIdCallBack = useCallback(event => setId(event.target.value), [])
    const handleAddSubmissionCallBack = useCallback(async event => {
        // setIsSignInOrUpBtnDisabled(true)
        setIsNewSubmit(true)
        try {
            setSubmissionStatusString("") // just to start rendering the progress bar while the game is being deleted from the db
            const res = await handleAddSubmission(event, id, platform, admin, setAdmin)
            setIsError(false)
            setSubmissionStatusString(res)
        } catch (error) {
            setIsError(true)
            setSubmissionStatusString(error)
        }
    }, [id, platform, admin, setAdmin, setIsNewSubmit])

    return (
        <div className="mt-5 container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5">
            <h4 className="text-white text-center">Adding a {platform.charAt(0).toUpperCase() + platform.slice(1)} Game</h4>
            <div className="container text-white">
                <Form onSubmit={handleAddSubmissionCallBack}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Label>Game Id</Form.Label>
                        <Form.Control
                            type="Game ID"
                            placeholder="Enter id e.g. 723650095"
                            required
                            value={id}
                            onChange={setIdCallBack}
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
                {/* submission progress bar */}
                {(submissionStatusString !== "initial") &&
                    <SubmissionStatus
                        submissionSuccessMessage={`added the ${platform.toLowerCase()} project with id: ${id}`}
                        isError={isError}
                        submissionStatusString={submissionStatusString}
                        setIsProgressBarDone={setIsProgressBarDone}
                        setDisableButtons={null}
                        isNewSubmit={isNewSubmit}
                        setIsNewSubmit={setIsNewSubmit}
                    >
                    </SubmissionStatus>
                }
            </div>
        </div>
    )
}



export default AddGame
