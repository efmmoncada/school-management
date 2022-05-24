import React from 'react';
import { MdOutlineDelete, MdModeEdit } from 'react-icons/md';

function ClassesRow({ item, setUrl, setReqData, setMethod }) {
    const removeClass = () => {
        console.log('Deleting class');
        setMethod('DELETE');
        setReqData({
            class_id: Number(item.class_id),
        });
        setUrl(`http://flip2.engr.oregonstate.edu:6969/classes`);
    };

    return (
        <tr>
            <td>{item.class_id}</td>
            <td>{item.location_id}</td>
            <td>{item.student_id}</td>
            <td>{item.staff_id}</td>
            <td>{item.class_name}</td>
            <td>{item.class_capacity}</td>
            <td>{item.class_num_enrolled}</td>
            <td>
                <MdModeEdit onClick={() => alert('Editing Class Row')} />
            </td>
            <td>
                <MdOutlineDelete onClick={removeClass} />
            </td>
        </tr>
    );
}

export default ClassesRow;
