import React from 'react';
import EnrolledInRow from './EnrolledInRow';

function EnrolledInTable({ items, setUrl, setReqData, setMethod }) {
    return (
        <table className='center_table' id='Enrolled_InTable'>
            {/* <caption>List of Locations</caption> */}
            <thead>
                <tr>
                    <th>Student_id</th>
                    <th>Class_id</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <EnrolledInRow
                        item={item}
                        key={i}
                        setUrl={setUrl}
                        setReqData={setReqData}
                        setMethod={setMethod}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default EnrolledInTable;
