import React, { useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const LoginForm = () => {

    const api = axios.create({ withCredentials: true });
    const navigate = useNavigate();

    useEffect(() => {

        api.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                console.log(res);
                localStorage.clear();
                navigate("/");
            })
            .catch(err=>{
                console.log(err);
                localStorage.clear();
                navigate("/");
            })
        });

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

            Log Out
        </div>
    )
}
export default LoginForm;

