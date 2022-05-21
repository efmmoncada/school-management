import React, { useEffect } from 'react';
import AddLocationForm from '../../components/AddLocationForm/AddLocationForm';
import LocationsTable from '../../components/LocationsTable';
import Header from '../../components/Header/Header';
import useGet from '../../hooks/useGet';

const PORT = process.env.REACT_APP_DB_PORT || 6969;

const Locations = () => {
    const [{ data, isLoading, error }, setUrl, setReqData] = useGet('', {});

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
            <AddLocationForm setUrl={setUrl} setReqData={setReqData} />
        </div>
    );
};

export default Locations;
