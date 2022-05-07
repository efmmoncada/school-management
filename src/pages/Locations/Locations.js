import React from "react";
import AddLocationForm from "../../components/AddLocationForm/AddLocationForm";
import LocationsTable from "../../components/LocationsTable";
import LocationsData from "../../data/locations";
import Header from "../../components/Header/Header";

const Locations = () => {
  return (
    <div>
      <Header title='Locations' />
      <h2>Here is a list of locations in your database.</h2>
      <LocationsTable items={LocationsData} />
      <AddLocationForm />
    </div>
  );
};

export default Locations;
