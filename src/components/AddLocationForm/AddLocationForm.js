import { useState } from "react";

const AddLocationForm = () => {
  const [numSeats, setNumSeats] = useState(0);
  const [isAccessible, setIsAccessible] = useState(false);
  const [buildingName, setBuildingName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    console.log(numSeats);
    console.log(isAccessible);
    console.log(buildingName);
  };

  return (
    <form className='add-class-form' onSubmit={handleSubmit}>
      <label>
        Number of Seats:
        <input
          type='number'
          className='class-capacity-input'
          onChange={(e) => setNumSeats(e.target.value)}
        />
      </label>
      <label>
        Is Accessible:
        <input
          type='checkbox'
          className='class-enrolled-input'
          onChange={(e) => setIsAccessible(e.target.checked)}
        />
      </label>
      <label>
        Building Name:
        <input
          type='text'
          className='class-name-input'
          onChange={(e) => setBuildingName(e.target.value)}
        />
      </label>
      <button type='submit' className='add-class-button'>
        Add Location
      </button>
    </form>
  );
};

export default AddLocationForm;
