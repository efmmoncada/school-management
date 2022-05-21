import { useState } from 'react';

const AddStudentForm = ({ setUrl, setReqData }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [gpa, setGpa] = useState(0.0);

    const handleSubmit = event => {
        event.preventDefault();
        setReqData({
            class_id: 1,
            student_name: name,
            student_address: address,
            student_email: email,
            student_gpa: gpa,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/students');
        console.log('Submitted');
    };

    return (
        <form className='add-student-form' onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type='text'
                    className='student-name-input'
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Address:
                <input
                    type='text'
                    className='student-address-input'
                    onChange={e => setAddress(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type='email'
                    className='student-email-input'
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>
                GPA:
                <input
                    type='number'
                    step='0.01'
                    className='student-gpa-input'
                    onChange={e => setGpa(e.target.value)}
                />
            </label>
            <button type='submit' className='add-student-button'>
                Add Student
            </button>
            <button type='submit' className='add-student-button'>
                Search Student
            </button>
        </form>
    );
};

export default AddStudentForm;
