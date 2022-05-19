import React, { useEffect } from 'react';
import StudentsTable from '../../components/StudentsTable';
import AddStudentForm from '../../components/AddStudentForm/AddStudentForm';
import Header from '../../components/Header/Header';

import useGet from '../../hooks/useGet';

import './Students.css';

const PORT = process.env.REACT_APP_DB_PORT;

const Students = () => {
    const [{ data, isLoading, error }, setUrl] = useGet('');

    useEffect(() => {
        setUrl(`http://localhost:${PORT}/students`);
    });

    return (
        <div>
            <Header title='Students' />
            <h2>Here is a list of students in your database.</h2>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
            {data.length && <StudentsTable items={data} />}
            <AddStudentForm />
        </div>
    );
};

export default Students;
