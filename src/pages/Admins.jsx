import { React, useState, useCallback, createContext, useMemo } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminsToolbar from "./components/AdminsToolbar";
import { handleSignInOrUpSubmission } from "../utils/handleSubmissions"
import SubmissionStatusModal from "./components/SubmissionStatusModal";

const Admins = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState({})
    const [isAdminSignedIn, setIsAdminSignedIn] = useState(false)
    const [wantToSignedUp, setWantToSignedUp] = useState(false)
    const [submissionStatusString, setSubmissionStatusString] = useState("initial")
    const [isError, setIsError] = useState(false)
    const [isProgressBarDone, setIsProgressBarDone] = useState(false)
	const [show, setShow] = useState(false);
    const [isNewSubmit, setIsNewSubmit] = useState(false);
    // to make the rerendering a bit more effective, useMemo hook
    const adminContextProviderValue = useMemo(() => ({ admin, setAdmin }), [admin, setAdmin])

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const setEmailCallBack = useCallback(event => setEmail(event.target.value), [])
    const setPasswordCallBack = useCallback(event => setPassword(event.target.value), [])
    const setWantToSignedUpCallBack = useCallback(() => setWantToSignedUp(!wantToSignedUp), [wantToSignedUp])
    // pass "setIsAdminSignedIn" function as an argument to "handleSignInOrUpSubmission" function
    const handleSignInOrUpSubmissionCallBack = useCallback(async event => {
        setSubmissionStatusString("") // just to start rendering the progress bar while the admin is trying to sign in.
        setIsError(false) // to rest the value
        setShow(true)
        setIsNewSubmit(true)
        try {
            const res = await handleSignInOrUpSubmission(event, wantToSignedUp, email, password, setAdmin, setIsAdminSignedIn)
            setIsError(false)
            setSubmissionStatusString(res)
        } catch (error) {
            setIsError(true)
            setSubmissionStatusString(error)
        }
    }, [wantToSignedUp, email, password])


    return (
        <div className="container">
            <h1 className="text-white text-center mt-3 mb-3">Only For Admins</h1>
            {/* 
                // React bootstrap component link:
                // https://react-bootstrap.netlify.app/forms/overview/
            */}
            {(!isAdminSignedIn || !isProgressBarDone) &&
                <Form className="container text-white  rounded-3 shadow p-3 mb-5 bg-dark rounded" onSubmit={handleSignInOrUpSubmissionCallBack}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                            value={email}
                            onChange={setEmailCallBack}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={setPasswordCallBack}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2 col-6 mx-auto">
                        {!wantToSignedUp && // if already an admin then sign in
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                        }
                        {wantToSignedUp && // if want to be an admin then sign up
                            <Button variant="success" type="submit">
                                Sign Up
                            </Button>
                        }
                    </div>
                    {/* submission progress bar */}
                    {submissionStatusString!=="initial" &&
                        <SubmissionStatusModal 
                            submissionSuccessMessage ={`${wantToSignedUp ? "signed up" : "signed in"}`}
                            isError = {isError}
                            submissionStatusString = {submissionStatusString}
                            setIsProgressBarDone = {setIsProgressBarDone}
                            show = {show}
                            setShow = {setShow}
                            isNewSubmit = {isNewSubmit}
                            setIsNewSubmit = {setIsNewSubmit}
                        > 
                        </SubmissionStatusModal>
                    }
                    <div className="text-white text-center">
                        {!wantToSignedUp && // if the sign in form is displayed then show the sign up question
                            <>
                                <p className="mt-5 mb-0">
                                    Want to be an admin?
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-link mt-0"
                                    onClick={setWantToSignedUpCallBack}
                                >
                                    Sign Up
                                </button>
                            </>
                        }
                        {wantToSignedUp && // if the sign up form is displayed then show the sign in question
                            <>
                                <p className="mt-5 mb-0">
                                    Already an admin?
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-link mt-0"
                                    onClick={setWantToSignedUpCallBack}
                                >
                                    Sign In
                                </button>
                            </>
                        }
                    </div>

                </Form>
            }
            {(isAdminSignedIn && isProgressBarDone)&&
                <AdminContext.Provider value={adminContextProviderValue}>
                    <AdminsToolbar></AdminsToolbar>
                </AdminContext.Provider>
            }
        </div>
    )
}



export default Admins
export const AdminContext = createContext();
