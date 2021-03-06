import { useState } from 'react';

const AddClassForm = ({ setUrl, setReqData, setMethod }) => {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [enrolled, setEnrolled] = useState(0);
    const [staff_id, setStaffID] = useState(0);
    const [location_id, setLocationID] = useState(0);

    const handleSubmit = event => {
        event.preventDefault();
        setMethod('POST');
        setReqData({
            location_id: location_id,
            staff_id: staff_id,
            class_name: name,
            class_capacity: capacity,
            class_enrolled: enrolled,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/classes');
        setName('');
        setCapacity(0);
        setEnrolled(0);
        setStaffID(0);
        setLocationID(0);

        console.log('Adding class');
    };

    const filterStudents = event => {
        console.log('searching for students');
    };

    return (
        <form className='add-class-form' onSubmit={handleSubmit}>
            <div className='fields'>
                <label>
                    <input
                        required
                        value={location_id ? location_id : ''}
                        type='number'
                        className='class-name-input'
                        onChange={e => setLocationID(e.target.value)}
                    />
                    location_id
                </label>
                <label>
                    <input
                        required
                        value={staff_id ? staff_id : ''}
                        type='number'
                        className='class-enrolled-input'
                        onChange={e => setStaffID(e.target.value)}
                    />
                    Staff_id
                </label>
                <label>
                    <input
                        required
                        value={name ? name : ''}
                        type='text'
                        className='class-name-input'
                        onChange={e => setName(e.target.value)}
                    />
                    Name
                </label>
                <label>
                    <input
                        required
                        value={capacity ? capacity : ''}
                        type='number'
                        className='class-capacity-input'
                        onChange={e => setCapacity(e.target.value)}
                    />
                    Capacity
                </label>
                <label>
                    <input
                        required
                        value={enrolled ? enrolled : ''}
                        type='number'
                        className='class-enrolled-input'
                        onChange={e => setEnrolled(e.target.value)}
                    />
                    Enrolled
                </label>
            </div>
            <div className='buttons'>
                <button type='submit' className='add-class-button'>
                    Add Class
                </button>
                <button
                    type='button'
                    onClick={filterStudents}
                    className='add-class-button'
                >
                    Search Class
                </button>
            </div>
        </form>
    );
};

export default AddClassForm;
