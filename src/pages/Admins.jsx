import { React, useState, useCallback } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminsToolbar from "../components/AdminsToolbar";
import { isAdmin, createAdmin } from "../firebase/authentication"
import { handleSignInSubmission, handleSignUpSubmission } from "../utils/handleSubmissions"

const Admins = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAdminSignedIn, setIsAdminSignedIn] = useState(false)
    const [wantToSignedUp, setWantToSignedUp] = useState(false)

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const setEmailCallBack = useCallback(event => setEmail(event.target.value), [])
    const setPasswordCallBack = useCallback(event => setPassword(event.target.value), [])


    const handleSubmit = (e) => {
        e.preventDefault()
        isAdmin(email, password)
            .then(res => {
                setIsAdminSignedIn(true)
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    return (
        <div className="container">
            <h1 className="text-white text-center mt-3 mb-3">Only For Admins</h1>
            {/* 
                // React bootstrap component link:
                // https://react-bootstrap.netlify.app/forms/overview/
            */}
            {!isAdminSignedIn &&
                <Form className="container text-white  rounded-3 shadow p-3 mb-5 bg-dark rounded" onSubmit={handleSubmit}>
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
                    <div className="text-white text-center">
                        {!wantToSignedUp && // if the sign in form is displayed then show the sign up question
                            <>
                                <p className="mt-5 mb-0">
                                    Want to be an admin?
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-link mt-0"
                                    onClick = {()=>setWantToSignedUp(true)}
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
                                    onClick = {()=>setWantToSignedUp(false)}
                                >
                                    Sign In
                                </button>
                            </>
                        }
                    </div>

                </Form>
            }
            {isAdminSignedIn &&
                <AdminsToolbar admin={email}></AdminsToolbar>
            }
        </div>
    )
}



export default Admins
