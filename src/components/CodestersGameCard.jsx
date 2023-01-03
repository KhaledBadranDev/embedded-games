import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function CodestersGameCard() {
    return (
        <Card className="bg-dark">
            {/* <Card.Img variant="top" src={gamesArr[i]["image"]} /> */}
            {/* <Card.Body className="text-white"> */}
                {/* <Card.Title className="text-center">{gamesArr[i]["title"]}</Card.Title> */}
                {/* <Card.Text>{gamesArr[i]["description"]}</Card.Text> */}
                <div className="d-grid gap-2">
                    <Button variant="primary">Play</Button>
                </div>
            {/* </Card.Body> */}
        </Card>
    )
}
