import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admins() {

    const [Admins, setAdmins] = useState([]);
    const token = sessionStorage.getItem('token');
    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            // Make an API call to fetch the Admins data using axios
            const response = await axios.get('http://localhost:5000/user/admin', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Assuming the data is in the 'data' field of the response
            setAdmins(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className='title-plan'>Admins List</h1>
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
                    {Admins.map((Worker) => (
                        <tr key={Worker._id}>
                            <td>{Worker.name}</td>
                            <td>{Worker.lastname}</td>
                            <td>{Worker.email}</td>
                            <td>{Worker.name_user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Admins