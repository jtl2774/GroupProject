import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const DashboardForm = (props) => {
    const {username, setUsername} = props;
    const navigate = useNavigate();
    //keep track of what is being typed via useState hook
    const [eventList, setEventList] = useState([]); 
    const [userId, setUserId] = useState("");
    const api = axios.create({ withCredentials: true });

    useEffect(() => {
        //let uId = localStorage.getItem("id");
        //setUserId(uId);
        setUsername(localStorage.getItem("firstName"));
        

        api.get('http://localhost:8000/api/events').then(response => {
            let list = [];
            for (let i in response.data.events) {
                list.push(response.data.events[i]);
            }

            console.log(list);

            setEventList(list)
        });

    }, []);


    return (
        <div className="container">
            <h2>Pick something fun to join!</h2>
            <table className="table">
            <tr>
                <th scope="col">Location</th>
                <th scope="col">Activity</th>
                <th scope="col">Organizer</th>
                <th scope="col">Action</th>
            </tr>
            <tbody>
            {
                    eventList.map( (event, index) => 
                    <tr className='language-class'>
                    <td>{event.location}</td>
                    <td>{event.activity}</td>
                    <td>{event.organizer}</td>
                    <td>
                    <div>
                        <Link to={"/eventDetail/" + event._id}>
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
export default DashboardForm;

