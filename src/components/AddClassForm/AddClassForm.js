import { useState } from 'react';

const AddClassForm = ({ setUrl, setReqData, setMethod }) => {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [enrolled, setEnrolled] = useState(0);
    const [staff_id, setStaffID] = useState(0);
    const [location_id, setLocationID] = useState(0);
    const [student_id, setStudentID] = useState(0);

    const handleSubmit = event => {
        event.preventDefault();
        setMethod('POST');
        setReqData({
            location_id: location_id,
            student_id: student_id,
            staff_id: staff_id,
            class_name: name,
            class_capacity: capacity,
            class_enrolled: enrolled,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/classes');
        console.log('Submitted');
    };

    return (
        <form className='add-class-form' onSubmit={handleSubmit}>
            <label>
                location_id:
                <input
                    type='number'
                    className='class-name-input'
                    onChange={e => setLocationID(e.target.value)}
                />
            </label>
            <label>
                student_id:
                <input
                    type='number'
                    className='class-name-input'
                    onChange={e => setStudentID(e.target.value)}
                />
            </label>
            <label>
                Staff_id:
                <input
                    type='number'
                    className='class-enrolled-input'
                    onChange={e => setStaffID(e.target.value)}
                />
            </label>
            <label>
                Name:
                <input
                    type='text'
                    className='class-name-input'
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Capacity:
                <input
                    type='number'
                    className='class-capacity-input'
                    onChange={e => setCapacity(e.target.value)}
                />
            </label>
            <label>
                Enrolled:
                <input
                    type='number'
                    className='class-enrolled-input'
                    onChange={e => setEnrolled(e.target.value)}
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
