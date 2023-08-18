import React, { useEffect, useState } from 'react';

export default function Planning() {

    const startingDay = 1;

    // Fonction pour obtenir le lundi de la semaine en cours en fonction de la date actuelle
    const getMonday = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === startingDay ? 0 : (day < startingDay ? -6 : 1));
        return new Date(date.setDate(diff));
    };


    const nextWeek = (date) => {
        return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    };

    const prevWeek = (date) => {
        return new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
    };

    const today = new Date();
    const [startDate, setStartDate] = useState(getMonday(today));

    return (
        <div>
            <h1 className='title-plan'>Planning Standard</h1>
            <div className="week-filter">

                <button onClick={() => setStartDate(prevWeek(startDate))}>Semaine précédente</button>
                <span>{startDate.toLocaleDateString()}</span>
                <button onClick={() => setStartDate(nextWeek(startDate))}>Semaine suivante</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th> {/* Colonne vide pour aligner les heures */}
                        <th>Lundi</th>
                        <th>Mardi</th>
                        <th>Mercredi</th>
                        <th>Jeudi</th>
                        <th>Vendredi</th>
                        {/* ... Ajouter d'autres jours de la semaine si nécessaire ... */}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 11 }).map((_, index) => (
                        <tr key={index}>
                            <td>{index + 8}h - {index + 9}h</td>
                            <td></td> {/* Remplacer par les cours réels pour chaque jour et chaque heure */}
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {/* ... Ajouter d'autres cours pour chaque jour et chaque heure ... */}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
