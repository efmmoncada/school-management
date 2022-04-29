import React from "react";
import { MdOutlineDelete, MdModeEdit} from 'react-icons/md';

function LocationsRow({ item }) {
    return (
        <tr>
            <td>{item.location_id}</td>
            <td>{item.class_id}</td>
            <td>{item.location_num_of_seats}</td>
            <td>{item.location_accessibility}</td>
            <td>{item.location_building}</td>
            <td><MdModeEdit onClick={() => alert("Editing Location Row")} /></td>
            <td><MdOutlineDelete onClick={() => alert("Deleting Location Row")} /></td>
        </tr>
    );
}



export default LocationsRow;