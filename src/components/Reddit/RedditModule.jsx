import React, { useState, useEffect } from 'react';
import axios from 'axios';
import redditLogo from '../../assets/reddit-logo.svg';
import './RedditModule.scss';

const RedditModule = ({ theme }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://www.reddit.com/r/all/top/.json?t=day&limit=25')
      .then((response) => {
        const fetchedPosts = response.data.data.children.map((post) => ({
          title: post.data.title,
          subreddit: post.data.subreddit_name_prefixed,
          thumbnail:
            post.data.post_hint === 'image' && post.data.thumbnail.startsWith('http')
              ? post.data.thumbnail
              : redditLogo,
          permalink: `https://old.reddit.com${post.data.permalink}`,
          commentsLink: `https://old.reddit.com${post.data.permalink}?sort=hot`,
        }));
        setPosts(fetchedPosts);
      })
      .catch((error) => console.error('Error fetching Reddit posts:', error));
  }, []);

  return (
    <div className={`reddit-module reddit-module--${theme}`}>
      <h2>Reddit: Top Posts</h2>
      <div className="reddit-module__list">
        {posts.slice(0, 5).map((post, index) => (
          <div key={index} className="reddit-module__item">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="reddit-module__thumbnail"
            />
            <div className="reddit-module__content">
              <h3>
                <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </h3>
              <p>{post.subreddit}</p>
              <a href={post.commentsLink} target="_blank" rel="noopener noreferrer">
                View Comments
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedditModule;