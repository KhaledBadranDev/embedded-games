import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./SelectedGameModal.css"
const SelectedGameModal = ({ selectedGame, platform, show, setShow }) => {

    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
	const handleCloseCallback = useCallback(() => setShow(false), [setShow])
	const handleShowCodeCallback = useCallback(() => {
		if (platform.toLowerCase() === "scratch") window.open(`https://scratch.mit.edu/projects/${selectedGame["id"]}`)
		else window.open(`https://www.codesters.com/preview/${selectedGame["id"]}/`)
	}, [])

	return (
		<>
			<Modal
				dialogClassName="my-modal-style"
				show={show}
				onHide={handleCloseCallback}
				backdrop="static"
				keyboard={false}
				centered
			>
				<Modal.Header className="bg-dark" closeButton >
					<Modal.Title className="container-fluid text-center">{selectedGame["title"]}</Modal.Title>
				</Modal.Header>
				<Modal.Body className="container-fluid modal-body text-center">
					{platform.toLowerCase() === "scratch" &&
						<iframe
							title="selected-scratch-game"
							src={`https://scratch.mit.edu/projects/${selectedGame["id"]}/embed`}
							allowtransparency="true"
							width="485"
							height="402"
							frameborder="0"
							scrolling="no"
							allowfullscreen>
						</iframe>
					}
					{platform.toLowerCase() === "codesters" &&
						<iframe
							title="selected-codesters-game"
							src={`https://www.codesters.com/embed/v1/preview/${selectedGame["id"]}/`}
							height="680"
							width="500"
							seamless="seamless"
							frameBorder="0">
						</iframe>
					}
				</Modal.Body>
				<footer className="container-fluid bg-dark text-center py-2">
					<div className="text-muted text-start mx-3 mt-1 mb-3">
						<span className="d-block">{`author: ${selectedGame["author"]["username"]}`}</span>
						<span className="d-block">{`admin: ${selectedGame["adminEmail"]}`}</span>
						<span className="d-block">{`description: ${selectedGame["description"]}`}</span>
						{platform.toLowerCase() === "scratch" &&
							<span className="d-block">{`instructions: ${selectedGame["instructions"]}`}</span>
						}
					</div>
					<Button className="px-5 m-1" variant="primary" onClick={handleCloseCallback}>Close</Button>
					<Button className="px-4 m-1" variant="primary" onClick={handleShowCodeCallback}>Show Code</Button>
				</footer>
			</Modal>
		</>
	);
}

export default SelectedGameModal