import React from 'react';

import './Quote.css';

function Quote({ author, quote }) {
  return (
    <div className='quote-container'>
      <span>{quote}</span>
      <span className='author'>{author}</span>
    </div>
  );
}

export default Quote;
