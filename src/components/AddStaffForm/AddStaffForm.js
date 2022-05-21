import { useState } from 'react';

const AddStaffForm = ({ setUrl, setReqData }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setReqData({
            staff_name: name,
            staff_address: address,
            staff_phone: phone,
            staff_email: email,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/staff');
        console.log('Submitted');
    };

    return (
        <form className='add-staff-form' onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type='text'
                    className='staff-name-input'
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Address:
                <input
                    type='text'
                    className='staff-address-input'
                    onChange={e => setAddress(e.target.value)}
                />
            </label>
            <label>
                Phone:
                <input
                    type='text'
                    className='staff-phone-input'
                    onChange={e => setPhone(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type='email'
                    className='staff-email-input'
                    onChange={e => setEmail(e.target.value)}
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
