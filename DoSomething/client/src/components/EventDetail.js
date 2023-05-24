import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
const EventDetail = () => {
    const { id } = useParams();
    const [participantList, setParticipantList] = useState([]);
    const [activity, setActivity] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    useEffect(() => {

        api.get('http://localhost:8000/api/event/' + id).then(response => {
            console.log(response.data.event);
            setActivity(response.data.event.activity);
            setDate(response.data.event.date);
            setAddress(response.data.event.address);
            setDesc(response.data.event.desc);
            setLocation(response.data.event.location);
        });

        api.get('http://localhost:8000/api/participants/' + id).then(response => {
            let list = [];
            for (let i in response.data.participants) {
                list.push(response.data.participants[i]);
            }

            console.log(list);

            setParticipantList(list)
        });


    }, []);

    const joinEvent = () => {
        api.post('http://localhost:8000/api/participant/join/' + id)
            .then(res => {
                console.log(res); // always console log to get used to tracking your data!
                navigate("/myAccount"); // this will take us back to the myAccount
            })
            .catch(err => {
                setErrorMessage(err.response.data.message);
                console.log(err)
            })
    }

    return (
        <div className="container">
            <div className="columns">
                <div className="left-event">
                    <h2>{activity}</h2>
                    <table>
                        <tbody>
                        <tr>
                                <td>
                                    <label>Location:</label>
                                </td><td>
                                    {location}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Date/Time:</label>
                                </td><td>
                                    {date}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Address:</label>
                                </td><td>
                                    {address}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Description:</label>
                                </td><td>
                                    {desc}
                                </td>
                            </tr>
                            <tr>
                                <td className="submit-button" colSpan="2">
                                    <span className="join">
                                        <Link className="button" onClick={joinEvent}>
                                            Join
                                        </Link>
                                    </span>
                                    <span className="back">
                                        <a className="button" href="/myAccount">Back</a>
                                    </span>
                                    {
                                            errorMessage? 
                                            <p style={{color:"red"}}>{errorMessage}</p>: null
                                        }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="left">
                    <h4>Who is Coming?</h4>
                    <div className="participants">
                        {
                            participantList.map((participant, index) =>
                                <Link to={"/participantDetail/" + participant.userId}>
                                    <div className="profile" key={participant._id}>
                                        <div><img src="https://i.ibb.co/R6XWKCp/profile.jpg" width="50" /></div>
                                        <div>{participant.firstName}</div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EventDetail;