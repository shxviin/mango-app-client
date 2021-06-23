import { Card, Badge, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const RoomCard = (props) => {

    const {_id, roomId, roomName, roomDesc, amenities} = props.room;

    const amenitiesList = amenities.map((amenity, index) => {
        return (
            <Badge key={index} variant="primary" style={{marginRight:"1%"}}>
                {amenity}
            </Badge>
        )
    })

    return(
        <div style={{width:"80%", margin:"auto", marginTop:"1%"}}>
                <Card key={_id}>
                <Card.Body>
                    <Card.Title>{roomName}</Card.Title>
                    <div>
                        {amenitiesList}
                    </div>
                    <Card.Text>
                        {roomDesc}
                    </Card.Text>
                    <Link to={{pathname: `/rooms/book/${roomId}`}}>
                        <Button 
                        variant="success">Book Now</Button>
                    </Link>
                    
                </Card.Body>
                </Card>
            </div>
    )
}

export default RoomCard;