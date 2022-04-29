import AddLocationForm from "../../components/AddLocationForm/AddLocationForm";
import LocationsTable from "../../components/LocationsTable";
import LocationsData from "../../data/locations";

const Locations = () => {
  return (
    <div>
      {/* <h1>Locations</h1> */}
      <h2>Here is a list of locations in your database.</h2>
      <LocationsTable items={LocationsData} />
      <AddLocationForm />
    </div>
  );
};

export default Locations;
