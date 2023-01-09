import { React, useCallback, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { handleUpdateSubmission } from "../../utils/handleSubmissions"
import { AdminContext } from "../Admins"


const UpdateGame = ({ platform }) => {
    const {admin} = useContext(AdminContext)

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const handleUpdateSubmissionCallBack = useCallback(event => handleUpdateSubmission(event, platform, admin), [platform, admin])

    return (
        <div className="mt-5 container bg-dark rounded rounded-3 shadow-lg pt-3 pb-5 text-center">
            <h4 className="text-white text-center">Updating {platform.charAt(0).toUpperCase()+platform.slice(1)} Games</h4>
            <div className="container text-white">
                <label className="text-muted mt-2">
                    {`All ${platform} games, that have already been added by you, will be synced with all the new updates from ${platform} platform`}
                </label>

                <div className="d-grid gap-2 col-6 mx-auto mt-2">
                    <Button variant="primary" onClick={handleUpdateSubmissionCallBack}>
                        Sync
                    </Button>
                </div>
            </div>
        </div >
    )
}



export default UpdateGame
