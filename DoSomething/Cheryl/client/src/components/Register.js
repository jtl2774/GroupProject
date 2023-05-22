import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const Register = (props) => {
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        gender:"",
        location:"",
        aboutMe:""
    });
    const [errors, setErrors] = useState({});

    const navigate= useNavigate();
    const changeHandler = (e) =>{
        setUser({...user, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        //{withCredentials:true}: allow us to generate useToken/cookies from the back end
        axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
            .then((res) =>{
                console.log(res)
                //set localStorage to store data when reg/login to preserve key value for later access from different components
                localStorage.setItem("firstName", res.data.firstName)
                localStorage.setItem("user_Id", res.data._id)
                navigate('/dashboard')
            })
            .catch((err)=>{
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div> 
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>First Name:</label>
                    <input className='form-control' type="text" name="firstName" onChange={changeHandler} value={user.firstName} />
                    {
                        errors.firstName ?
                            <p style={{ color: "red" }}>{errors.firstName.message}</p> :
                            null
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>Last Name:</label>
                    <input className='form-control' type="text" name="lastName" onChange={changeHandler} value={user.lastName} />
                    {
                        errors.lastName ?
                            <p style={{ color: "red" }}>{errors.lastName.message}</p> :
                            null
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>Email:</label>
                    <input className='form-control' type="text" name="email" onChange={changeHandler} value={user.email} />
                    {
                        errors.email ?
                            <p style={{ color: "red" }}>{errors.email.message}</p> :
                            null
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>Password:</label>
                    <input className='form-control' type="password" name="password" onChange={changeHandler} value={user.password} />
                    {
                        errors.password ?
                            <p style={{ color: "red" }}>{errors.password.message}</p> :
                            null
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>Confirm Password:</label>
                    <input className='form-control' type="password" name="confirmPassword" onChange={changeHandler} value={user.confirmPassword} />
                    {
                        errors.confirmPassword ?
                            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p> :
                            null
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>Location:</label>
                    <input className='form-control' type="text" name="location" onChange={changeHandler} value={user.location} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label className='form-label'>About me:</label>
                    <textarea className='form-control' type="text" name="aboutMe" onChange={changeHandler} value={user.aboutMe} />
                </div>
                <div>
                    <input type="submit" value="Register" className='btn btn-secondary' style={{ margin: "10px"}} />
                </div>
            </form>
            <Link to={'/dashboard/'} style={{color:"DodgerBlue"}}>Already have an accout? Please Log in.</Link>
        </div>
    );
}

export default Register;
