import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useCallback } from "react";


export default function GameCard({gameObj, setSelectedGame}) {
    // using arrow functions or binding in JSX is a bad practice as it hurts the performance.
    // because the function is recreated on each render.
    // to solve this issue, use the callback with the useCallback() hook,
    // and assign the dependencies to an empty array.
    const handelPlayGame = useCallback(event => {
        event.preventDefault()
        setSelectedGame(gameObj)
    }, [gameObj, setSelectedGame])

    return (
        <Card className="bg-dark">
            <Card.Img variant="top" src={gameObj["image"]} />
            <Card.Body className="text-white">
                <Card.Title className="text-center h6">{gameObj["title"]}</Card.Title>
                <Card.Text className="text-muted mb-0">author: {gameObj["author"]["username"]}</Card.Text>
                <Card.Text className="text-muted">admin: {gameObj["adminEmail"]}</Card.Text>
                <div className="d-grid gap-2">
                    <Button variant="primary" onClick={handelPlayGame}>Play</Button>
                </div>
            </Card.Body>
        </Card>
    )
}
