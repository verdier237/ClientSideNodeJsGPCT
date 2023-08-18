import React from 'react'
import { useRef, useState, useEffect } from 'react'

import './contact.css'


const GedocsEtudiant = ({ onSendRequest }) => {
  const form = useRef();
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('sentRequests')) || [];
    setSentRequests(savedRequests);
  }, []);

  const sendEmail = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const request = {
      option: formData.get('documentOption'),
      date: new Date().toLocaleDateString(),
      status: 'En attente de validation',
    };
    setSentRequests((prevRequests) => [...prevRequests, request]);
    form.current.reset();
    form.current.reset();
  };

  useEffect(() => {
    localStorage.setItem('sentRequests', JSON.stringify(sentRequests));
  }, [sentRequests]);

  return (
    <section>
        <h1 className='title-plan1' >Demande de documents</h1>
      <div className='container'>
          <form
          className='form-container'
            ref={form}
            onSubmit={sendEmail}
          >
                <input type="text" placeholder='full name ' name ="use_name" className='form-input' required />
             
               <div className="select-container">
                <select  defaultValue="choisir"  name="documentOption" >
                    <option value="releve de note">releve de note</option>
                    <option value="attestation de frequentation">attestation de frequentation</option>
                    <option value="attestation de stage " >attestation de stage </option>
                    <option value="attestation de reussite">attestation de reussite</option>
                    <option value="Etat de compte">Etat de compte</option>
                
                </select></div><br/>
                <textarea placeholder='descriptions (facultatif)' name='message'
                cols="26" rows="5" className='textarea'></textarea><br/>
                <button type="submit" className="btnGedocs"  >Send request</button>
          </form>
        </div>

        <div className='table-section'>
          <h3 className='title-plan1'>Historique des demandes</h3>
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sentRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.option}</td>
                  <td>{request.date}</td>
                  <td>{request.status} </td>
                  <td>
                  <button disabled>Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      {/* </div> */}
    </section>
  );
};

export default GedocsEtudiant;
