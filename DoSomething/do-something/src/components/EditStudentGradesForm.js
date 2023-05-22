import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
const EditStudentGradesForm = () => {
    const {id} = useParams(); 
    const [languageClassName, setLanguageClassName] = useState(""); 
    const [languageClassId, setLanguageClassId] = useState(""); 
    const [name, setName] = useState(""); 
    const [grade, setGrade] = useState(""); 
    const [errors, setErrors] = useState([]); 
    const navigate = useNavigate();
    const api = axios.create({ withCredentials: true });

    useEffect(() => {
        api.get('http://localhost:8000/api/student/' + id).then(response=>{
            console.log(response);
            let studentGrade = response.data.studentgrade;
            setName(studentGrade.name);
            setGrade(studentGrade.grade);
            setLanguageClassId(studentGrade.languageClassId);
        });
    
      }, []);

    const editStudent= (e) => {
        e.preventDefault();
        // this.languageClassId = id;
        api.put('http://localhost:8000/api/student/edit/' + id, {
            languageClassId,
            name,
            grade
        })
            .then(res => {
                console.log(res);
                navigate("/class/" + languageClassId); // this will take us back to the Main.js
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
                <h2>Edit student</h2>
                <div class="top-right">
                <Link to={"/class/" + languageClassId}>
                    Go Back
                </Link>
                </div>
            </div>
            <h4>Edit details about the student</h4>
            <fieldset>
            <legend>Edit Student</legend>
            {errors.map((err, index) => <p class="error" key={index}>{err}</p>)}
            <form onSubmit={editStudent}>
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
export default EditStudentGradesForm;

