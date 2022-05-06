import { useState } from "react";

const AddStaffForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    console.log(name);
    console.log(address);
    console.log(phone);
    console.log(email);
  };

  return (
    <form className='add-staff-form' onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          className='staff-name-input'
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Address:
        <input
          type='text'
          className='staff-address-input'
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type='text'
          className='staff-phone-input'
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type='email'
          className='staff-email-input'
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type='submit' className='add-staff-button'>
        Add Staff
      </button>
      <button type='submit' className='add-staff-button'>
        Search Staff
      </button>
    </form>
  );
};

export default AddStaffForm;
