import React from "react";
import { MdOutlineDelete, MdModeEdit} from 'react-icons/md';

function StaffRow({ item }) {
    return (
        <tr>
            <td>{item.staff_id}</td>
            <td>{item.staff_name}</td>
            <td>{item.staff_address}</td>
            <td>{item.staff_phone_number}</td>
            <td>{item.staff_email}</td>
            <td><MdModeEdit onClick={() => alert("Editing Staff Row")} /></td>
            <td><MdOutlineDelete onClick={() => alert("Deleting Staff Row")} /></td>
        </tr>
    );
}



export default StaffRow;