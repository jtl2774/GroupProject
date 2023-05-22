import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
const ActivityDetail = () => {
    const {id} = useParams(); 
    const [participantList, setParticipantList] = useState([]); 
    const [location, setLocation] = useState(""); 
    const [activity, setActivity] = useState(""); 
    const [dateAndTime, setDateAndTime] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [description, setDescription] = useState(""); 
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    useEffect(() => {

        api.get('http://localhost:8000/api/activity/' + id).then(response=>{
          console.log(response.data.activity);
          setLocation(response.data.activity.location);
          setActivity(response.data.activity.activity);
          setDateAndTime(response.data.activity.dateAndTime);
          setAddress(response.data.activity.address);
          setDescription(response.data.activity.description);
        });

        api.get('http://localhost:8000/api/participants/' + id).then(response=>{
            let list = [];
            for (let i in response.data.participants) {
              list.push(response.data.participants[i]);
            }
  
            console.log(list);
  
            setParticipantList(list)
          });
    

      }, []);
    
      const joinActivity = () => {
        api.get('http://localhost:8000/api/subscription/join/' + id)
            .then(res => {
                console.log(res); // always console log to get used to tracking your data!
                navigate("/myAccount"); // this will take us back to the myAccount
            })
            .catch(err => console.log(err))
    }

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
            <div className="columns">
            <div className="left-activity">
            <h2>{activity}</h2>
            <table>
            <tbody>
            <tr>
                <td>
                <label>Date/Time:</label>
                </td><td> 
                {dateAndTime}
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
                {description}
                </td>
            </tr>
            <tr>
            <td className="submit-button" colSpan="2">
                <span className="join">
                <Link className="button" onClick={joinActivity}>
                Join
                </Link>
                </span>
                <span className="back">
                    <a className="button" href="/myAccount">Back</a>
                </span>
            </td>
            </tr>
                </tbody>
        </table>
        </div>
        <div className="left">
<h4>Who is Coming?</h4>
<div className="participants">
{
     participantList.map( (participant, index) => 
     <Link to={"/participantDetail/" + participant.userId}>
        <div className="profile">
            <div><img src={participant.picture} width="50" /></div>
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
export default ActivityDetail;