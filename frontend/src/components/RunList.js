import React from 'react';
import Run from './Run';

// Run List component
function RunList({ runs, onDelete,  onEdit }) {
    return (
        <table id="runs">
            <thead>
                <tr>
                    <th>Distance</th>
                    <th>Time</th>
                    <th>RPE</th>
                    <th>Date</th>
                    <th>Notes</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {runs.map((run, i) => <Run run={run}
                    key={i}
                    onDelete={onDelete}
                    onEdit={onEdit} />)}
            </tbody>
        </table>
    );
};

export default RunList;
