import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root');
export default function AjoutProgramm() {
    const [programName, setProgramName] = useState("");
    const [numMatiere, setNumMatiere] = useState(1);
    const [matieres, setMatieres] = useState([]);
    const token = sessionStorage.getItem('token');
    const [matieresOptions, setMatieresOptions] = useState([]);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    useEffect(() => {
        fetchMatiere();
    }, []);

    const fetchMatiere = async () => {
        try {
            // Make an API call to fetch the Workers data using axios
            const response = await axios.get('http://localhost:5000/subject', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Assuming the data is in the 'data' field of the response
            setMatieresOptions(response.data.data.map(item => item.name));
        } catch (error) {
            console.error(error);
        }
    };

    const handleNumMatiereChange = (event) => {
        const num = parseInt(event.target.value);
        setNumMatiere(num);
        setMatieres(new Array(num).fill("").map((_, index) => matieres[index] || ""));
    };

    const handleMatiereChange = (event, index) => {
        const newMatieres = [...matieres];
        newMatieres[index] = event.target.value;
        setMatieres(newMatieres);

        // Remove the selected subject from 'matieresOptions'
        const selectedMatiere = event.target.value;
        setMatieresOptions((prevOptions) => prevOptions.filter(matiere => matiere !== selectedMatiere));
    };

    const handleSubmit = async (event) => {
        const subject = [];
        event.preventDefault();
        console.log("Nom du programme:", programName);

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const matieresSelectionnees = matieres.filter(matiere => matiere !== "");
        for (let i = 0; i < matieresSelectionnees.length; i++) {
            const matiereName = matieresSelectionnees[i];
            const url = 'http://localhost:5000/subject/' + matiereName;


            const response = await axios.get(url, config);
            var matiereDetails = response.data.data[0]; // Les détails de la matière sont dans response.data
            subject.push({
                course: matiereDetails.name,
                t_hours: parseInt(matiereDetails.t_hours),
                weight: parseInt(matiereDetails.weight),

            });
            console.log(matiereDetails.t_hours)
        }

        const url1 = 'http://localhost:5000/program';
        const body1 = {
            name: programName,
            list_courses: subject
        };
        try {
            const { data } = await axios.post(url1, body1, config);
            console.log(data);
            if (data.status === true) {
                openSuccessModal();
            }

        } catch (error) {
            console.error(error);
        }

    };

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);

    };
    return (
        <div className="profile-form">
            <h2>Ajouter un programme</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom du programme:</label>
                    <input
                        type="text"
                        value={programName}
                        onChange={(event) => setProgramName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Nombre de matières:</label>
                    <input
                        type="number"
                        value={numMatiere}
                        onChange={handleNumMatiereChange}
                    />
                </div>
                {matieres.map((matiere, index) => (
                    <div key={index}>
                        <label>Matière {index + 1}:</label>
                        <select value={matiere} onChange={(event) => handleMatiereChange(event, index)}>
                            <option value="">Sélectionner une matière</option>
                            {matieresOptions.map((option, optionIndex) => (
                                <option key={optionIndex} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="submit">Ajouter le programme</button>
            </form>
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
};