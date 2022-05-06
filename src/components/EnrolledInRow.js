import React from "react";
import { MdOutlineDelete, MdModeEdit} from 'react-icons/md';

function Enrolled_InRow({ item }) {
    return (
        <tr>
            <td>{item.student_id}</td>
            <td>{item.class_id}</td>
            <td><MdModeEdit onClick={() => alert("Editing Location Row")} /></td>
            <td><MdOutlineDelete onClick={() => alert("Deleting Location Row")} /></td>
        </tr>
    );
}



export default Enrolled_InRow;