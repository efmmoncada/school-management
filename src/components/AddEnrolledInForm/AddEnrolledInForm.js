import { useState } from 'react';

const AddEnrolledInForm = ({ setUrl, setReqData, setMethod }) => {
    const [student_id, setStudentId] = useState(0);
    const [class_id, setClassId] = useState(0);

    const handleSubmit = event => {
        event.preventDefault();
        setMethod('POST');
        setReqData({
            student_id: student_id,
            class_id: class_id,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/enrolled_in');

        setStudentId(0);
        setClassId(0);

        console.log('Adding entry');
    };

    const filterEnrolledIn = event => {
        console.log('searching for enrolled in');
    };

    return (
        <form className='add-enrolled_in-form' onSubmit={handleSubmit}>
            <label>
                setStudentId:
                <input
                    required value={student_id ? student_id : ''}
                    type='number'
                    className='enrolled_in-location_id-input'
                    onChange={e => setStudentId(e.target.value)}
                />
            </label>
            <label>
                class_id:
                <input
                    required value={class_id ? class_id : ''}
                    type='number'
                    className='enrolled_in-class_id-input'
                    onChange={e => setClassId(e.target.value)}
                />
            </label>
            <button type='submit' className='add-enrolled_in-button'>
                Add enrolled_in
            </button>
            <button
                type='button'
                onClick={filterEnrolledIn}
                className='add-enrolled_in-button'
            >
                Search enrolled_in
            </button>
        </form>
    );
};

export default AddEnrolledInForm;
