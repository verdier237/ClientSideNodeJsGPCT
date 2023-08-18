import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Students() {

    const [students, setStudents] = useState([]);
    const token = sessionStorage.getItem('token');
    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            // Make an API call to fetch the students data using axios
            const response = await axios.get('http://localhost:5000/user/student', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Assuming the data is in the 'data' field of the response
            setStudents(response.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className='title-plan'>Student List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>User Name</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.lastname}</td>
                            <td>{student.email}</td>
                            <td>{student.name_user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Students