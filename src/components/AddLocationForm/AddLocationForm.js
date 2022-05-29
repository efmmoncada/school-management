import { useState } from 'react';

const AddLocationForm = ({ setUrl, setReqData, setMethod }) => {
    const [numSeats, setNumSeats] = useState(0);
    const [isAccessible, setIsAccessible] = useState(false);
    const [buildingName, setBuildingName] = useState('');
    const [class_id, setClassID] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        setMethod('POST');
        setReqData({
            class_id: class_id,
            numSeats: numSeats,
            isAccessible: isAccessible,
            buildingName: buildingName,
        });
        setUrl('http://flip2.engr.oregonstate.edu:6969/locations');

        setNumSeats(0);
        setIsAccessible(false);
        setBuildingName('');
        setClassID('');

        console.log('Submitted');
    };

    const filterLocations = event => {
        console.log('searching for locations');
    };

    return (
        <form className='add-class-form' onSubmit={handleSubmit}>
            <div className='fields'>
                <label>
                    <input
                        required
                        value={class_id ? class_id : ''}
                        type='number'
                        className='class-capacity-input'
                        onChange={e => setClassID(e.target.value)}
                    />
                    Class_ID
                </label>
                <label>
                    <input
                        required
                        value={numSeats ? numSeats : ''}
                        type='number'
                        className='class-capacity-input'
                        onChange={e => setNumSeats(e.target.value)}
                    />
                    Number of Seats
                </label>
                <label>
                    <input
                        required
                        value={isAccessible ? isAccessible : ''}
                        type='checkbox'
                        className='class-enrolled-input'
                        onChange={e => setIsAccessible(e.target.checked)}
                    />
                    Is Accessible
                </label>
                <label>
                    <input
                        required
                        value={buildingName ? buildingName : ''}
                        type='text'
                        className='class-name-input'
                        onChange={e => setBuildingName(e.target.value)}
                    />
                    Building Name
                </label>
            </div>
            <div className='buttons'>
                <button type='submit' className='add-class-button'>
                    Add Location
                </button>
                <button
                    type='button'
                    onClick={filterLocations}
                    className='add-class-button'
                >
                    Search Location
                </button>
            </div>
        </form>
    );
};

export default AddLocationForm;
