import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDone } from 'react-icons/md';


// Add Run Page - Reached when user wants to add a running session.
export const AddRunPage = () => {
    const navigate = useNavigate();
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    const [rpe, setRpe] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const addRun = async () => {
        const newRun = {distance, time, rpe, date, notes}
        const response = await fetch('/runs', {
            method: 'POST',
            body: JSON.stringify(newRun),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.status === 201) {
            alert("Run Session Added!")
        } else {
            alert("Unable to add run session.")
        };
        navigate('/');
    };

    return (
        <div>
            <h1>Add a Run</h1>
            <form className='addForm'>
                <input
                    type="text"
                    placeholder="Distance"
                    value={distance}
                    onChange={e => setDistance(e.target.value)} />
                <input
                    type="text"
                    value={time}
                    placeholder="Time"
                    onChange={e => setTime(e.target.value)} />
                <input
                    type="number"
                    placeholder="RPE"
                    value={rpe}
                    onChange={e => setRpe(e.target.value)} />
                <input
                    type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={e => setNotes(e.target.value)} />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <MdDone className='addButton'onClick={addRun}></MdDone>
            </form>
        </div>
    );
};

export default AddRunPage;