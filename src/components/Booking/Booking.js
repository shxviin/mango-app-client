import { Form, Button, Card, Alert } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setBookingsAction } from '../../redux/actions/bookingActions';


const Booking = () => {

    const {rId} = useParams();
    const dispatch = useDispatch();
    const {bookings} = useSelector((state) => state.allBookingsSelectedDates);

    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().slice(0, 10));
    const [checkOutDate, setCheckOutDate] = useState(new Date().toISOString().slice(0, 10));

    const today = new Date().toISOString().slice(0, 10);
    const currentCheckInDate = new Date(checkInDate).setDate(new Date(checkInDate).getDate() + 1);
    const checkInNextDate = new Date(currentCheckInDate).toISOString().slice(0, 10);
  
    const onCheckInDateChanged = (e) => {
        setCheckInDate(e.target.value);
        let currentCheckInDate = new Date(e.target.value).setDate(new Date(e.target.value).getDate() + 1);
        let checkInNextDate = new Date(currentCheckInDate).toISOString().slice(0, 10);
        setCheckOutDate(checkInNextDate);
    }

    // console.log("checkInDate " + checkInDate);
    // console.log("checkOutDate " + checkOutDate);
    console.log("bookingsForSelectedDates " + bookings);

    const validateBooking = async () => {

        const bookingData = new FormData();
        bookingData.append("checkIn", checkInDate);
        bookingData.append("checkOut", checkOutDate);

        await axios.post('http://localhost:5000/bookings/validate/'+rId, {"checkIn": checkInDate, "checkOut": checkOutDate})
        .then((response) =>{
            dispatch(setBookingsAction(response.data));
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(()  => {
        validateBooking();
    }, [checkInDate, checkOutDate])


    return (
        <div style={{width:"80%", margin:"auto", marginTop:"1%"}}>
        <Card>
        <Card.Body>
            <Form style={{width:'90%', margin:"auto", marginTop:"1%"}}>
            <Form.Row>
                <Form.Group controlId="formBasicCheckin" style={{width:'20%', marginRight:"2%"}}>
                    <Form.Label>Check-in</Form.Label>
                    <Form.Control type="date" placeholder="Check-in" value={checkInDate} min={today} onChange={onCheckInDateChanged}/>
                </Form.Group>

                <Form.Group controlId="formBasicCheckout" style={{width:'20%', marginRight:"2%"}}>
                    <Form.Label>Check-out</Form.Label>
                    <Form.Control type="date" placeholder="Check-out" value={checkOutDate} min={checkInNextDate} onChange={(e) => setCheckOutDate(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicNumAdults" style={{width:'20%', marginRight:"2%"}}>
                    <Form.Label>Number of Guests</Form.Label>  
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicNumAdults" style={{width:'20%', marginRight:"2%"}}>
                    <Form.Label>Type of stay</Form.Label>  
                    <Form.Control as="select">
                        <option>Bed and Breakfast</option>
                        <option>Half-Board</option>
                        <option>Full-Board</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="success" disabled={bookings.length >0} type="submit" style={{width:'10%', marginRight:"2%"}}>
                    Book Now
                </Button>
                
            </Form.Row>
            
            
            </Form>
            </Card.Body>
        </Card>
        {bookings.length >0 ?
        <Alert variant="danger" style={{marginTop:"1%"}}>
            Sorry, room not available for your search criteria. 
        </Alert>: <p></p>
        }
        </div>
    )
}

export default Booking;