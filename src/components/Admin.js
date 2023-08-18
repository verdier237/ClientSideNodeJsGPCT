import React, { useEffect, useState } from 'react';
import AdminDocs from './AdminGedocs.js'

import axios from 'axios';
import defaultAvatarUrl from "../img/avatar-man.png"
import Planning from './Planning';
import Dashboard from './Dashboard';
import Workers from './Workers';
import Students from './Students';
import Admins from './Admins';
import Cours from './Cours';
import AjoutMatiere from './AjoutMatiere';
import AjoutProgramm from './AjoutProgramme';
import { useNavigate } from 'react-router-dom'

export default function Admin() {

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');
    const [selectedTab, setSelectedTab] = useState('Dashboard');
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            return navigate('/')
        }

        const getData = async () => {
            const { data } = await axios.get(`http://localhost:5000/user/oneAdmin/${token}`);

            if (data.data === undefined) {
                return setName("n'existe pas");
            }

            setName(data.data.name);
            setLastName(data.data.lastname);
            setEmail(data.data.email);
        };
        getData();
    }, []);
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    const renderContent = () => {
        if (selectedTab === 'Planning') {
            return <Planning />;
        } else if (selectedTab === 'Dashboard') {
            return <Dashboard />;

        }
        else if (selectedTab === 'Students') {
            return <Students />;
        }
        else if (selectedTab === 'Admins') {
            return <Admins />;
        } else if (selectedTab === 'Workers') {
            return <Workers />;
        } else if (selectedTab === 'AjoutProgramm') {
            return <AjoutProgramm />;
        }
        else if (selectedTab === 'AjoutMatiere') {
            return <AjoutMatiere />;
        }else if (selectedTab==='Gedocs'){
            return(
                <AdminDocs/>
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
                        <p>Bienvenue sur votre espace admin</p>
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
                        <li onClick={() => handleTabClick('Dashboard')}>Dashboard </li>
                        <li onClick={() => handleTabClick('Admins')}>Admins </li>
                        <li onClick={() => setSelectedTab('Workers')}>Workers</li>
                        <li onClick={() => setSelectedTab('Students')}>Students</li>
                        <li onClick={() => setSelectedTab('Planning')}>Planning</li>
                        <li onClick={() => setSelectedTab('AjoutProgramm')}>Ajotut de Programme</li>
                        <li onClick={() => setSelectedTab('AjoutMatiere')}>Ajout de Matiere</li>
                        <li onClick={() => setSelectedTab('Gedocs')}>Liste des demandes</li>
                    </ul>
                </div>
                <div className="main-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
