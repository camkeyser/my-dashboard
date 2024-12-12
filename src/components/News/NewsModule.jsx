import React, { useState, useEffect } from 'react';
import './NewsModule.scss';
import fallbackImage from '../../assets/news-fb.jpg';

const NewsModule = ({ theme }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  // UPDATE THIS API KEI IN .env FILE
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?country=us&lang=en&max=8&apikey=${apiKey}`
      );
      const data = await response.json();

      const validArticles = data.articles
        .filter((item) => item.title && item.description)
        .slice(0, 8);

      setNewsItems(validArticles);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const nextPage = () => {
    setCurrentPage(
      (prevPage) => (prevPage + 1) % Math.ceil(newsItems.length / itemsPerPage)
    );
  };

  const prevPage = () => {
    setCurrentPage(
      (prevPage) =>
        (prevPage - 1 + Math.ceil(newsItems.length / itemsPerPage)) %
        Math.ceil(newsItems.length / itemsPerPage)
    );
  };

  const startIndex = currentPage * itemsPerPage;
  const displayedItems = newsItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={`news-module news-module--${theme}`}>
      <h2>Latest News</h2>
      <div className="news-module__list">
        {displayedItems.map((item, index) => (
          <div key={index} className="news-module__item">
            <div className="news-module__text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-module__button"
              >
                View More
              </a>
            </div>
            <img
              src={item.image || fallbackImage}
              alt={item.title}
              className="news-module__image"
            />
          </div>
        ))}
      </div>
      <div className="news-module__pagination">
        <button onClick={prevPage} disabled={currentPage === 0}>
          ⟵
        </button>
        <span>
          {currentPage + 1} / {Math.ceil(newsItems.length / itemsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(newsItems.length / itemsPerPage) - 1
          }
        >
          ⟶
        </button>
      </div>
    </div>
  );
};

export default NewsModule;