import React, { useState, useEffect } from 'react';
import './FotdModule.scss';

const FotdModule = ({ theme }) => {
  const [fact, setFact] = useState(null);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const data = await response.json();
        setFact(data.text);
      } catch (error) {
        console.error('Error fetching Fact of the Day:', error);
      }
    };

    fetchFact();
  }, []);

  return (
    <div className={`fotd-module fotd-module--${theme}`}>
      <h2>Fact of the Day</h2>
      {fact ? <p>{fact}</p> : <p>Loading Fact of the Day...</p>}
    </div>
  );
};

export default FotdModule;