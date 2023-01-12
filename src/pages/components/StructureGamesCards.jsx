import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GameCard from './GameCard';
import SelectedGameModal from './SelectedGameModal';
import { useState } from "react";

const StructureGamesCards = (gamesArr, platform) => {
    const [selectedGame, setSelectedGame] = useState({})
	const [show, setShow] = useState();

    return (
        <article className="container">
            <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: gamesArr.length }).map((_, i) => (
                    <Col key={gamesArr[i]["id"]} >
                        <GameCard show={show} setShow={setShow} gameObj={gamesArr[i]} setSelectedGame={setSelectedGame} ></GameCard>
                    </Col>
                ))}
            </Row>
            {(selectedGame && Object.keys(selectedGame).length !== 0) &&
                <div>
                    <SelectedGameModal show={show} setShow={setShow} selectedGame={selectedGame} platform={platform}>
                    </SelectedGameModal>
                </div>
            }
        </article>
    );
}

export default StructureGamesCards;