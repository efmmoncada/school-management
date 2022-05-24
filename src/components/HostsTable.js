import React from 'react';
import HostsRow from './HostsRow';

function HostsTable({ items, setUrl, setReqData, setMethod }) {
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
                    <HostsRow
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

export default HostsTable;
