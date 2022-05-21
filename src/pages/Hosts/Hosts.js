import React, { useEffect } from 'react';
import AddHostsForm from '../../components/AddHostsForm/AddHostsForm';
import HostsTable from '../../components/HostsTable';
import Header from '../../components/Header/Header';
import useGet from '../../hooks/useGet';

import './Hosts.css';

const Hosts = () => {
    const [{ data, isLoading, error }, setUrl, setReqData] = useGet('');

    useEffect(() => {
        setUrl('http://flip1.engr.oregonstate.edu:6969/hosts');
    });

    return (
        <div>
            <Header title='Hosts' />
            <h2>Here is a list of Hosts in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
            {data.length && <HostsTable items={data} />}
            <AddHostsForm setUrl={setUrl} setReqData={setReqData} />
        </div>
    );
};

export default Hosts;
