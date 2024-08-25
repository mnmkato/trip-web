import { useEffect, useState } from "react";
import '../styles/style.css';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.config.js'; 

function PlaceComponent({ data }) {
  const [placesWithImages, setPlacesWithImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const placeData = await Promise.all(
          data.map(async (place) => {
            const imageRef = ref(storage, `places/${place}.jpg`);
            const imageURL = await getDownloadURL(imageRef);
            return { name: place, imageURL };
          })
        );
        setPlacesWithImages(placeData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [data]);

  return (
    <div className="places">
      <h3>Places</h3>
      <div className="places-grid">
        {placesWithImages.map((place, index) => (
          <div key={index} className='place-div'>
            <img className='place-image' src={place.imageURL} alt={place.name} />
            <div className='place-name'>{place.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceComponent;
