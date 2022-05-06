import { useState } from "react";

const AddEnrolledInForm = () => {
  const [student_id, setStudentId] = useState(0);
  const [class_id, setClassId] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    console.log(student_id);
    console.log(class_id);
  };

  return (
    <form className='add-enrolled_in-form' onSubmit={handleSubmit}>
      <label>
      setStudentId:
        <input
          type='number'
          className='enrolled_in-location_id-input'
          onChange={(e) => setStudentId(e.target.value)}
        />
      </label>
      <label>
        class_id:
        <input
          type='number'
          className='enrolled_in-class_id-input'
          onChange={(e) => setClassId(e.target.value)}
        />
      </label>
      <button type='submit' className='add-enrolled_in-button'>
        Add enrolled_in
      </button>
      <button type='submit' className='add-enrolled_in-button'>
        Search enrolled_in
      </button>
    </form>
  );
};

export default AddEnrolledInForm;
