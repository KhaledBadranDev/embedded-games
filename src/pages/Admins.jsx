import { React, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminsToolbar from "../components/AdminsToolbar";
import isAdmin from "../firebase/authentication"

const Admins = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [adminLoggedIn, setAdminLoggedIn] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        isAdmin(email, password)
            .then( res => {
                setAdminLoggedIn(true)
            })
            .catch( err => {
                console.log("err",err)
            })
    }



    return (
        <div className="container">
            <h1 className="text-white text-center mt-3 mb-3">Only For Admins</h1>
            {/* 
                // React bootstrap component link:
                // https://react-bootstrap.netlify.app/forms/overview/
            */}
            { !adminLoggedIn &&
                <Form className="container text-white  rounded-3 shadow p-3 mb-5 bg-dark rounded" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2 col-6 mx-auto">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            }
            { adminLoggedIn &&
                <AdminsToolbar admin={email}></AdminsToolbar>
            }
        </div>
    )
}



export default Admins
