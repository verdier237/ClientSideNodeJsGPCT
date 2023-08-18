
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'

export default function AjoutMatiere() {

    //name , t_hours , weight
    const [name, setName] = useState('');
    const [t_hours, setT_hours] = useState('');
    const [weight, setWeight] = useState('1');
    const [msjError, setmsjError] = useState('');
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        const onRegister = async () => {
            const url = 'http://localhost:5000/subject';
            const body = {
                name: name,
                t_hours: t_hours,
                weight: weight,
            };
            const { data } = await axios.post(url, body);
            console.log(data)
            if (data.status == true) {
                openSuccessModal();
            }
        };

        onRegister()

    }

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
        navigateToLogin()
    };

    const navigateToLogin = () => {
        navigate('/admin')

    }
    return (
        <div className="profile-form">
            <h2>Ajout de matière</h2>
            <form onSubmit={handleSubmit}>
                <label>Nom de la matière:</label>
                <input type="text" placeholder="Nom de la Matière" id="name" onChange={(e) => setName(e.target.value)} />
                {/* <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)}/> */}
                <label>Nbr heures par semaine de la matiere:</label>
                <input type="Number" value={t_hours} onChange={(e) => setT_hours(e.target.value)} min="0" max="40" id="t_hours" />
                <label>Le poids de la matiere:</label>
                <select id="weight" defaultValue="1" onChange={(e) => setWeight(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <center> <button className="submitButton" type="submit" >Sauvegarder</button></center>
            </form>
            <span className="error">{msjError}</span>
            <Modal
                isOpen={isSuccessModalOpen}
                onRequestClose={closeSuccessModal}
                className="overlay"

            >
                <div className="modal-content">
                    <h2>Nouvelle matiere Ajoutée</h2>
                    <button className="close-btn" onClick={closeSuccessModal}>
                        Fermer
                    </button>
                </div>
            </Modal>
        </div>
    );
}