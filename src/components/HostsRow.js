import React from "react";
import { MdOutlineDelete, MdModeEdit} from 'react-icons/md';

function HostsRow({ item }) {
    return (
        <tr>
            <td>{item.location_id}</td>
            <td>{item.class_id}</td>
            <td><MdModeEdit onClick={() => alert("Editing Hosts Row")} /></td>
            <td><MdOutlineDelete onClick={() => alert("Deleting Hosts Row")} /></td>
        </tr>
    );
}



export default HostsRow;