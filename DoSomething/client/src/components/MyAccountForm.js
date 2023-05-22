import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const MyAccountForm = () => {
    const navigate = useNavigate();
    //keep track of what is being typed via useState hook
    const [activityList, setActivityList] = useState([]); 
    const [subscriptionList, setSubscriptionList] = useState([]); 
    const api = axios.create({ withCredentials: true });

    useEffect(() => {
        api.get('http://localhost:8000/api/my-activities').then(response=>{
          let list = [];
          for (let i in response.data.activities) {
            list.push(response.data.activities[i]);
          }

          console.log(list);

          setActivityList(list)
        });

        api.get('http://localhost:8000/api/subscriptions').then(response=>{
            let list = [];
            for (let i in response.data.subscriptions) {
              list.push(response.data.subscriptions[i]);
            }
            console.log("Subscription");
            console.log(list);
  
            setSubscriptionList(list)
          });
    
      }, []);


      const deleteActivity = (id) => {
        api.delete('http://localhost:8000/api/activity/delete/' + id)
            .then(res => {
                console.log(res); // always console log to get used to tracking your data!
                setActivityList(  
                [ 
                ...activityList.filter(activity => activity._id != id), 
              ]);
              setSubscriptionList(  
                [ 
                ...subscriptionList.filter(subscription => subscription.activityId != id), 
              ]);
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

            
            <table className="table">
            <tr>
                <th scope="col">Location</th>
                <th scope="col">Activity</th>
                <th scope="col">Action</th>
            </tr>
            <tbody>
            {
                    activityList.map( (activity, index) => 
                    <tr className='activity'>
                    <td>{activity.location}
                    </td>
                    <td>{activity.activity}</td>
                    <td>
                    <div>
                        <Link to={"/activityDetail/" + activity._id}>
                            View
                        </Link>
                        <span className="space">|</span>
                        <Link to={"/editActivity/" + activity._id}>
                            Edit
                        </Link>
                        <span className="space">|</span>
                        <Link onClick={(e)=>{deleteActivity(activity._id)}}>
                            Delete
                        </Link>
                        </div>
                    </td>
                    </tr>

                    )
                }
                </tbody>
            </table>
            <br />
            <br />
            <h3>You are going to...</h3>
            <table className="table">
            <tr>
                <th scope="col">Location</th>
                <th scope="col">Activity</th>
                <th scope="col">Action</th>
            </tr>
            <tbody>
            {
                    subscriptionList.map( (subscription, index) => 
                    <tr className='activity'>
                    <td>{subscription.location}
                    </td>
                    <td>{subscription.activity}</td>
                    <td>
                    <div>
                        <Link to={"/activityDetail/" + subscription.activityId}>
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
export default MyAccountForm;

