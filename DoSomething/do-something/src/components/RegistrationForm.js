import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const Registration = () => {

    const api = axios.create({ withCredentials: true });

    const [errors, setErrors] = useState([]); 
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(""); 
    const [gender, setGender] = useState(""); 
    const [location, setLocation] = useState(""); 
    const [aboutMe, setAboutMe] = useState(""); 
    const [picture, setPicture] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [cwPassword, setCwPassword] = useState(""); 
    const navigate = useNavigate();

      const registerUser = (e) => {

        e.preventDefault();

        api.post('http://localhost:8000/api/register', {
            firstName,
            lastName,
            email,
            gender,
            location,
            aboutMe,
            picture,
            password,
            cwPassword
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                localStorage.setItem("id", res.data._id);
                navigate("/dashboard");
            })
            .catch(err=>{
                let errorResponse = err.response.data.error.message; // Get the errors from err.response.data
                if (!errorResponse) {
                    errorResponse = err.response.data.message;
                }
                setErrors([errorResponse]);
            })
    }

    return (
        <div class="container">
            <div class="top1">
                <div class="top-left">
                    <h2>DoSomething Together</h2>
                    <p>Let's meet, make friends and enjoy life!</p>
                </div>
                <div class="top-right">
                <div>
                <span class="menu-item">
                <Link to={"/dashboard"}>
                    Dashboard
                </Link>
                </span>
                <span class="menu-item">
                <Link to={"/myAccount"}>
                    My Account
                </Link>
                </span>
                </div>
                <div>
                <span class="menu-item">
                <Link to={"/createActivity"}>
                    Create Activity
                </Link>
                </span>
                <span class="menu-item">
                <Link to={"/logout"}>
                    Log Out
                </Link>
                </span>
                </div>
                </div>
            </div>

        <div class="login-registration">
        <div class="registration-form">
        <fieldset>
        {errors.map((err, index) => <p class="error" key={index}>{err}</p>)}
        <form onSubmit={registerUser}>
            <div class="register-form">
        <div class="form-left">
        <div class="center">Register</div>
        <table>
            <tbody>
            <tr>
                <td>
                <label>First Name:</label>
                </td><td> 
                <input name="firstName" value={firstName} onChange = {(e)=>setFirstName(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Last Name:</label>
                </td><td> 
                <input name="lastName" value={lastName} onChange = {(e)=>setLastName(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Email:</label>
                </td><td> 
                <input name="email" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Password:</label>
                </td><td> 
                <input name="password" type="password" value={password} onChange = {(e)=>setPassword(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Confirm PW:</label>
                </td><td> 
                <input name="cwPassword" type="password" value={cwPassword} onChange = {(e)=>setCwPassword(e.target.value)}/>
                </td>
            </tr>
                </tbody>
        </table>
        </div>
        <div class="form-right">
        <table class="top-margin">
            <tbody>
            <tr>
                <td>
                <label>Gender:</label>
                </td><td> 
                <input name="gender" value={gender} onChange = {(e)=>setGender(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Location:</label>
                </td><td> 
                <input name="location" value={location} onChange = {(e)=>setLocation(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>About Me:</label>
                </td><td> 
                <textarea name="aboutMe" value={aboutMe} onChange = {(e)=>setAboutMe(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Picture URL:</label>
                </td><td> 
                <small><b>Example:</b> https://i.ibb.co/R6XWKCp/profile.jpg</small><br />
                <input name="picture" className="picture-url" placeholder="https://i.ibb.co/R6XWKCp/profile.jpg" value={picture} onChange = {(e)=>setPicture(e.target.value)}/>
                </td>
            </tr>
                </tbody>
        </table>
        </div>
        </div>
        <div class="center">
        <input class="b1 loginbtn" type="submit" value="Create Account"/>
        </div>
        <div class="center">
            <br />
        <Link to={"/"}>
            Already have an account?
        </Link>
        </div>
        </form>  
        </fieldset>
        </div>
        </div>  
        </div>
    )
}
export default Registration;

