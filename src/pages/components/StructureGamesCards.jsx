import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GameCard from './GameCard';
// import SelectedGameModal from './SelectedGameModal';
import { useState } from "react";

const StructureGamesCards = (gamesArr, platform) => {
    const [selectedGame, setSelectedGame] = useState({})


    return (
        <article className="container">
            <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: gamesArr.length }).map((_, i) => (
                    <Col key={gamesArr[i]["id"]} >
                        <GameCard gameObj={gamesArr[i]} setSelectedGame={setSelectedGame} ></GameCard>
                    </Col>
                ))} 
            </Row>
            {/* selectedGame 👈 to check if the obj null or undefined */}
            { (selectedGame && Object.keys(selectedGame).length !== 0) && 
                <>
                    {console.log("selectedGame", selectedGame)}
                </>
            }
        </article>
    );
}

export default StructureGamesCards;