import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md'

// Run session component
function Run({ run, onDelete, onEdit }) {
    return (
        <tr>
            <td>{run.distance}</td>
            <td>{run.time}</td>
            <td>{run.rpe}</td>
            <td>{run.date}</td>
            <td>{run.notes}</td>
            <td><MdEdit onClick={() => onEdit(run)}/></td>
            <td><MdDeleteForever onClick={() => onDelete(run._id)}/> </td>
        </tr>
    );
};

export default Run;