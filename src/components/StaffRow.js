import React from 'react';
import { MdOutlineDelete, MdModeEdit } from 'react-icons/md';

function StaffRow({ item, setUrl, setReqBody, setMethod }) {
    const removeStaff = () => {
        console.log('Deleting staff');
        setMethod('DELETE');
        setReqBody({
            staff_id: Number(item.staff_id),
        });
        setUrl(`http://flip2.engr.oregonstate.edu:6969/staff`);
    };

    return (
        <tr>
            <td>{item.staff_id}</td>
            <td>{item.staff_name}</td>
            <td>{item.staff_address}</td>
            <td>{item.staff_phone_number}</td>
            <td>{item.staff_email}</td>
            <td>
                <MdModeEdit onClick={() => alert('Editing Staff Row')} />
            </td>
            <td>
                <MdOutlineDelete onClick={removeStaff} />
            </td>
        </tr>
    );
}

export default StaffRow;
