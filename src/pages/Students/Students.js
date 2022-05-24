import React, { useEffect } from 'react';
import StudentsTable from '../../components/StudentsTable';
import AddStudentForm from '../../components/AddStudentForm/AddStudentForm';
import Header from '../../components/Header/Header';
import useRequest from '../../hooks/useRequest';

import './Students.css';

const Students = () => {
    const [{ data, isLoading, error }, setUrl, setReqData, setMethod] =
        useRequest('');

    useEffect(() => {
        setUrl('http://flip2.engr.oregonstate.edu:6969/students');
        setMethod('GET');
    });

    return (
        <div>
            <Header title='Students' />
            <h2>Here is a list of students in your database.</h2>

            {isLoading && <p>Loading...</p>}
            {!data.length && error && <p>Error :( Please try again</p>}
            {data.length && (
                <StudentsTable
                    items={data}
                    setUrl={setUrl}
                    setReqBody={setReqData}
                    setMethod={setMethod}
                />
            )}
            <AddStudentForm
                setUrl={setUrl}
                setReqData={setReqData}
                setMethod={setMethod}
            />
        </div>
    );
};

export default Students;
