import { React, useCallback, useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import { handleUpdateSubmission } from "../../utils/handleSubmissions"
import { AdminContext } from "../Admins"
import SubmissionStatusModal from "./SubmissionStatusModal";


const UpdateGame = ({ platform }) => {
    const { admin } = useContext(AdminContext)
    const [submissionStatusString, setSubmissionStatusString] = useState("initial")
    const [isError, setIsError] = useState(false)
    const [isProgressBarDone, setIsProgressBarDone] = useState(false)
    const [isNewSubmit, setIsNewSubmit] = useState(false)
    const [show, setShow] = useState(false);

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const handleUpdateSubmissionCallBack = useCallback(async event => {
        setSubmissionStatusString("") // just to start rendering the progress bar while the game is being deleted from the db
        setIsError(false) // to rest the value
        setShow(true)
        setIsNewSubmit(true)
        try {
            const res = await handleUpdateSubmission(event, platform, admin)
            setIsError(false)
            setSubmissionStatusString(res)
        } catch (error) {
            setIsError(true)
            setSubmissionStatusString(error)
        }
    }, [platform, admin, setIsNewSubmit])

    return (
        <div className="mt-5 container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5 text-center">
            <h4 className="text-white text-center">Updating {platform.charAt(0).toUpperCase() + platform.slice(1)} Games</h4>
            <div className="container text-white">
                <label className="text-muted mt-2">
                    {`All ${platform} games, that have already been added by you, will be synced with all the new updates from ${platform} platform`}
                </label>

                <div className="d-grid gap-2 col-6 mx-auto mt-2">
                    <Button variant="primary" onClick={handleUpdateSubmissionCallBack}>
                        Sync
                    </Button>
                </div>
                {/* submission progress bar */}
                {(submissionStatusString !== "initial") &&
                    <SubmissionStatusModal
                        submissionSuccessMessage=
                        {`
                        ${(Array.isArray(submissionStatusString) && submissionStatusString.length > 0) ?
                                `updated all your ${platform.toLowerCase()} project/s\n the id/s of the updated project/s is/are: ${submissionStatusString}`
                                :
                                `updated all your ${platform.toLowerCase()} project/s.\nall your ${platform.toLowerCase()} project/s are up to date already!`
                            }
                        `}
                        isError={isError}
                        submissionStatusString={submissionStatusString}
                        setIsProgressBarDone={setIsProgressBarDone}
                        show={show}
                        setShow={setShow}
                        isNewSubmit={isNewSubmit}
                        setIsNewSubmit={setIsNewSubmit}
                    >
                    </SubmissionStatusModal>
                }
            </div>
        </div >
    )
}



export default UpdateGame
