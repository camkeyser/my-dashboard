import React, { useState, useEffect } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import './PotdModule.scss';

const PotdModule = () => {
  const [potd, setPotd] = useState(null);

  // Fallback images
  const fallbackImages = [
    "https://planetary.s3.amazonaws.com/web/assets/pictures/_2400x4157_crop_center-center_82_line/jwst-pillars-of-creation.jpg.webp",
    "https://planetary.s3.amazonaws.com/web/assets/pictures/_2400x2068_crop_center-center_82_line/jwst-jupiter-rings.jpg.webp",
    "https://planetary.s3.amazonaws.com/web/assets/pictures/_1200x694_crop_center-center_82_line/610926/tarantula-nebula-jwst.jpg.webp"
  ];

  // Select a random fallback image
  const getRandomFallbackImage = () => {
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  };

  useEffect(() => {
    const fetchPotd = async () => {
      try {
        // UPDATE THIS API KEI IN .env FILE
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=NxHGNYQINURqi8FlnZEWooXHC9i1XiZh1nUOeLcy`);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();

        // Handle non-image content
        if (data.media_type !== 'image') {
          console.warn('NASA APOD returned non-image media:', data.media_type);
          setPotd({
            url: getRandomFallbackImage(),
            title: 'NASA Picture of the Day (Fallback)',
          });
        } else {
          setPotd(data);
        }
      } catch (error) {
        console.error('Error fetching NASA Picture of the Day:', error);
        setPotd({ url: getRandomFallbackImage(), title: 'NASA Picture of the Day (Fallback)' });
      }
    };

    fetchPotd();
  }, []);

  // Initialize Fancybox after the component mounts and data is fetched
  useEffect(() => {
    if (potd) {
      Fancybox.bind("[data-fancybox]", {
        Thumbs: false,
        Toolbar: false,
        Image: {
          fit: 'contain',
        },
      });
    }
  }, [potd]);

  return (
    <div className="potd-module" style={{ backgroundImage: `url(${potd?.url})` }}>
      <span className="potd-title">NASA Pic of the Day</span>
      {potd ? (
        potd.url ? (
          <a href={potd.hdurl || potd.url} data-fancybox="single" className="potd-module__link" data-caption={potd.title}>
            <span className="sr-only">{potd.title}</span>
          </a>
        ) : (
          <p>No image available today.</p>
        )
      ) : (
        <p>Loading NASA Pic of the Day...</p>
      )}
    </div>
  );
};

export default PotdModule;