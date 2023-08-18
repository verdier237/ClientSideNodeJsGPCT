import React from 'react'
import { useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import videoStudient from './video/student-re.mp4'

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
const Register = (props) => {
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');
    const [testPassw, setTestPassw] = useState('');
    const [msjError, setmsjError] = useState('');
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isValidateField = () => {

        if (name.trim().length == 0) {
            setmsjError("Veuillez entrer votre prénom.")
            document.getElementById("name").style.border = '3px solid red'
            return false
        }
        else {
            setmsjError('')
            document.getElementById("name").style.border = '1px solid'
        }
        if (lastname.trim().length == 0) {
            setmsjError("Veuillez entrer votre nom de famille.")
            document.getElementById("lastname").style.border = '3px solid red'
            return false
        }
        else {
            setmsjError('')
            document.getElementById("lastname").style.border = '1px solid'
        }
        if (email.trim().length == 0) {
            setmsjError("Veuillez entrer votre adresse email.")
            document.getElementById("email").style.border = '3px solid red'
            return false
        }
        else {
            setmsjError('')
            document.getElementById("email").style.border = '1px solid'

        }
        if ((testPassw.trim() != passw.trim())) {
            setmsjError("Les mots de passe doivent être identique!")
            document.getElementById("password2").style.border = '3px solid red'
            document.getElementById("password").style.border = '3px solid red'
            return false
        }
        else if (testPassw.trim().length == 0 && passw.trim().length == 0) {
            setmsjError("Veuillez entrer un mot de passe.")
            document.getElementById("password2").style.border = '3px solid red'
            document.getElementById("password").style.border = '3px solid red'
            return false
        }
        else {
            setmsjError('')
            document.getElementById("password2").style.border = '3px solid green'
            document.getElementById("password").style.border = '3px solid green'
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValidateField()) {

            return
        }

        const onRegister = async () => {
            try {
                const url = 'http://localhost:5000/user/student';
                const body = {
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: passw,
                };

                const { data } = await axios.post(url, body);
                console.log(data);
                openSuccessModal();
            } catch (error) {
                // En cas d'erreur, afficher le message d'erreur dans une fenêtre pop-up originale
                setErrorMessage(
                    "Une erreur s'est produite lors de l'enregistrement des données. Veuillez réessayer plus tard."
                );
                setErrorModalIsOpen(true);
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
    const closeModal = () => {
        setErrorModalIsOpen(false);
    };
    const navigateToLogin = () => {
        navigate('/')

    }

    return (
        <div className="App">
            <h1 className='titreC'>GPC TECCART</h1>

            <div className="auth-form-video">
                <video autoPlay loop muted >
                    <source src={videoStudient} type="video/mp4" />
                </video>
            </div>
            <div className="regist-form-container">
                <h1>Page d'inscription</h1>

                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Prénom</label>
                    <input value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder='votre prénom' id="name" name="name" />

                    <label htmlFor="LastName">Nom</label>
                    <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder='Votre nom' id="lastname" name="lastname" />

                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Votre Email' id="email" name="email" />

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" value={passw} onChange={(e) => setPassw(e.target.value)} placeholder='Mot de passe' id="password" name="password" />

                    <label htmlFor="password">Confirmer Mot de passe</label>
                    <input type="password" text={testPassw} onChange={(e) => setTestPassw(e.target.value)} placeholder='Confirmer Mot de passe' id="password2" name="password2" />

                    <button className='submitButton' type="submit">Enregistrement</button>
                </form>
                <button className="link-btn" onClick={navigateToLogin}> Vous avez déja un compte ? Se connecter</button>

                <span className="error">{msjError}</span>

            </div><Modal
                isOpen={isSuccessModalOpen}
                onRequestClose={closeSuccessModal}
                className="overlay"

            >
                <div className="modal-content">
                    <h2>Compte créé avec succès !</h2>
                    <button className="close-btn" onClick={closeSuccessModal}>
                        Fermer
                    </button>
                </div>
            </Modal>
            <Modal
                isOpen={errorModalIsOpen}
                onRequestClose={() => setErrorModalIsOpen(false)}
                style={modalStyle}
            >
                <p>{errorMessage}</p>
                <button onClick={() => setErrorModalIsOpen(false)}>Fermer</button>
            </Modal>;
        </div >
    )
}

export default Register