import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdModeEdit } from 'react-icons/md';

function LocationsRow({ item, setUrl, setReqBody, setMethod }) {
    const removeLocation = () => {
        console.log('Deleting location');
        setMethod('DELETE');
        setReqBody({
            location_id: Number(item.location_id),
        });
        setUrl(`http://flip2.engr.oregonstate.edu:6969/locations`);
    };

    return (
        <tr>
            <td>{item.location_id}</td>
            <td>{item.class_id}</td>
            <td>{item.location_num_of_seats}</td>
            <td>{item.location_accessibility}</td>
            <td>{item.location_building}</td>
            <td>
                <Link
                    to='/edit'
                    state={{
                        title: 'locations',
                        fields: { ...item },
                        primary: {
                            label: 'Location ID',
                            key: 'location_id',
                            value: item.location_id,
                        },
                    }}
                >
                    <MdModeEdit />
                </Link>
            </td>
            <td>
                <MdOutlineDelete onClick={removeLocation} />
            </td>
        </tr>
    );
}

export default LocationsRow;
