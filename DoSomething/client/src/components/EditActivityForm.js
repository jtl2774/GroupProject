import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
const EditActivityForm = () => {
    const {id} = useParams(); 
    const [location, setLocation] = useState(""); 
    const [activity, setActivity] = useState(""); 
    const [dateAndTime, setDateAndTime] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [errors, setErrors] = useState([]); 
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
    
      }, []);

    const editActivity= (e) => {
        e.preventDefault();

        api.put('http://localhost:8000/api/activity/edit/' + id, {
            location,
            activity,
            dateAndTime,
            address,
            description
        })
            .then(res => {
                console.log(res);
                navigate("/myAccount"); // this will take us back to the myAccount
            })
            .catch(err=>{
                try {
                    let errorResponse = err.response.data.errors.message; // Get the errors from err.response.data
                    if (!errorResponse) {
                        errorResponse = err.response.data.message;
                    }
                    setErrors([errorResponse]);
                } catch (e) {
                    console.log(e);
                    setErrors(["There was an error, please try again"]);
                }   
            })
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
            <fieldset>
            {errors.map((err, index) => <p className="error" key={index}>{err}</p>)}
            <form onSubmit={editActivity}>
            <table>
            <tbody>
            <tr>
                <td>
                <label>Location:</label>
                </td><td> 
                <input className="large-input" type="text" 
                    name="location" 
                    value={location}
                    onChange = {(e)=>setLocation(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td>
                <label>Activity:</label>
                </td><td> 
                <input className="large-input" type="text" 
                    name="activity" 
                    value={activity}
                    onChange = {(e)=>setActivity(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td>
                <label>Date/Time:</label>
                </td><td> 
                <input className="large-input" type="text" 
                    name="dateAndTime" 
                    value={dateAndTime}
                    onChange = {(e)=>setDateAndTime(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td>
                <label>Address:</label>
                </td><td> 
                <input className="large-input" type="text" 
                    name="address" 
                    value={address}
                    onChange = {(e)=>setAddress(e.target.value)} />
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                <label>Description:</label>
                </td>
            </tr>
            <tr>
                <td colSpan="2">
                <textarea className="large-textarea" type="text" 
                    name="description" 
                    value={description}
                    onChange = {(e)=>setDescription(e.target.value)} />
                </td>
            </tr>
            <tr>
            <td className="submit-button" colSpan="2">
                <div className="center">
            <input className="b1" type="submit" value="Edit"/>
            </div>
            </td>
            </tr>
                </tbody>
        </table>
            </form>
            </fieldset>
        </div>
    )
}
export default EditActivityForm;

