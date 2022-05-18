import React from 'react';
import HostsRow from './HostsRow';

function HostsTable({ items }) {
    return (
        <table className='center_table' id='HostsTable'>
            {/* <caption>List of Locations</caption> */}
            <thead>
                <tr>
                    <th>Location_id</th>
                    <th>Class_id</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <HostsRow item={item} key={i} />
                ))}
            </tbody>
        </table>
    );
}

export default HostsTable;
