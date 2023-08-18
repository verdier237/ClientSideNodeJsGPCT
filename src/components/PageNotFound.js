import React from 'react'

import { useNavigate } from 'react-router-dom'
import Error from "../img/Error.png"

export default function PageNotFound() {
    const navigate = useNavigate();
    const sendToAccueil = () => {
        navigate('/')
    }

    return (
        <div className="container-Reponse">
            <center>
                <div className="container-Error">

                    <img src={Error} className="img-error"></img>
                    <h1 style={{ fontSize: "2rem" }}>Oups, on dirait que la page est perdue.</h1>
                    <h2 style={{ fontSize: "1.5rem" }}>Ce n’est pas une faute, juste un accident qui n’était pas intentionnel.</h2>
                    <button className="btn-erreur" onClick={sendToAccueil} > Retour à la page Accueil</button>

                </div></center>
        </div>
    )
}
