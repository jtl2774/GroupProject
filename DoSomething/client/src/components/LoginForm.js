import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const LoginForm = () => {

    const api = axios.create({ withCredentials: true });
    const [loginErrors, setLoginErrors] = useState([]); 
    const [loginEmail, setLoginEmail] = useState(""); 
    const [loginPassword, setLoginPassword] = useState(""); 
    const navigate = useNavigate();

    const loginUser = (e) => {

        e.preventDefault();

        api.post('http://localhost:8000/api/login', {
            loginEmail,
            loginPassword
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("id", res.data._id);
                navigate("/dashboard");
            })
            .catch(err=>{
                let errorResponse = err.response.data.error.message; // Get the errors from err.response.data
                if (!errorResponse) {
                    errorResponse = err.response.data.message;
                }
                setLoginErrors([errorResponse]);
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

        <div className="login-registration">
        <div className="login-form">
        <fieldset>
        {loginErrors.map((err, index) => <p className="error" key={index}>{err}</p>)}
        <form onSubmit={loginUser}>
        <div className="center">Login</div>
        <table>
            <tbody>
            <tr>
                <td>
                <label>Email:</label>
                </td><td> 
                <input name="email" value={loginEmail} onChange = {(e)=>setLoginEmail(e.target.value)}/>
                </td>
            </tr>
            <tr>
                <td>
                <label>Password:</label>
                </td><td> 
                <input name="password" type="password" value={loginPassword} onChange = {(e)=>setLoginPassword(e.target.value)}/>
                </td>
            </tr>
            <tr>
            <td></td> 
            <td className="submit-button">
            <input className="b1 loginbtn" type="submit" value="Log In"/>
            </td>
            </tr>
                </tbody>
        </table>
        <div className="center">
        <Link to={"/register"}>
            Don't have an account?
        </Link>
        </div>
        </form>  
        </fieldset>
        </div>
        </div>  
        </div>
    )
}
export default LoginForm;

