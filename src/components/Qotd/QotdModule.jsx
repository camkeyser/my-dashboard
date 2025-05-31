import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QotdModule.scss';

const QotdModule = ({ theme }) => {
  const [quote, setQuote] = useState(null);
  // UPDATE THIS API KEI IN .env FILE
  const apiKey = process.env.REACT_APP_QOTD_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.api-ninjas.com/v1/quotes`, {
        headers: { 'X-Api-Key': apiKey },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setQuote(response.data[0]);
        }
      })
      .catch((error) => console.error('Error fetching quote:', error));
  }, []);

  if (!quote)
    return (
      <div className={`qotd-module qotd-module--${theme} qotd-module--loading`}>
        Loading quote...
      </div>
    );

  return (
    <div className={`qotd-module qotd-module--${theme}`}>
      <h2>Quote of the Day</h2>
      <p className="quote">"{quote.quote}"</p>
      <p className="author">- {quote.author}</p>
    </div>
  );
};

export default QotdModule;