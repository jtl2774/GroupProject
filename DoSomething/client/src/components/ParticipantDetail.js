import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
const ParticipantDetail = () => {
    const {id} = useParams(); 
    const [participant, setParticipant] = useState(""); 
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    useEffect(() => {

        api.get('http://localhost:8000/api/user/' + id).then(response=>{
            setParticipant(response.data.participant);
        })
        .catch(err => console.log(err))
      }, []);

    
    return (
        <div className="container">
            <div className='border border-dark-subtle'>
            <div className="participant">
            <div className="participant-name"><h2>{participant.firstName}</h2></div><div className="participant-picture"><img src="https://i.ibb.co/R6XWKCp/profile.jpg" width="50" /></div>
            </div>
            <table>
            <tbody>
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
        </div>
    )
}
export default ParticipantDetail;

