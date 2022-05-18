import React from 'react';
import ClassesRow from './ClassesRow';

function ClassesTable({ items }) {
    return (
        <table className='center_table' id='ClassesTable'>
            {/* <caption>List of Classes</caption> */}
            <thead>
                <tr>
                    <th>Class_id</th>
                    <th>Location_id</th>
                    <th>Student_id</th>
                    <th>Staff_id</th>
                    <th>Class_name</th>
                    <th>Class_capacity</th>
                    <th>Class_num_enrolled</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <ClassesRow item={item} key={i} />
                ))}
            </tbody>
        </table>
    );
}

export default ClassesTable;
