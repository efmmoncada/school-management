import React, { useEffect } from 'react';
import AddClassForm from '../../components/AddClassForm/AddClassForm';
import ClassesTable from '../../components/ClassesTable';
import Header from '../../components/Header/Header';
import useGet from '../../hooks/useGet';

import './Classes.css';

const Classes = () => {
    const [{ data, isLoading, error }, setUrl, setReqData] = useGet('');

    useEffect(() => {
        setUrl(`http://flip2.engr.oregonstate.edu:6969/classes`);
    });

    return (
        <div>
            <Header title='Classes' />
            <h2>Here is a list of classes in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
            {data.length && <ClassesTable items={data} />}
            <AddClassForm setUrl={setUrl} setReqData={setReqData} />
        </div>
    );
};

export default Classes;
