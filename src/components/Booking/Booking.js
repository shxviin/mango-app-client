import { Form, Button, Card, Alert } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setBookingsAction } from '../../redux/actions/bookingActions';


const Booking = () => {

    const paymentTypes = [ 'Cash', 'Credit/Debit Card']

    const stayTypes = [ 'Bed and Breakfast', 'Full-Board', 'Half-Board']

    const guestsTypes = [ 'Single', 'Double', 'Triple']

    const history = useHistory();
    const {rId} = useParams();
    const dispatch = useDispatch();
    const {bookings} = useSelector((state) => state.allBookingsSelectedDates);

    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().slice(0, 10));
    const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10));
    const [noOfGuests, setNoOfGuests] = useState(guestsTypes[0]);
    const [typeOfStay, setTypeOfStay] = useState(stayTypes[0]);
    const [roomRate, setRoomRate] = useState('');
    const [noOfNights, setNoOfNights] = useState(1);
    const [parkingRequired, setParkingRequired] = useState(false);
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(paymentTypes[0]);

    const today = new Date().toISOString().slice(0, 10);
    const currentCheckInDate = new Date(checkInDate).setDate(new Date(checkInDate).getDate() + 1);
    const checkInNextDate = new Date(currentCheckInDate).toISOString().slice(0, 10);
  
    const onCheckInDateChanged = (e) => {
        setCheckInDate(e.target.value);
        let currentCheckInDate = new Date(e.target.value).setDate(new Date(e.target.value).getDate() + 1);
        let checkInNextDate = new Date(currentCheckInDate).toISOString().slice(0, 10);
        setCheckOutDate(checkInNextDate);
    }

    const typeOfStayList = stayTypes.map((type, index) => {
        return <option value={type} key={index}>{type}</option>
    })
    
    const guestsList = guestsTypes.map((type, index) => {
        return <option value={type} key={index}>{type}</option>
    })

    const paymentTypeList = paymentTypes.map((type, index) => {
        return <option value={type} key={index}>{type}</option>
    })
    

    const getRoomRate = async () => {

        const data = {
            "numOfGuests": noOfGuests,
            "stayType": typeOfStay
        }

        await axios.post('http://localhost:5000/roomRates/get', data)
        .then((response) =>{
            setRoomRate(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const validateBooking = async () => {

        await axios.post('http://localhost:5000/bookings/validate/'+rId, {"checkIn": checkInDate, "checkOut": checkOutDate})
        .then((response) =>{
            dispatch(setBookingsAction(response.data));
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const onAddBooking = async (e) => {

        const data = {
            "roomId": rId,
            "checkInDate": checkInDate,
            "checkOutDate": checkOutDate,
            "isParkingSlotRequired": parkingRequired,
            "notes": notes,
            "fee": noOfNights * roomRate,
            "paymentMethod": paymentMethod,
            "numOfGuests": noOfGuests,
            "typeOfStay": typeOfStay
        }

        await axios.post('http://localhost:5000/bookings/add', data)
        .then((response) =>{
            alert('Booking successful');
        })
        .catch((err) => {
            console.log(err);
        });
        history.push("/");
    };

    useEffect(()  => {
        validateBooking();
        const timeDifference = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
        setNoOfNights(timeDifference / (1000 * 3600 * 24));
    }, [checkInDate, checkOutDate])

    useEffect(()  => {
        getRoomRate();
    }, [noOfGuests, typeOfStay])


    return (
        <div style={{width:"80%", margin:"auto", marginTop:"1%"}}>
        <Card>
        <Card.Body>
            <Form style={{width:'90%', margin:"auto", marginTop:"1%"}}>
            <Form.Row>
                <Form.Group controlId="formBasicCheckin" style={{width:'22%', marginRight:"2%"}}>
                    <Form.Label>Check-in</Form.Label>
                    <Form.Control type="date" placeholder="Check-in" value={checkInDate} min={today} onChange={onCheckInDateChanged}/>
                </Form.Group>

                <Form.Group controlId="formBasicCheckout" style={{width:'22%', marginRight:"2%"}}>
                    <Form.Label>Check-out</Form.Label>
                    <Form.Control type="date" placeholder="Check-out" value={checkOutDate} min={checkInNextDate} onChange={(e) => setCheckOutDate(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicNumGuests" style={{width:'22%', marginRight:"2%"}}>
                    <Form.Label>Number of Guests</Form.Label>  
                    <Form.Control required as="select" value={noOfGuests} onChange={e => {setNoOfGuests(e.target.value)}}>
                        {guestsList}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicTypeStay" style={{width:'22%', marginRight:"2%"}}>
                    <Form.Label>Type of stay</Form.Label>  
                    <Form.Control value={typeOfStay} as="select" onChange={e => {setTypeOfStay(e.target.value   )}}>
                        {typeOfStayList}
                    </Form.Control>
                </Form.Group>

                
                
            </Form.Row>
            
            <p style={{color:'red'}}><i>*Room Rate per night ${roomRate}</i></p>
            </Form>
            </Card.Body>
        </Card>
        {bookings.length >0 ?
        <Alert variant="danger" style={{marginTop:"1%"}}>
            Sorry, room not available for your search criteria. 
        </Alert>: <p></p>
        }

        <Card>
        <Card.Body>
            <Card.Title>Booking Summary</Card.Title>
            <hr></hr>
            <Card.Text>
                <b>Check-in Date : </b>{checkInDate}
            </Card.Text>
            <Card.Text>
                <b>Check-out Date : </b>{checkOutDate}
            </Card.Text>
            <Card.Text>
                <b>Number of Guests : </b>{noOfGuests}
            </Card.Text>
            <Card.Text>
                <b>Type of Stay : </b>{typeOfStay}
            </Card.Text>
            <Card.Text>
                <b>Number of nights of stay : </b>{noOfNights}
            </Card.Text>
            <Card.Text>
                <b>Price for your booking : </b>${noOfNights * roomRate}
            </Card.Text>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Parking slot required" onChange={e => {setParkingRequired(e.target.checked)}}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => {setNotes(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicPaymentType" style={{width:'22%', marginRight:"2%"}}>
                <Form.Label>Payment Type</Form.Label>  
                <Form.Control value={paymentMethod} as="select" onChange={e => {setPaymentMethod(e.target.value)}}>
                    {paymentTypeList}
                </Form.Control>
            </Form.Group>

            <Button onClick={onAddBooking} variant="success" disabled={bookings.length >0} type="button" style={{margin:"auto"}}>
                    Book Now
            </Button>

        </Card.Body>
        </Card>
        </div>
    )
}

export default Booking;