import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SelectedGameModal = ({selectedGame, platform}) => {
	const [show, setShow] = useState(true);
	const handleClose = () => {
		setShow(false)
	}
	// const handleShow = () => setShow(true);

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{selectedGame["title"]}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary">Understood</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SelectedGameModal