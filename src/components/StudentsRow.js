import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdModeEdit } from 'react-icons/md';

function StudentsRow({ item, setUrl, setReqBody, setMethod }) {
    const removeStudent = () => {
        console.log('Deleting student');
        setMethod('DELETE');
        setReqBody({
            student_id: Number(item.student_id),
            class_id: Number(item.class_id),
        });
        setUrl(`http://flip2.engr.oregonstate.edu:6969/students`);
    };

    return (
        <tr>
            <td>{item.student_id}</td>
            <td>{item.class_id}</td>
            <td>{item.student_name}</td>
            <td>{item.student_address}</td>
            <td>{item.student_email}</td>
            <td>{item.student_gpa}</td>
            <td>
                <Link
                    to='/edit'
                    state={{
                        title: 'students',
                        fields: { ...item },
                        primary: {
                            label: 'Student ID',
                            key: 'student_id',
                            value: item.student_id,
                        },
                    }}
                >
                    <MdModeEdit />
                </Link>
            </td>
            <td>
                <MdOutlineDelete onClick={removeStudent} />
            </td>
        </tr>
    );
}

export default StudentsRow;
