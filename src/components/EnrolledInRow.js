import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdModeEdit } from 'react-icons/md';

function Enrolled_InRow({ item, setUrl, setReqData, setMethod }) {
    const removeEnrolledIn = () => {
        console.log('Deleting enrolled in');
        setMethod('DELETE');
        setReqData({
            student_id: Number(item.student_id),
            class_id: Number(item.class_id),
        });
        setUrl(`http://flip2.engr.oregonstate.edu:6969/enrolled_in`);
    };

    return (
        <tr>
            <td>{item.student_id}</td>
            <td>{item.class_id}</td>
            <td>
                <Link
                    to='/edit'
                    state={{
                        title: 'enrolled_in',
                        fields: { ...item },
                    }}
                >
                    <MdModeEdit />
                </Link>
            </td>
            <td>
                <MdOutlineDelete onClick={removeEnrolledIn} />
            </td>
        </tr>
    );
}

export default Enrolled_InRow;
