import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// React bootstrap component link:
// https://react-bootstrap.netlify.app/forms/overview/

const Admins = (prop) => {
    return (
        <div className="container">
            <h1 className="text-white mt-3 mb-3">Only For Admins</h1>
            <Form className="container text-white  rounded-3 shadow p-3 mb-5 bg-dark rounded">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>

    )
}

export default Admins
