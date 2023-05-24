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
            </div>

            Log Out
        </div>
    )
}
export default LoginForm;

