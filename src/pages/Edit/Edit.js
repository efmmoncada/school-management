import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

import useRequest from '../../hooks/useRequest';

const EditPage = () => {
    const location = useLocation();
    const { title, fields } = location.state;

    const [updatedValues, setUpdatedValues] = useState(fields);

    // eslint-disable-next-line no-unused-vars
    const [{ data, loading, _ }, setUrl, setReqBody, setMethod] =
        useRequest('');

    const submitChanges = e => {
        e.preventDefault();
        setMethod('PUT');
        setReqBody({
            ...updatedValues,
        });
        setUrl(`http://flip2.engr.oregonstate.edu:6969/${title}`);
    };

    return (
        <div className='modal'>
            <div className='modal-header'>
                <h2>Edit {title}</h2>
                <Link to={`/${title}`}>&times;</Link>
            </div>
            <div className='modal-content'>
                {Object.entries(fields).map(([key, value]) => (
                    <input
                        key={key}
                        type='text'
                        name={key}
                        defaultValue={value}
                        onChange={e =>
                            setUpdatedValues(prev => ({
                                ...prev,
                                [key]: e.target.value,
                            }))
                        }
                    />
                ))}
                <button onClick={() => setUpdatedValues({})}>Cancel</button>
                <button onClick={submitChanges}>Save</button>
            </div>
            {Object.keys(data).length && !loading && (
                <Navigate to={`/${title}`} />
            )}
        </div>
    );
};

export default EditPage;
