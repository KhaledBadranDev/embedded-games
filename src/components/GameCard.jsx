import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const GameCard = (props) => {
    // props here is an array of games
    return (
        <article className="container">
            {/* <h1>{props.gameType}</h1> */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: props.length }).map((_, idx) => (
                    <Col>
                        <Card className="bg-dark">
                            <Card.Img variant="top" src={require("../assets/logo.jpg")}/>
                            <Card.Body className="text-white">
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>

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

// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

// const GameCard = (props) => {
//     return (
//         <section id={props.gameId}>
//             <Card class="card mb-3">
//                 <Card.Img variant="top" src="holder.js/100px180" />
//                 {/* {props.gameType === 'scratch' &&
//                     <iframe src={`https://scratch.mit.edu/projects/${props.gameId}/embed`} allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>
//                 }
//                 {props.gameType === 'codesters' &&
//                     <iframe src={`https://www.codesters.com/embed/v1/preview/${props.gameId}/`} height="680" width="500" seamless="seamless" frameBorder="0"></iframe>
//                 } */}
//                 <Card.Body>
//                     <Card.Text>
//                         Some quick example text to build on the card title and make up the
//                         bulk of the card's content.
//                     </Card.Text>
//                     <Button variant="primary">Go somewhere</Button>
//                 </Card.Body>
//             </Card>
//         </section>
//     );
// }

// export default GameCard;