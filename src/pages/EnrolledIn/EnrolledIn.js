import React, { useEffect } from 'react';
import AddEnrolledInForm from '../../components/AddEnrolledInForm/AddEnrolledInForm.js';
import EnrolledInTable from '../../components/EnrolledInTable';
import Header from '../../components/Header/Header.js';
import useGet from '../../hooks/useGet';

import './EnrolledIn.css';

const EnrolledIn = () => {
    const [{ data, isLoading, error }, setUrl, setReqData] = useGet('', {});

    useEffect(() => {
        setUrl('http://flip2.engr.oregonstate.edu:6969/enrolled_in');
    });

    return (
        <div>
            <Header title='Enrolled In' />
            <h2>Here is a list of Enrolled_In in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
            {data.length && <EnrolledInTable items={data} />}
            <AddEnrolledInForm setUrl={setUrl} setReqData={setReqData} />
        </div>
    );
};

export default EnrolledIn;
