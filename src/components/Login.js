import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { browserHistory } from 'react-router';
import axios from 'axios';
import videoStudient from './video/students1.mp4'

const Login = () => {

    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');
    const [msjError, setmsjError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        const OnConnect = async () => {
            const url = 'http://localhost:5000/auth/user/login/';

            const body = {
                'email': email,
                'password': passw
            }

            axios.post(url, body)
                .then(({ data }) => {

                    if (data.success) {
                        sessionStorage.setItem("token", data.token);

                        if (data.isAdmin == true) {
                            admin()
                        }
                        else if (data.isWorker == true) {
                            worker()
                        }
                        else {
                            student()
                            // profile()
                        }

                        //  profile()

                    } else {
                        console.log("success:" + data.success)
                        setmsjError(data.msg)

                    }
                })
        }
        OnConnect()

    }
    const register = () => {
        navigate('/register')
    }

    const student = () => {
        navigate('/student')
    }
    const worker = () => {
        navigate('/worker')
    }
    const admin = () => {
        navigate('/admin')
    }
    const profile = () => {
        navigate('/profile')
    }



    return (


        <div className="App">
            <h1 className='titreC'>GPC TECCART</h1>
            <div className="auth-form-video">
                <video autoPlay loop muted >
                    <source src={videoStudient} type="video/mp4" />
                </video>
            </div>
            <div className="auth-form-container">
                <h1>Page de connexion</h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Email' id="email" name="email" />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" value={passw} onChange={(e) => setPassw(e.target.value)} placeholder='Mot de passe' id="password" name="password" />
                    <button className="submitButton" type="submit" >Connexion</button>
                </form>
                <button className="link-btn" onClick={register}> Nouveau étudiant ? M'inscrire</button>
                <br></br><span className="error">{msjError}</span>
            </div></div >
    )
}

export default Login