import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

import useRequest from '../../hooks/useRequest';

import './Edit.css';

const EditPage = () => {
    const location = useLocation();
    const { title, fields, primary } = location.state;
    const navigate = useNavigate();

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

    const handleCancel = e => {
        e.preventDefault();
        setUpdatedValues({});
        navigate(`/${title}`);
    };

    return (
        <div className='edit-page'>
            <div className='edit-header'>
                <h2>Editing {title}</h2>
            </div>
            <div className='edit-content'>
                <h3>
                    You are editing {primary.label}: {primary.value}
                </h3>

                {Object.entries(fields).map(([key, value], i) => (
                    <div key={i}>
                        <label key={`label-${i}`} htmlFor={key}>
                            {key}
                        </label>
                        <input
                            readOnly={key === primary.key}
                            id={key}
                            key={`input-${i}`}
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
                    </div>
                ))}
                <div className='edit-buttons'>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={submitChanges}>Save</button>
                </div>
            </div>
            {Object.keys(data).length && !loading && (
                <Navigate to={`/${title}`} />
            )}
        </div>
    );
};

export default EditPage;
