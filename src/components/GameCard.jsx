import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const GameCard = (gamesArr) => {
    return (
        <article className="container">
            <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: gamesArr.length }).map((_, i) => (
                    <Col key={gamesArr[i]["id"]} >
                        <Card className="bg-dark">
                            <Card.Img variant="top" src={require("../assets/logo.jpg")}/>
                            <Card.Body className="text-white">
                                <Card.Title className="text-center">{gamesArr[i]["title"]}</Card.Title>
                                <Card.Text>{gamesArr[i]["description"]}</Card.Text>
                                <div className="d-grid gap-2">
                                    <Button variant="primary">Play</Button>
                                </div>    
                            </Card.Body>
                        </Card>
                    </Col>
                ))} 
            </Row>
        </article>
    );
}

export default GameCard;