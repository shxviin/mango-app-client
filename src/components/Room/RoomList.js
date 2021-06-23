import {useParams} from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import RoomCard from './RoomCard';

const RoomList = () => {

    const {pId} = useParams();

    const [rooms, setRooms] = useState([]);

    const fetchRooms = async () => {
        await axios.get('http://localhost:5000/rooms/property/'+pId)
        .then((response) =>{
            // dispatch(setContactsAction(response.data));
            console.log(response.data);
            setRooms(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchRooms();
    }, []);


    const roomList = rooms.sort((a,b) => (a.roomId > b.roomId) ? 1 : -1).map((room) => {
        return (
            <RoomCard key={room._id} room={room}></RoomCard>
        )
    })

    return(
        <div>
            {roomList}
        </div>
        
    )
}

export default RoomList;