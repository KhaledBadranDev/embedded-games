import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function ScratchGameCard({gameObj}) {
    return (
        <Card className="bg-dark">
            <Card.Img variant="top" src={gameObj["image"]} />
            <Card.Body className="text-white">
                <Card.Title className="text-center">{gameObj["title"]}</Card.Title>
                <Card.Text>{gameObj["description"]}</Card.Text>
                <div className="d-grid gap-2">
                    <Button variant="primary">Play</Button>
                </div>
            </Card.Body>
        </Card>
    )
}
