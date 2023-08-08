import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDone } from 'react-icons/md';

// Edit Run Page - Reached when user wants to edit a running session.
export const EditRunPage = ({ runToEdit }) => {
    const navigate = useNavigate();
    const [distance, setDistance] = useState(runToEdit.distance);
    const [time, setTime] = useState(runToEdit.time);
    const [rpe, setRpe] = useState(runToEdit.rpe);
    const [date, setDate] = useState(runToEdit.date);
    const [notes, setNotes] = useState(runToEdit.notes);

    const editRun = async () => {
        const editedRun = {distance, time, rpe, date, notes}
        const response = await fetch(`/runs/${runToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedRun),
            headers: {'Content-Type': 'application/json'}
            });
        if (response.status === 200) {
            alert("Run Session Edited!")
        } else {
            alert("Unable to edit run session.")
        };
        navigate('/');
    };

    return (
        <div>
            <h1>Edit Run</h1>
            <form className='editForm'>
                <input
                    type="text"
                    value={distance}
                    onChange={e => setDistance(e.target.value)} />
                <input
                    type="text"
                    value={time}
                    onChange={e => setTime(e.target.value)} />
                <input
                    type="number"
                    value={rpe}
                    onChange={e => setRpe(e.target.value)} />
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)} />
                <MdDone className='addButton'onClick={editRun}></MdDone>
            </form>
        </div>
    );
};

export default EditRunPage;