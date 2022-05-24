import { useState } from 'react';

const AddHostsForm = ({ setUrl, setReqData, setMethod }) => {
    const [location_id, setLocationId] = useState(0);
    const [class_id, setClassId] = useState(0);

    const handleSubmit = event => {
        event.preventDefault();
        setMethod('POST');
        setReqData({
            location_id: location_id,
            class_id: class_id,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/hosts');
        console.log('Submitted');
    };

    return (
        <form className='add-hosts-form' onSubmit={handleSubmit}>
            <label>
                location_id:
                <input
                    type='number'
                    className='hosts-location_id-input'
                    onChange={e => setLocationId(e.target.value)}
                />
            </label>
            <label>
                class_id:
                <input
                    type='number'
                    className='hosts-class_id-input'
                    onChange={e => setClassId(e.target.value)}
                />
            </label>
            <button type='submit' className='add-hosts-button'>
                Add hosts
            </button>
            <button type='submit' className='add-hosts-button'>
                Search hosts
            </button>
        </form>
    );
};

export default AddHostsForm;
