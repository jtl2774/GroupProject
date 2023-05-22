import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
const AddStudentGradesForm = () => {
    const {id} = useParams(); 
    const [name, setName] = useState(""); 
    const [grade, setGrade] = useState(""); 
    const [languageClassName, setLanguageClassName] = useState(""); 
    const [errors, setErrors] = useState([]); 
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    useEffect(() => {

        api.get('http://localhost:8000/api/class/' + id).then(response=>{
            console.log(response);
            setLanguageClassName(response.data.languageclass.name);
        });
    
      }, []);

    const addStudent= (e) => {
        e.preventDefault();
        let languageClassId = id;
        api.post('http://localhost:8000/api/student/' + id, {
            languageClassId,
            name,
            grade
        })
            .then(res => {
                console.log(res);
                navigate("/class/" + id); // this will take us back to the Dashboard
            })
            .catch(err=>{
                let errorResponse = err.response.data.errors.message; // Get the errors from err.response.data
                if (!errorResponse) {
                    errorResponse = err.response.data.message;
                }
                setErrors([errorResponse]);
            })
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleGrade = (e) => {
        setGrade(e.target.value);
    }

    return (
        <div class="main">
            <div class="top1">
                <h2>Add a new student</h2>
                <div class="top-right">
                <Link to={"/class/" + id}>
                    Go Back
                </Link>
                </div>
            </div>
            <h4>Add details about the student</h4>
            <fieldset>
            <legend>New Student</legend>
            {errors.map((err, index) => <p class="error" key={index}>{err}</p>)}
            <form onSubmit={addStudent}>
            <table>
            <tbody>
            <tr>
                <td>
                <label>Student Name:</label>
                </td><td> 
                <input type="text" 
                    name="name" 
                    value={name}
                    onChange={ handleName } />
                </td>
            </tr>
            <tr>
                <td>
                <label>Grade:</label>
                </td><td> 
                <input type="number" 
                    name="grade" 
                    value={grade}
                    onChange={ handleGrade } />
                </td>
            </tr>
            <tr>
            <td class="submit-button" colspan="2">
            <input class="b1" type="submit" value="Submit"/>
            </td>
            </tr>
                </tbody>
        </table>
            </form>
            </fieldset>
        </div>
    )
}
export default AddStudentGradesForm;

