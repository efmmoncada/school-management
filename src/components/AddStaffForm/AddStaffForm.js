import { useState } from 'react';

const AddStaffForm = ({ setUrl, setReqData, setMethod }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setMethod('POST');
        setReqData({
            staff_name: name,
            staff_address: address,
            staff_phone: phone,
            staff_email: email,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/staff');

        setName('');
        setAddress('');
        setPhone('');
        setEmail('');

        console.log('Submitted');
    };

    const filterStaff = event => {
        console.log('searching for staff');
    };

    return (
        <form className='add-staff-form' onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    required value={name ? name : ''}
                    type='text'
                    className='staff-name-input'
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Address:
                <input
                    required value={address ? address : ''}
                    type='text'
                    className='staff-address-input'
                    onChange={e => setAddress(e.target.value)}
                />
            </label>
            <label>
                Phone:
                <input
                    required value={phone ? phone : ''}
                    type='text'
                    className='staff-phone-input'
                    onChange={e => setPhone(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    required value={email ? email : ''}
                    type='email'
                    className='staff-email-input'
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <button type='submit' className='add-staff-button'>
                Add Staff
            </button>
            <button
                type='button'
                onClick={filterStaff}
                className='add-staff-button'
            >
                Search Staff
            </button>
        </form>
    );
};

export default AddStaffForm;
