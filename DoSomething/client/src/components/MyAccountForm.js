import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const MyAccountForm = () => {
    const navigate = useNavigate();
    //keep track of what is being typed via useState hook
    const [eventList, setEventList] = useState([]);
    const [participantList, setParticipantList] = useState([]);
    const api = axios.create({ withCredentials: true });

    useEffect(() => {
        api.get('http://localhost:8000/api/my-events').then(response => {
            let list = [];
            for (let i in response.data.events) {
                list.push(response.data.events[i]);
            }

            console.log(list);

            setEventList(list)
        });

        api.get('http://localhost:8000/api/subscriptions').then(response => {
            let list = [];
            for (let i in response.data.participants) {
                list.push(response.data.participants[i]);
            }
            console.log("Participant");
            console.log(list);

            setParticipantList(list)
        });

    }, []);


    const deleteEvent = (id) => {
        api.delete('http://localhost:8000/api/event/delete/' + id)
            .then(res => {
                console.log(res); // always console log to get used to tracking your data!
                setEventList(
                    [
                        ...eventList.filter(event => event._id != id),
                    ]);
                setParticipantList(
                    [
                        ...participantList.filter(participant => participant.eventId != id),
                    ]);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h3>You are hosting...</h3>
            <table className="table">
            <tr>
                <th scope="col">Location</th>
                <th scope="col">Activity</th>
                <th scope="col">Action</th>
            </tr>
            <tbody>
            {
                    eventList.map( (event, index) => 
                    <tr className='event'>
                    <td>{event.location}
                    </td>
                    <td>{event.activity}</td>
                    <td>
                    <div>
                        <Link to={"/eventDetail/" + event._id}>
                            View
                        </Link>
                        <span className="space">|</span>
                        <Link to={"/editEvent/" + event._id}>
                            Edit
                        </Link>
                        <span className="space">|</span>
                        <Link onClick={(e)=>{deleteEvent(event._id)}}>
                            Delete
                        </Link>
                        </div>
                    </td>
                    </tr>

                    )
                }
                </tbody>
            </table>
            <br />
            <br />
            <h3>You are going ...</h3>
            <table className="table">
            <tr>
                <th scope="col">Location</th>
                <th scope="col">Activity</th>
                <th scope="col">Action</th>
            </tr>
            <tbody>
            {
                    participantList.map( (participant, index) => 
                    <tr className='event'>
                    <td>{participant.location}
                    </td>
                    <td>{participant.activity}</td>
                    <td>
                    <div>
                        <Link to={"/eventDetail/" + participant.eventId}>
                            View
                        </Link>
                        </div>
                    </td>
                    </tr>

                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default MyAccountForm;

