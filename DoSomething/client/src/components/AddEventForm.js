import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const AddEventForm = () => {
    const [location, setLocation] = useState(""); 
    const [activity, setActivity] = useState(""); 
    const [date, setDate] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [desc, setDesc] = useState(""); 
    const [errors, setErrors] = useState([]); 
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    const addEvent= (e) => {
        e.preventDefault();

        api.post('http://localhost:8000/api/events', {
            location,
            activity,
            date,
            address,
            desc
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
            <h2>Create your event!</h2>
            <fieldset>
            {errors.map((err, index) => <p className="error" key={index}>{err}</p>)}
            <form onSubmit={addEvent}>
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
                    value={date}
                    onChange = {(e)=>setDate(e.target.value)} />
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
                <td colspan="2">
                <label>Description:</label>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                <textarea className="large-textarea" type="text" 
                    name="description" 
                    value={desc}
                    onChange = {(e)=>setDesc(e.target.value)} />
                </td>
            </tr>
            <tr>
            <td className="submit-button" colspan="2">
                <div className="center">
            <input className="b1" type="submit" value="Create"/>
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
export default AddEventForm;

