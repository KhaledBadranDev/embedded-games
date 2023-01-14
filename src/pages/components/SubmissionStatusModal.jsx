import { useCallback, useEffect, useState } from "react";
import { sleep } from "../../utils/utils"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



/**
 * 
 * @param {*} param0 
 * @param {} param0
 * @returns 
 */
const SubmissionStatusModal = ({ isNewSubmit, setIsNewSubmit, submissionSuccessMessage, submissionStatusString, show, isError, setIsProgressBarDone, setShow }) => {
    const [bgVariant, setBgVariant] = useState("primary")
    const [fakeProgressTracker, setFakeProgressTracker] = useState(0)
    const [isCloseBtnDisabled, setIsCloseBtnDisabled] = useState(true)


    const resetProgressBar = useCallback(() => {
        setFakeProgressTracker(0)
        setBgVariant("primary")
        setIsCloseBtnDisabled(true)
    }, [])
    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const handleCloseCallback = useCallback(async event => {
        resetProgressBar()
        await sleep(500)
        if (!isError) setIsProgressBarDone(true)
        setShow(false)
    }, [setShow, setIsProgressBarDone, isError, resetProgressBar])


    const updateProgressBar = useCallback(async () => {
        if (fakeProgressTracker === 100 && !isError)
            setBgVariant("success")
        else if (fakeProgressTracker === 100 && isError)
            setBgVariant("danger")
        if (fakeProgressTracker === 100) {
            setIsNewSubmit(false)
            await sleep(1000)
            setIsCloseBtnDisabled(false)
        }
    }, [fakeProgressTracker, isError, setIsNewSubmit])

    useEffect(() => {
        async function showEndProgressForABit() {
            await updateProgressBar()
        }
        // Note: To clear the timer, we have to name it.
        let timer = setTimeout(async () => {
            if (fakeProgressTracker === 0) await sleep(100)
            if (fakeProgressTracker < 100 && isNewSubmit)
                setFakeProgressTracker(fakeProgressPercentage => fakeProgressPercentage + 1);
        }, 5);

        showEndProgressForABit()
        return () => clearTimeout(timer)
    }, [fakeProgressTracker, updateProgressBar, isNewSubmit]);

    return (

        <>
            <Modal
                show={show}
                onHide={handleCloseCallback}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className="bg-dark text-primary" closeButton >
                    <Modal.Title className="container-fluid text-center">Submission Status</Modal.Title>
                </Modal.Header>
                <Modal.Body className="container-fluid modal-body text-center">
                    <div className="my-4">
                        <div className="progress" style={{ height: "13px" }}>
                            <div className={`progress-bar progress-bar-striped progress-bar-animated bg-${bgVariant}`} style={{ width: fakeProgressTracker + "%" }}>
                                {fakeProgressTracker}%
                            </div>
                        </div>
                        <div className="container text-center text-white mt-1">
                            {(fakeProgressTracker === 100 && !isError) &&
                                <span className="text-center">
                                    You have successfully {`${submissionSuccessMessage}`}
                                </span>
                            }
                            {(fakeProgressTracker === 100 && isError) &&
                                <span>
                                    {`${submissionStatusString}`}
                                </span>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <footer className="container-fluid bg-dark text-center py-2">
                    <Button className="px-5 m-1" variant="primary" onClick={handleCloseCallback} disabled={isCloseBtnDisabled}>OK</Button>
                </footer>
            </Modal>
        </>
    );
}

export default SubmissionStatusModal;