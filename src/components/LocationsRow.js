import React from "react";
import { MdOutlineDelete, MdModeEdit} from 'react-icons/md';

function StudentsRow({ item }) {
    return (
        <tr>
            <td>{item.student_id}</td>
            <td>{item.class_id}</td>
            <td>{item.student_name}</td>
            <td>{item.student_address}</td>
            <td>{item.student_email}</td>
            <td>{item.student_gpa}</td>
            <td><MdModeEdit onClick={() => alert("Editing Student Row")} /></td>
            <td><MdOutlineDelete onClick={() => alert("Deleting Student Row")} /></td>
        </tr>
    );
}



export default StudentsRow;