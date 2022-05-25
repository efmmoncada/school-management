import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdModeEdit } from 'react-icons/md';

function HostsRow({ item, setUrl, setReqData, setMethod }) {
    const removeHost = () => {
        console.log('Deleting host');
        setMethod('DELETE');
        setReqData({
            location_id: Number(item.location_id),
            class_id: Number(item.class_id),
        });
        setUrl(`http://flip2.engr.oregonstate.edu:6969/hosts`);
    };

    return (
        <tr>
            <td>{item.location_id}</td>
            <td>{item.class_id}</td>
            <td>
                <Link
                    to='/edit'
                    state={{
                        title: 'hosts',
                        fields: { ...item },
                        primary: {
                            label: 'Hosts Relationship',
                            key: '',
                            value: undefined,
                        },
                    }}
                >
                    <MdModeEdit />
                </Link>
            </td>
            <td>
                <MdOutlineDelete onClick={removeHost} />
            </td>
        </tr>
    );
}

export default HostsRow;
