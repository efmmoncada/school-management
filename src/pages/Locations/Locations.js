import React, { useEffect } from 'react';
import AddLocationForm from '../../components/AddLocationForm/AddLocationForm';
import LocationsTable from '../../components/LocationsTable';
import Header from '../../components/Header/Header';
import useRequest from '../../hooks/useRequest';

const Locations = () => {
    const [{ data, isLoading, error }, setUrl] = useRequest('');

    useEffect(() => {
        setUrl('http://flip2.engr.oregonstate.edu:6969/locations');
    });

    return (
        <div>
            <Header title='Locations' />
            <h2>Here is a list of locations in your database.</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
            {data.length && <LocationsTable items={data} />}
            <AddLocationForm />
        </div>
    );
};

export default Locations;
