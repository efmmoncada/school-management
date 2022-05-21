import { useState } from "react";

const AddLocationForm = ({ setUrl, setReqData }) => {
  const [numSeats, setNumSeats] = useState(0);
  const [isAccessible, setIsAccessible] = useState(false);
  const [buildingName, setBuildingName] = useState("");
  const [class_id, setClassID] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    setReqData({
        class_id:class_id,
        numSeats: numSeats,
        isAccessible: isAccessible,
        buildingName: buildingName,
    });
    setUrl('http://flip2.engr.oregonstate.edu:6969/locations');
    console.log('Submitted');
};

  return (
    <form className='add-class-form' onSubmit={handleSubmit}>
        <label>
        Class_ID:
        <input
          type='number'
          className='class-capacity-input'
          onChange={(e) => setClassID(e.target.value)}
        />
      </label>
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
      <button type='submit' className='add-class-button'>
        Search Location
      </button>
    </form>
  );
};

export default AddLocationForm;
