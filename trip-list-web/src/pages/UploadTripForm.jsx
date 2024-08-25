import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../firebase.config'; // Ensure correct Firebase config
import { useNavigate } from 'react-router-dom';

const UploadTripForm = () => {
    const navigate = useNavigate();
    const [tripData, setTripData] = useState({
        date: '',
        name: '',
        cost: '',
        organiser: '',
        contact: '',
        location: '',
    });
    const [file, setFile] = useState(null);

    const handleInputChange = (e) => {
        setTripData({
            ...tripData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                // Upload the image to Firebase Storage
                const storageRef = ref(storage, `trips/${file.name}`);
                console.log(`Uploading image to: trips/${file.name}`);
                await uploadBytes(storageRef, file);
                const imageUrl = await getDownloadURL(storageRef);
                console.log(`Uploaded image to: trips/${file.name} download url is ${imageUrl}`);

                // Add a new trip document to Firestore with auto-generated ID
                const tripsCollectionRef = collection(firestore, 'trips');
                const docRef = await addDoc(tripsCollectionRef, { 
                    ...tripData, 
                    imageUrl 
                });
                console.log('Trip data uploaded successfully with ID:', docRef.id);

            } catch (error) {
                console.error('Error uploading trip data:', error);
                navigate('/');
            }
        } else {
            console.error('No file selected');
        }
    };

    return (
        <form className='upload-form' onSubmit={handleSubmit}>
            <input
                type="text"
                name="date"
                placeholder="Date"
                value={tripData.date}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="name"
                placeholder="Trip Name"
                value={tripData.name}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="cost"
                placeholder="Cost"
                value={tripData.cost}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="organiser"
                placeholder="Organiser"
                value={tripData.organiser}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={tripData.contact}
                onChange={handleInputChange}
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={tripData.location}
                onChange={handleInputChange}
                required
            />
            <input type="file" onChange={handleFileChange} required />
            <button type="submit">Upload Trip</button>
        </form>
    );
};

export default UploadTripForm;
