import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GameCard from './GameCard';
import SelectedGameModal from './SelectedGameModal';
import { useEffect, useState } from "react";

const StructureGamesCards = (gamesArr, platform) => {
    const [selectedGame, setSelectedGame] = useState({})

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
    }, [selectedGame]);

    return (
        <article className="container">
            <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: gamesArr.length }).map((_, i) => (
                    <Col key={gamesArr[i]["id"]} >
                        <GameCard gameObj={gamesArr[i]} setSelectedGame={setSelectedGame} ></GameCard>
                    </Col>
                ))}
            </Row>
            {(selectedGame && Object.keys(selectedGame).length !== 0) &&
                <SelectedGameModal selectedGame={selectedGame} platform={platform}>
                    {/* {console.log("hi")} */}
                </SelectedGameModal>
            }
        </article>
    );
}

export default StructureGamesCards;