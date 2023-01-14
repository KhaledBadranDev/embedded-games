import { useCallback, useEffect, useState } from "react";
import { sleep } from "../../utils/utils"
/**
 * 
 * @param {*} param0 
 * @param {} param0
 * @returns 
 */
const SubmissionStatus = ({ submissionSuccessMessage, submissionStatusString, isError, isNewSubmit, setIsNewSubmit, setIsProgressBarDone, setDisableButtons }) => {
    const [bgVariant, setBgVariant] = useState("primary")
    const [fakeProgressTracker, setFakeProgressTracker] = useState(0)

    const updateProgressBar = useCallback(async () => {
        let isProgressBarDone = false
        if (fakeProgressTracker === 100 && !isError)
            setBgVariant("success")
        else if (fakeProgressTracker === 100 && isError)
            setBgVariant("danger")
        
        isProgressBarDone = true
        if (fakeProgressTracker === 100 && isProgressBarDone && isNewSubmit) {
            await sleep(4000)
            setIsProgressBarDone(isProgressBarDone)
            if (setDisableButtons !== null && Array.isArray(setDisableButtons))
                for (const disableButtonSetterFun of setDisableButtons) {
                    disableButtonSetterFun(false)
                }
            setFakeProgressTracker(0)
            setBgVariant("primary")
        }
    }, [fakeProgressTracker, isError, isNewSubmit, setDisableButtons, setIsProgressBarDone])

    useEffect(() => {
        if (isNewSubmit) {

            async function showEndProgressForABit() {
                await updateProgressBar()
            }
            showEndProgressForABit()
            // Note: To clear the timer, we have to name it.
            let timer = setTimeout(async () => {
                if (fakeProgressTracker < 100) {
                    setFakeProgressTracker(fakeProgressPercentage => fakeProgressPercentage + 1);

                }
                else setIsNewSubmit(false)
            }, 10);

            return () => clearTimeout(timer)
        }
    }, [fakeProgressTracker, updateProgressBar, isError, isNewSubmit, setIsNewSubmit, setIsProgressBarDone, setDisableButtons]);

    return (
        <div className="my-4">
            <div className="progress" style={{ height: "13px" }}>
                <div className={`progress-bar progress-bar-striped progress-bar-animated bg-${bgVariant}`} style={{ width: fakeProgressTracker + "%" }}>
                    {fakeProgressTracker}%
                </div>
            </div>
            <div className="container text-center text-white mt-1">
                {(fakeProgressTracker === 100 && !isError) &&
                    <span className="text-center">
                        You have successfully {`${submissionSuccessMessage}.`}
                    </span>
                }
                {(fakeProgressTracker === 100 && isError) &&
                    <span>
                        {`${submissionStatusString}`}
                    </span>
                }
            </div>
        </div>
    );
}

export default SubmissionStatus;