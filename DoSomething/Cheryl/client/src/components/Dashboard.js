import React from 'react';
import { useEffect } from 'react';

const Dashboard = (props) => {
    const {username, setUsername} = props;

    useEffect(() =>{
        // using the info we store in localstorage to set State for displaying info or other use
        setUsername(localStorage.getItem("firstName"));

    }, []);

    return (
        <div>
            dashboard
        </div>
    );
}

export default Dashboard;
