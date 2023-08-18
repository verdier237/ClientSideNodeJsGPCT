import React, { useEffect, useState } from 'react';
import axios from 'axios';
const NumberCard = ({ number, status }) => {


  return (
    <div className="number-card">
      <h2>{number}</h2><br />
      <h6>{status}</h6>
    </div>
  );
};

const App = () => {
  const [students, setStudents] = useState('');
  const [workers, setWorkers] = useState('');
  const [admins, setAdmins] = useState('');
  const token = sessionStorage.getItem('token');
  useEffect(() => {



    const getStudents = async () => {

      const { data } = await axios.get(`http://localhost:5000/user/length/students`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStudents(data.data);

    };
    const getWorkers = async () => {
      const { data } = await axios.get(`http://localhost:5000/user/length/workers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWorkers(data.data);

    };
    const getAdmins = async () => {


      const { data } = await axios.get(`http://localhost:5000/user/length/admins`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAdmins(data.data);
    };
    getStudents();
    getWorkers();
    getAdmins();

  }, []);

  return (
    <div>
      <h1 className='title-plan'>Statistique</h1>
      <div className="number-cards-container">
        <NumberCard className="NumberCard" number={students} status={"Students"} />
        <NumberCard number={workers} status={"Workers"} />
        <NumberCard number={admins} status={"Admins"} />
      </div>
    </div>
  );
};

export default App;
