import React, { useEffect } from 'react';
import AddStaffForm from '../../components/AddStaffForm/AddStaffForm';
import StaffTable from '../../components/StaffTable';
import Header from '../../components/Header/Header';
import useGet from '../../hooks/useGet';

import './Staff.css';

const Staff = () => {
    const [{ data, isLoading, error }, setUrl, setReqData] = useGet('', {});

    useEffect(() => {
        setUrl('http://flip2.engr.oregonstate.edu:6969/staff');
    });

    return (
        <div>
            <Header title='Staff' />
            <h2>Here is a list of staff in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
            {data.length && <StaffTable items={data} />}
            <AddStaffForm setUrl={setUrl} setReqData={setReqData} />
        </div>
    );
};

export default Staff;
