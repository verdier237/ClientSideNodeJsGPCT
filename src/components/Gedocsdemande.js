import React, { useState } from 'react';


const Gedocsdemande = ({ requests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleAccept = (request) => {
    // Mettez en œuvre la logique pour accepter la demande ici
    console.log('Demande acceptée:', request);
  };

  const handleReject = (request) => {
    // Mettez en œuvre la logique pour rejeter la demande ici
    console.log('Demande rejetée:', request);
  };

  return (
    <div>
      <h1 className='title-plan1'>Liste des demandes</h1>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Date</th>
            <th>Status</th>
            <th colSpan='2'>Actions</th>
            
          </tr>
        </thead>
        <tbody>
        
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                
                <button className="accept" >Accepter</button>
              
              </td>
              <td>  <button className="reject" >Rejeter</button></td>
            </tr>
         
        </tbody>
      </table>

      {selectedRequest && (
        <div>
          <h2>Informations de l'étudiant</h2>
          <p>Nom: {selectedRequest.studentName}</p>
          <p>Numéro DA: {selectedRequest.studentDA}</p>
          {/* Ajoutez d'autres informations de l'étudiant ici si nécessaire */}
        </div>
      )}
    </div>
  );
};

export default Gedocsdemande;
