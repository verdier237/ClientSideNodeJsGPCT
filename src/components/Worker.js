// Student.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import FileUploader from './WorkerGedocs.js'
import defaultAvatarUrl from "../img/avatar-man.png"

import Planning from './Planning';
import Dispo from './WorkerAvailable';
import { useNavigate } from 'react-router-dom'

// Style pour la fenêtre modale
const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
};


export default function Worker() {
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');
    const [selectedTab, setSelectedTab] = useState('Planning');
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {

        if (!token) {
            return navigate('/')
        }

        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/user/onestudent/${token}`);

                if (data.data === undefined) {
                    return setName("n'existe pas");
                }

                setName(data.data.name);
                setLastName(data.data.lastname);
                setEmail(data.data.email);
            } catch (error) {
                // En cas d'erreur, afficher le message d'erreur dans une fenêtre pop-up originale
                setErrorMessage(
                    "Une erreur s'est produite lors de connexion. Veuillez réessayer plus tard."
                );
                setErrorModalIsOpen(true);
            }
        };
        getData();

    }, []);
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    const renderContent = () => {
        if (selectedTab === 'Planning') {
            return <Planning />;
        } else if (selectedTab === 'Dispo') {
            return <Dispo />;
        } else if (selectedTab === 'Profil') {
            return (
                <div className="profile-form">
                    <h2>Profil Utilisateur</h2>
                    <form>
                        <label>Nom:</label>
                        <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} readOnly />

                        <label>Prénom:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly />

                        <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />

                        <label>Statut:</label>
                        <input type="text" value="Worker" readOnly />
                    </form>
                </div>
            );
        }else if (selectedTab==='Gedocs'){
            return(
                <FileUploader/>
            )
        }
    };
    setTimeout(() => {
        setLoading(false);
    }, 1000);
    const deconnecter = () => {
        sessionStorage.clear()
        return navigate('/')
    }
    if (loading) {
        // Afficher le chargement ici
        return <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement en cours...</p>
        </div>
    }
    return (
        <div className="content-container">
            <header className="header-container">
                <div className="header-left">
                    {/* Image de profil */}
                    <img
                        src={defaultAvatarUrl}
                        alt="Image de profil"
                        className="profile-image"
                    />
                    <div className="greeting">
                        <h2>Bonjour {lastname} {name}</h2>
                        <p>Bienvenue sur votre espace utilisateur</p>
                    </div>
                </div>
                <div className="header-right">


                    <ul>
                        <li onClick={deconnecter}>Se déconnecter</li></ul>


                </div>
            </header>

            <div className="user-space">
                <div className="left-menu">
                    <ul>
                        <li onClick={() => handleTabClick('Profil')}>Profil </li>
                        <li onClick={() => setSelectedTab('Planning')}>Planning</li>
                        <li onClick={() => setSelectedTab('Dispo')}>Disponibilité</li>
                        <li onClick={() => setSelectedTab('Gedocs')}>Uploader les documents</li>

                    </ul>
                </div>
                <div className="main-content">
                    {renderContent()}
                </div>
            </div>
            <Modal
                isOpen={errorModalIsOpen}
                onRequestClose={() => setErrorModalIsOpen(false)}
                style={modalStyle}
            >
                <p>{errorMessage}</p>
                <button onClick={() => setErrorModalIsOpen(false)}>Fermer</button>
            </Modal>;
        </div>
    );
}
