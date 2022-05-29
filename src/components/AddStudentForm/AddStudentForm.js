import { useState } from 'react';

const AddStudentForm = ({ setUrl, setReqData, setMethod }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [gpa, setGpa] = useState(0.0);
    const [classID, setClassID] = useState(0);

    const handleSubmit = event => {
        event.preventDefault();
        setMethod('POST');
        setReqData({
            class_id: classID,
            student_name: name,
            student_address: address,
            student_email: email,
            student_gpa: gpa,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/students');

        setClassID(0);
        setName('');
        setAddress('');
        setEmail('');
        setGpa(0.0);

        console.log('Submitted');
    };

    const filterStudents = event => {
        console.log('searching for students');
    };

    return (
        <form className='add-student-form' onSubmit={handleSubmit}>
            <div className='fields'>
                <label>
                    <input
                        required
                        value={classID ? classID : ''}
                        type='number'
                        className='student-classID-input'
                        onChange={e => setClassID(e.target.value)}
                    />
                    ClassID
                </label>
                <label>
                    <input
                        required
                        value={name ? name : ''}
                        type='text'
                        className='student-name-input'
                        onChange={e => setName(e.target.value)}
                    />
                    Name
                </label>
                <label>
                    <input
                        required
                        value={address ? address : ''}
                        type='text'
                        className='student-address-input'
                        onChange={e => setAddress(e.target.value)}
                    />
                    Address
                </label>
                <label>
                    <input
                        required
                        value={email ? email : ''}
                        type='email'
                        className='student-email-input'
                        onChange={e => setEmail(e.target.value)}
                    />
                    Email
                </label>
                <label>
                    <input
                        required
                        value={gpa ? gpa : ''}
                        type='number'
                        step='0.01'
                        className='student-gpa-input'
                        onChange={e => setGpa(e.target.value)}
                    />
                    GPA
                </label>
            </div>
            <div className='buttons'>
                <button type='submit' className='add-student-button'>
                    Add Student
                </button>
                <button
                    type='button'
                    onClick={filterStudents}
                    className='add-student-button'
                >
                    Search Student
                </button>
            </div>
        </form>
    );
};

export default AddStudentForm;
