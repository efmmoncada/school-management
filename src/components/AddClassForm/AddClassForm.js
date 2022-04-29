import { useState } from "react";

const AddClassForm = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [enrolled, setEnrolled] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    console.log(name);
    console.log(capacity);
    console.log(enrolled);
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
      <button type='submit' className='add-class-button'>
        Add Class
      </button>
    </form>
  );
};

export default AddClassForm;
