import React, { useEffect } from 'react';
import AddClassForm from '../../components/AddClassForm/AddClassForm';
import ClassesTable from '../../components/ClassesTable';
import Header from '../../components/Header/Header';
import useRequest from '../../hooks/useRequest';

import './Classes.css';

const Classes = () => {
    const [{ data, isLoading, error }, setUrl, setReqData, setMethod] =
        useRequest('');

    useEffect(() => {
        setMethod('GET');
        setUrl(`http://flip2.engr.oregonstate.edu:6969/classes`);
    });

    return (
        <div>
            <Header title='Classes' />
            <h2>Here is a list of classes in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {!data.length && error && <p>Error :( Please try again</p>}
            {data.length && (
                <ClassesTable
                    items={data}
                    setUrl={setUrl}
                    setReqData={setReqData}
                    setMethod={setMethod}
                />
            )}
            <AddClassForm
                setUrl={setUrl}
                setReqData={setReqData}
                setMethod={setMethod}
            />
        </div>
    );
};

export default Classes;
