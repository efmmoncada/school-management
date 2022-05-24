import React from 'react';
import LocationsRow from './LocationsRow';

function LocationsTable({ items, setUrl, setReqData, setMethod }) {
    return (
        <table className='center_table' id='LocationsTable'>
            {/* <caption>List of Locations</caption> */}
            <thead>
                <tr>
                    <th>Location_id</th>
                    <th>Class_id</th>
                    <th>location_num_of_seats</th>
                    <th>location_accessibility</th>
                    <th>location_building</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <LocationsRow
                        item={item}
                        key={i}
                        setUrl={setUrl}
                        setReqBody={setReqData}
                        setMethod={setMethod}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default LocationsTable;
