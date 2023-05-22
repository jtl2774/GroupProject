import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const DashboardForm = () => {
    const navigate = useNavigate();
    //keep track of what is being typed via useState hook
    const [activityList, setActivityList] = useState([]); 
    const [userId, setUserId] = useState("");
    const api = axios.create({ withCredentials: true });

    useEffect(() => {
        let uId = localStorage.getItem("id");
        setUserId(uId);

        api.get('http://localhost:8000/api/activities').then(response=>{
          let list = [];
          for (let i in response.data.activities) {
            list.push(response.data.activities[i]);
          }

          console.log(list);

          setActivityList(list)
        });
    
      }, []);


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

            
            <table className="table">
            <tr>
                <th scope="col">Location</th>
                <th scope="col">Activity</th>
                <th scope="col">Organizer</th>
                <th scope="col">Action</th>
            </tr>
            <tbody>
            {
                    activityList.map( (activity, index) => 
                    <tr className='language-class'>
                    <td>{activity.location}</td>
                    <td>{activity.activity}</td>
                    <td>{activity.organizer}</td>
                    <td>
                    <div>
                        <Link to={"/activityDetail/" + activity._id}>
                            View
                        </Link>
                    </div>
                    </td>
                    </tr>

                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default DashboardForm;

