import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
const ParticipantDetail = () => {
    const {id} = useParams(); 
    const [participant, setParticipant] = useState(""); 
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    useEffect(() => {

        api.get('http://localhost:8000/api/user/detail/' + id).then(response=>{
            setParticipant(response.data.participant);
        })
        .catch(err => console.log(err))
      }, []);

    
    return (
        <div className="container">
            <div className="top1">
                <div className="top-left">
                    <h2>DoSomething Together</h2>
                    <p>Let's meet, make friends and enjoy life!</p>
                </div>
                <div className="top-right">
                <div>
                <span className="menu-item">
                <Link to={"/dashboard"}>
                    Dashboard
                </Link>
                </span>
                <span className="menu-item">
                <Link to={"/myAccount"}>
                    My Account
                </Link>
                </span>
                </div>
                <div>
                <span className="menu-item">
                <Link to={"/createActivity"}>
                    Create Activity
                </Link>
                </span>
                <span className="menu-item">
                <Link to={"/logout"}>
                    Log Out
                </Link>
                </span>
                </div>
                </div>
            </div>
            <div className="participant">
            <div className="participant-name"><h2>{participant.firstName}</h2></div><div className="participant-picture"><img src={participant.picture} width="50" /></div>
            </div>
            <table>
            <tbody>
            <tr>
            <td>
                Gender: 
            </td>
            <td>
            {participant.gender}
            </td>
            </tr>
            <tr>
            <td>
                Location: 
            </td>
            <td>
            {participant.location}
            </td>
            </tr>
            <tr>
            <td>
                About Me: 
            </td>
            <td>
            {participant.aboutMe}
            </td>
            </tr>
                </tbody>
        </table>
        </div>
    )
}
export default ParticipantDetail;

