import React, { useEffect } from 'react';
import AddEnrolledInForm from '../../components/AddEnrolledInForm/AddEnrolledInForm.js';
import EnrolledInTable from '../../components/EnrolledInTable';
import Header from '../../components/Header/Header.js';
import useRequest from '../../hooks/useRequest';

import './EnrolledIn.css';

const EnrolledIn = () => {
    const [{ data, isLoading, error }, setUrl, setReqData, setMethod] =
        useRequest('');

    useEffect(() => {
        setMethod('GET');
        setUrl('http://flip2.engr.oregonstate.edu:6969/enrolled_in');
    });

    return (
        <div>
            <Header title='Enrolled In' />
            <h2>Here is a list of Enrolled_In in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {!data.length && error && <p>Error :( Please try again</p>}
            {data.length && (
                <EnrolledInTable
                    items={data}
                    setUrl={setUrl}
                    setReqData={setReqData}
                    setMethod={setMethod}
                />
            )}
            <AddEnrolledInForm
                setUrl={setUrl}
                setReqData={setReqData}
                setMethod={setMethod}
            />
        </div>
    );
};

export default EnrolledIn;
