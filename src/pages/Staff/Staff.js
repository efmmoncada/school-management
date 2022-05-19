import React, { useEffect } from 'react';
import AddStaffForm from '../../components/AddStaffForm/AddStaffForm';
import StaffTable from '../../components/StaffTable';
import Header from '../../components/Header/Header';
import useGet from '../../hooks/useGet';

import './Staff.css';

const PORT = process.env.REACT_APP_DB_PORT || 6969;

const Staff = () => {
    const [{ data, isLoading, error }, setUrl] = useGet('');

    useEffect(() => {
        setUrl(`http://flip1.engr.oregonstate.edu:${PORT}/staff`);
    });

    return (
        <div>
            <Header title='Staff' />
            <h2>Here is a list of staff in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
            {data.length && <StaffTable items={data} />}
            <AddStaffForm />
        </div>
    );
};

export default Staff;
