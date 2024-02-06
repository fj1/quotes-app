import React from 'react';
import Quote from './Quote';

import './QuoteSection.css';

function QuoteSection({ quotes }) {
  return (
    <section className='quote-section'>
      {quotes.length > 0 ? (
        quotes.map(({ author, id, quote }) => (
          <Quote key={id} author={author} quote={quote} />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
}

export default QuoteSection;
