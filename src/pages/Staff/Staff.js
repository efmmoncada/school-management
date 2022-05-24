import React, { useEffect } from 'react';
import AddStaffForm from '../../components/AddStaffForm/AddStaffForm';
import StaffTable from '../../components/StaffTable';
import Header from '../../components/Header/Header';
import useRequest from '../../hooks/useRequest';

import './Staff.css';

const Staff = () => {
    const [{ data, isLoading, error }, setUrl, setReqData, setMethod] =
        useRequest('');

    useEffect(() => {
        setMethod('GET');
        setUrl('http://flip2.engr.oregonstate.edu:6969/staff');
    });

    return (
        <div>
            <Header title='Staff' />
            <h2>Here is a list of staff in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {!data.length && error && <p>Error :( Please try again</p>}
            {data.length && (
                <StaffTable
                    items={data}
                    setUrl={setUrl}
                    setReqBody={setReqData}
                    setMethod={setMethod}
                />
            )}
            <AddStaffForm
                setUrl={setUrl}
                setReqData={setReqData}
                setMethod={setMethod}
            />
        </div>
    );
};

export default Staff;
