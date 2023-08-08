import React from 'react';
import { Link } from 'react-router-dom';
import RunList from '../components/RunList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Home Page for Run Tracker
function HomePage({ setRunToEdit }) {
    const navigate = useNavigate()
    const [runs, setRuns] = useState([]);

    const onDelete = async (_id) => {
        const response = await fetch(`/runs/${_id}`, {method: 'DELETE'})
        if (response.status === 204) {
            setRuns(runs.filter(run => run._id !== _id));
        } else {
            console.error(`Unable to Delete. _id = ${_id}, status code = ${response.status}`)
        }
    };

    const onEdit = async runToEdit => {
        setRunToEdit(runToEdit);
        navigate("/edit-run");
    };

    const loadRuns = async () => {
        const response = await fetch('/runs'); 
        const data = await response.json();
        setRuns(data);
    };

    // on load, calls loadRuns to pull running session data from db.
    useEffect( () => {
        loadRuns();
    }, []);

    return (
        <>
            <h2>Running Sessions</h2>
            <RunList runs={runs} onDelete={onDelete} onEdit={onEdit}></RunList>
            <Link to="/add-run" className='addLink'>Add a running session!</Link>
        </>
    );
};

export default HomePage;