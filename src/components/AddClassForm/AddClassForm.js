import { useState } from "react";

const AddClassForm = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [enrolled, setEnrolled] = useState(0);
  const [staffID, setStaffID] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    console.log(name);
    console.log(capacity);
    console.log(enrolled);
    console.log(staffID);
  };

  return (
    <form className='add-class-form' onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          className='class-name-input'
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Capacity:
        <input
          type='number'
          className='class-capacity-input'
          onChange={(e) => setCapacity(e.target.value)}
        />
      </label>
      <label>
        Enrolled:
        <input
          type='number'
          className='class-enrolled-input'
          onChange={(e) => setEnrolled(e.target.value)}
        />
      </label>
      <label>
        Staff_id:
        <input
          type='number'
          className='class-enrolled-input'
          onChange={(e) => setStaffID(e.target.value)}
        />
      </label>
      <button type='submit' className='add-class-button'>
        Add Class
      </button>
      <button type='submit' className='add-class-button'>
        Search Class
      </button>
    </form>
  );
};

export default AddClassForm;
