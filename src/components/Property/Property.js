import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Property = () => {

    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    const properties = [
        {
            id: "mSun",
            name: "Mango Sun",
            description: loremIpsum
        },
        {
            id: "mSea",
            name: "Mango Sea",
            description: loremIpsum
        },
        {
            id: "mHills",
            name: "Mango Hills",
            description: loremIpsum
        }
    ]

    const renderPropertyList = properties.map((property) => {
        return(
            <div style={{width:"80%", margin:"auto", marginTop:"1%"}}>
                <Card key={property.id}>
                <Card.Body>
                    <Card.Title>{property.name}</Card.Title>
                    <Card.Text>
                    {property.description}
                    </Card.Text>
                    <Link to={{pathname: `/rooms/${property.id}`}}>
                        <Button 
                        variant="primary">View Rooms</Button>
                    </Link>
                    
                </Card.Body>
                </Card>
            </div>
        )
    });

    return(
        <div>
            {renderPropertyList}
        </div>
        
    )
}

export default Property;