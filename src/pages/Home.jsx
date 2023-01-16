import React, { useCallback, useState } from "react";
import { sendEmail } from "../utils/consumeAPIs";
import SubmissionStatusModal from "./components/SubmissionStatusModal";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import gif1 from "../assets/gif1.gif";
import id_scratch from "../assets/how_to_id_scratch.png";
import id_codesters_1 from "../assets/how_to_id_codesters_1.png";
import id_codesters_2 from "../assets/how_to_id_codesters_2.png";

const Home = () => {
    const [senderEmail, setSenderEmail] = useState("")
    const [senderName, setSenderName] = useState("")
    const [subject, setSubject] = useState("")
    const [senderMessage, setSenderMessage] = useState("")
    const [submissionStatusString, setSubmissionStatusString] = useState("initial")
    const [isError, setIsError] = useState(false)
    const [isProgressBarDone, setIsProgressBarDone] = useState(false)
    const [show, setShow] = useState(false);
    const [isNewSubmit, setIsNewSubmit] = useState(false);
    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const handleOpenImageCallBack = useCallback((event, imageUrl) => {
        event.preventDefault()
        window.open(imageUrl)
    }, [])
    const setSenderEmailCallBack = useCallback(event => setSenderEmail(event.target.value), [])
    const setSenderNameCallBack = useCallback(event => setSenderName(event.target.value), [])
    const setSenderMessageCallBack = useCallback(event => setSenderMessage(event.target.value), [])
    const setSubjectCallBack = useCallback(event => setSubject(event.target.value), [])
    const handleSubmitCallBack = useCallback(async (event) => {
        event.preventDefault()
        const emailInfoObj = {
            "Sender Email": senderEmail,
            "Sender Name": senderName,
            "Sender Message": senderMessage,
            "_subject": subject,
            "_template": "table",
            "_captcha": "false"
        }
        setSubmissionStatusString("") // just to start rendering the progress bar while the email is being sent.
        setIsError(false) // to rest the value
        setShow(true)
        setIsNewSubmit(true)
        try {
            const sentEmailStatus = await sendEmail(emailInfoObj)
            //sentEmailStatus looks somehow as follows: {success: 'false', message: 'Email address test is not formatted correctly.'}
            if (sentEmailStatus["success"] === "false") {
                setIsError(true)
                setSubmissionStatusString(sentEmailStatus["message"])
                throw new Error(sentEmailStatus["message"])
            }
            else {
                setIsError(false)
                setSubmissionStatusString(sentEmailStatus["message"])
                resetInputFields()
            }
        } catch (error) {
            setIsError(true)
            setSubmissionStatusString(error)
        }
    }, [senderEmail, senderName, senderMessage, subject])


    const resetInputFields = () => {
        setSenderEmail("")
        setSenderName("")
        setSubject("")
        setSenderMessage("")
    }

    return (
        <>
            <div className="container text-center text-white my-5 py-5">
                <img src={gif1} alt="gif" style={{ width: "100%", height: "100%" }} />
            </div>

            <div className="container text-center text-white my-5 py-5">
                <h3 className="text-info mb-4">About</h3>
                <p className="text-muted">This website is about embedding games and projects from different platforms.
                    You can play and try these games and projects, and if you are interested in how they were implemented, you can visit the original platform and see the code.
                    Additionally, you can be an admin and contribute to this website by embedding a game or a project yourself.
                    At the moment only games or projects from the <a href="https://scratch.mit.edu/" target="_blank" rel="noreferrer">Scratch</a> platform and <a href="https://www.codesters.com/" target="_blank" rel="noreferrer">Codeters</a> Platform can be embedded.
                </p>
            </div>

            <div className="container text-center text-white my-5 py-5" >
                <h3 className="text-info mb-4" id="instructions">How To Use The Website</h3>
                <p className="text-muted">You can use the website as a user or as an admin or both.</p>
                <h5>Aa a User</h5>
                <p className="text-muted">
                    You can navigate back and forth between the pages, view the embedded projects and games from any device, because this website is responsive.
                    However, you can play and try any game or project you wish only on big screens. In another words, not any mobile phone can be used to play and try the games and projects.<br />
                    The Reason for this is that:<br />
                    1. All the games and projects are embedded, hence they have fixed height and width.<br />
                    2. Most of the games and projects require a keyboard and not a touch screen.<br />
                    As a user you can also see the code of any game or project by clicking on the "show code" button.
                </p>
                <h5>As an Admin</h5>
                <p className="text-muted">
                    As an admin you would be granted permissions to:<br />
                    1. Add/Embed a project or a game<br />
                    2. Sync all your projects/games with the data from the original platform, if the game for example has new description or whatsoever<br />
                    3. Delete any project that has been added by you<br />
                    * Note, as an admin you will be granted permissions to update and delete <strong>ONLY</strong> the projects that have been added by you.:<br />
                    * Note, any user can become an admin. You just need to sign up.<br />
                </p>
                <h6 className="text-muted mb-0">Add, Delete and Update Projects</h6>
                <p className="text-muted">
                    To add or delete a project you would be asked to enter only the id of the project you want to embed/add.
                    The rest of the data will be fetched automatically from the original platforms using AJAX & REST APIs.<br />
                    IDs can be found in the original platform for any <strong>shared</strong> project, as demonstrated in the cards down below.<br />
                    To update a project you will just need to choose a platform, and all the projects from this platform that have been embedded/added by you will be synced with the data from the original platform automatically.
                </p>
                <div className="container">
                    <Row xs={1} md={2} lg={3} className="g-4">
                        <Col key={1}>
                            <Card className="bg-dark">
                                <Card.Img variant="top" src={id_scratch} />
                                <Card.Body className="text-white">
                                    <Card.Title className="text-center h6">Get Scratch Project ID</Card.Title>
                                    <Card.Text className="text-muted mb-0">Select any project you want to add, click on copy link. There you can find the id.</Card.Text>
                                    <a href="https://scratch.mit.edu/" target="_blank" rel="noreferrer"> Visit Scratch Website</a>
                                </Card.Body>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" onClick={event => handleOpenImageCallBack(event, "https://embeddedgames.firebaseapp.com/static/media/how_to_id_scratch.f888f11f88cbc2b26f7f.png")}>Open Image</Button>
                                </div>
                            </Card>
                        </Col>
                        <Col key={2}>
                            <Card className="bg-dark">
                                <Card.Img variant="top" src={id_codesters_1} />
                                <Card.Body className="text-white">
                                    <Card.Title className="text-center h6">Get Codesters Project ID - Step 1</Card.Title>
                                    <Card.Text className="text-muted mb-0">Select any project you want to add from the public/shared projects page.</Card.Text>
                                    <a href="https://www.codesters.com/" target="_blank" rel="noreferrer"> Visit Codesters Website</a>
                                </Card.Body>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" onClick={event => handleOpenImageCallBack(event, "https://embeddedgames.firebaseapp.com/static/media/how_to_id_codesters_1.d0d35a62a1d0a88c9f95.png")}>Open Image</Button>
                                </div>
                            </Card>
                        </Col>
                        <Col key={3}>
                            <Card className="bg-dark">
                                <Card.Img variant="top" src={id_codesters_2} />
                                <Card.Body className="text-white">
                                    <Card.Title className="text-center h6">Get Codesters Project ID - Step 2</Card.Title>
                                    <Card.Text className="text-muted mb-0">After step 1 you can now click on the share button. There you can find the id.</Card.Text>
                                    <a href="https://www.codesters.com/" target="_blank" rel="noreferrer"> Visit Codesters Website</a>
                                </Card.Body>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" onClick={event => handleOpenImageCallBack(event, "https://embeddedgames.firebaseapp.com/static/media/how_to_id_codesters_2.964329deb7c681e69e2b.png")}>Open Image</Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className="container text-center text-white my-5 py-5">
                <h3 className="text-info mb-4">Contact Me</h3>
                <p className="text-muted">
                    have any questions?<br />
                    want to give me your feedback?<br />
                    found a bug?<br />
                    just want to connect?<br />
                    please do not hesitate to reach out!<br />
                </p>

                <style>
                    {` 
                        /* This is to change the color of the placeholder of the form */
                        .form-control::placeholder { 
                            color: #212529; /* This is equal to text-dark in bootstrap*/
                        }
                    `}
                </style>
                {/* Reference/Documentation: https://formsubmit.co/ */}
                <div className="container text-center px-lg-5 px-2" >
                    <Form className="container text-white  rounded-3 shadow p-3 mb-5 bg-dark rounded px-lg-5 " onSubmit={handleSubmitCallBack}>
                        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                            <Form.Label className="ms-2">Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                className="bg-secondary"
                                value={senderEmail}
                                onChange={setSenderEmailCallBack}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 text-start">
                            <Form.Label className="ms-2">Name</Form.Label>
                            <Form.Control
                                required
                                className="bg-secondary"
                                placeholder="Full name"
                                value={senderName}
                                onChange={setSenderNameCallBack}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 text-start">
                            <Form.Label className="ms-2">Subject</Form.Label>
                            <Form.Control
                                required
                                className="bg-secondary"
                                placeholder="Feedback"
                                value={subject}
                                onChange={setSubjectCallBack}
                            />
                        </Form.Group>

                        <div className="form-floating text-dark">
                            <textarea
                                required
                                className="form-control bg-secondary"
                                rows="10"
                                placeholder="Leave a comment here"
                                id="floatingTextarea"
                                style={{ height: "100%" }}
                                value={senderMessage}
                                onChange={setSenderMessageCallBack}
                            >
                            </textarea>
                            <label for="floatingTextarea">Your Message</label>
                        </div>
                        <div className="mt-3 d-grid gap-2 col-lg-4 col-6 mx-auto">
                            <Button variant="primary" type="submit">
                                Send
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            {/* submission progress bar */}
            {submissionStatusString !== "initial" &&
                <SubmissionStatusModal
                    submissionSuccessMessage="sent the email"
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
        </>

    );
};

export default Home;