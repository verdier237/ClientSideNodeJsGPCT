import React, { useEffect, useState } from 'react';

export default function WorkerAvailable() {
    const [planning, setPlanning] = useState(generateDefaultPlanning());
    const startingDay = 1;

    // Fonction pour obtenir le lundi de la semaine en cours en fonction de la date actuelle
    const getMonday = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === startingDay ? 0 : (day < startingDay ? -6 : 1));
        return new Date(date.setDate(diff));
    };

    // Fonction pour obtenir la date de début et de fin de chaque session (automne, hiver, été)
    const getSessionDates = () => {
        const today = new Date();
        const year = today.getFullYear();
        const autumnStart = new Date(year, 8, 1); // 8 => septembre
        const autumnEnd = new Date(year, 11, 31); // 11 => décembre
        const winterStart = new Date(year, 0, 1); // 0 => janvier
        const winterEnd = new Date(year, 4, 0); // 4 => début mai
        const summerStart = new Date(year, 4, 1); // 4 => mi mai
        const summerEnd = new Date(year, 7, 23); // 7 => 24 août

        if (today >= autumnStart && today <= autumnEnd) return 'Automne';
        if (today >= winterStart && today <= winterEnd) return 'Hiver';
        if (today >= summerStart && today <= summerEnd) return 'Été';

        return 'Automne'; // Par défaut, on choisit l'automne
    };

    const [session, setSession] = useState(getSessionDates()); // Session par défaut en fonction de la date du système


    const today = new Date();
    const [startDate, setStartDate] = useState(getMonday(today));

    const handleCheckboxChange = (x, y, checked) => {
        const updatedPlanning = [...planning];
        const index = updatedPlanning.findIndex((item) => item.x === x && item.y === y);
        if (index !== -1) {
            updatedPlanning[index].z = checked ? '1' : '0';
        } else {
            updatedPlanning.push({ x, y, z: checked ? '1' : '0' });
        }
        setPlanning(updatedPlanning);
    };

    const handleSessionChange = (event) => {
        setSession(event.target.value);
        setStartDate(getMonday(today));
    };

    return (
        <div>
            <h1 className='title-plan'>Planning {today.getFullYear()}</h1>
            <div className="div-select">
                <select className="select-styled" value={session} onChange={handleSessionChange}>
                    <option value="Automne">Automne</option>
                    <option value="Hiver">Hiver</option>
                    <option value="Été">Été</option>
                </select>

            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Lundi</th>
                        <th>Mardi</th>
                        <th>Mercredi</th>
                        <th>Jeudi</th>
                        <th>Vendredi</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 11 }).map((_, hourIndex) => (
                        <tr key={hourIndex}>
                            <td>{hourIndex + 8}h - {hourIndex + 9}h</td>
                            {Array.from({ length: 5 }).map((_, dayIndex) => {
                                const isSelected = planning.some((item) => item.x === dayIndex && item.y === hourIndex && item.z === '1');
                                return (
                                    <td key={dayIndex}>
                                        <center>
                                            <input
                                                className='check'
                                                type="checkbox"
                                                onChange={(e) => handleCheckboxChange(dayIndex, hourIndex, e.target.checked)}
                                                checked={isSelected}
                                            />
                                        </center>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <center><button className="btn_valid_Planning" onClick={() => console.log({ index: planning })}>Valider</button></center>
        </div>
    );
}

// Fonction pour générer les valeurs par défaut pour le planning
function generateDefaultPlanning() {
    const defaultPlanning = [];
    for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
        for (let hourIndex = 0; hourIndex < 11; hourIndex++) {
            defaultPlanning.push({ x: dayIndex, y: hourIndex, z: '0' });
        }
    }
    return defaultPlanning;
}