import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
const StudentGradesForm = () => {
    const {id} = useParams(); 
    const [languageClassUserId, setLanguageClassUserId] = useState("");
    const [userId, setUserId] = useState("");
    const [languageClassName, setLanguageClassName] = useState("");
    const [studentGradesList, setStudentGradesList] = useState([]); 
    const api = axios.create({ withCredentials: true });

    useEffect(() => {
        let uId = localStorage.getItem("id");
        setUserId(uId);
        api.get('http://localhost:8000/api/class/' + id).then(response=>{
            console.log(response);
            setLanguageClassName(response.data.languageclass.name);
            setLanguageClassUserId(response.data.languageclass.userId);
        });

        api.get('http://localhost:8000/api/students/' + id).then(response=>{
          let list = [];
          for (let i in response.data.studentgrades) {
            list.push(response.data.studentgrades[i]);
          }

          console.log(list);

          setStudentGradesList(list)
        });
    
      }, []);


      const deleteLanguageClass = (studentId) => {
        api.delete('http://localhost:8000/api/student/delete/' + studentId)
            .then(res => {
                console.log(res); // always console log to get used to tracking your data!
                setStudentGradesList(  
                [ 
                ...studentGradesList.filter(studentgrades => studentgrades._id != studentId), 
              ]);
            })
            .catch(err => console.log(err))
    }

    return (
        <div class="main">
            <div class="top1">
                <h2>{languageClassName} Class</h2>
                <div class="top-right">
                {
                        (languageClassUserId == userId) ?
                        <span>
                        <Link to={"/student/new/" + id}>
                                Add a New Student
                        </Link>
                        <span class="space">|</span>
                        </span>
                        :
                        ''
                }
                <Link to={"/dashboard"}>
                        Go Back
                </Link>
                </div>
            </div>
                <h4>Grades for this class</h4>
            
            <table class="table">
            <tr>
                <th scope="col">Student Name</th>
                <th scope="col">Grade</th>
                <th scope="col">Action</th>
            </tr>
            <tbody>
            {
                    studentGradesList.map( (studentGrades, index) => 
                    <tr class='language-class'>
                    <td>
                        {studentGrades.name}
                    </td>
                    <td>{studentGrades.grade}</td>
                    <td>
                    {
                        (studentGrades.userId == userId) ?
                        <div>
                        <Link to={"/student/edit/" + studentGrades._id}>
                            Edit
                        </Link>
                        <span class="space">|</span>
                        <Link onClick={(e)=>{deleteLanguageClass(studentGrades._id)}}>
                            Delete
                        </Link>
                        </div>
                        :
                        ''
                    }
                    </td>
                    </tr>

                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default StudentGradesForm;

