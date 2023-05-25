import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {
    const {username, setUsername} = props;
    useEffect(() => {
        // using the info we store in localstorage to set State for displaying info or other use
        setUsername(localStorage.getItem("firstName"));
    }, [])
            // using the info we store in localstorage to set State for displaying info or other use
            //setUsername(localStorage.getItem("firstName"));

    const navigate = useNavigate();
    const logout=()=>{
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) =>{
                localStorage.clear();//clear localStorage
                setUsername(""); //set username back to blank 
                console.log(res);
                navigate('/');
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    return (
        
        <div className='row' style={{padding:"20px", backgroundImage:"linear-gradient(hotpink, grey)"}}>
            <div className='col-7' style={{paddingLeft:"150px", textAlign:"left"}}>
                <h1 style={{color:"white"}}>DoSomething Together 
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                    </svg>
                </h1>
                <h3>Let's meet, make friends, and enjoy life!</h3>
            </div>
            <div className='col-1 text-white'>
                {
                    username?
                    <h4> Hi {username}!</h4>:
                    <p>Please login</p>
                }
            </div>
            <div className='nav nav-justified col-4' style={{alignItems:"center"}}>
                
                <Link to={'/dashboard'} style={{color:"White"}} className='nav-link'>Dashboard</Link>
                <Link to={'/createEvent'} style={{color:"White"}} className='nav-link'>Create Your Event</Link>
                <Link to={'/myAccount'} style={{color:"White"}} className='nav-link'>Profile</Link>
                <button className="btn btn-danger" onClick={logout} style={{color:"white", background:"red"}} >Logout</button>
            </div>
            
        </div>
    );
}

export default Nav;
