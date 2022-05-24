import React, { useEffect } from 'react';
import AddHostsForm from '../../components/AddHostsForm/AddHostsForm';
import HostsTable from '../../components/HostsTable';
import Header from '../../components/Header/Header';
import useRequest from '../../hooks/useRequest';

import './Hosts.css';

const Hosts = () => {
    const [{ data, isLoading, error }, setUrl, setReqData, setMethod] =
        useRequest('');

    useEffect(() => {
        setMethod('GET');
        setUrl('http://flip2.engr.oregonstate.edu:6969/hosts');
    });

    return (
        <div>
            <Header title='Hosts' />
            <h2>Here is a list of Hosts in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {!data.length && error && <p>Error :( Please try again</p>}
            {data.length && <HostsTable items={data} />}
            <AddHostsForm
                setUrl={setUrl}
                setReqData={setReqData}
                setMethod={setMethod}
            />
        </div>
    );
};

export default Hosts;
