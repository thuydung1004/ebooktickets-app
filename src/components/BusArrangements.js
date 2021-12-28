import { Card, Button, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function BusArrangements(line) {
    return (
        <Col md={4} xs={12}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Chuyến: <strong>{line.obj.name}</strong>
                    </Card.Title>

                    <Card.Title>
                        Hạng: <strong>{line.obj.description}</strong>
                    </Card.Title>
                    
                    <Card.Text>
                        <div className="my-3">
                            Ngày tạo: {line.obj.departure_day} <br/>
                            Ngày - giờ khởi hành: <br/>{line.obj.departure_time}<br/>
                            Ngày - giờ đến: <br/>{line.obj.next_hour}<br/>
                        </div>
                    </Card.Text>
                    
                    <Card.Text>
                        Giá vé: ${line.obj.ticket_price}
                    </Card.Text>
                    <Link to= {`/busarrangements/${line.obj.id}`} >
                        <Button>Đặt vé</Button>
                    </Link>
                </Card.Body>
            </Card>      
        </Col>
    )
}