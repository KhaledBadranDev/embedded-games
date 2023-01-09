import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GameCard from './GameCard';

const StructureGamesCards = (gamesArr, platform) => {
    return (
        <article className="container">
            <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: gamesArr.length }).map((_, i) => (
                    <Col key={gamesArr[i]["id"]} >
                        <GameCard gameObj={gamesArr[i]}></GameCard>
                    </Col>
                ))} 
            </Row>
        </article>
    );
}

export default StructureGamesCards;