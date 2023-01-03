import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ScratchGameCard from './ScratchGameCard';
import CodestersGameCard from './CodestersGameCard';

const GamesCard = (gamesArr, platform) => {
    return (
        <article className="container">
            <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: gamesArr.length }).map((_, i) => (
                    <Col key={gamesArr[i]["id"]} >
                        { platform === "scratch" &&
                            <ScratchGameCard gameObj={gamesArr[i]}></ScratchGameCard>
                        }
                        { platform === "codesters" &&
                            <CodestersGameCard></CodestersGameCard>
                        }
                    </Col>
                ))} 
            </Row>
        </article>
    );
}

export default GamesCard;