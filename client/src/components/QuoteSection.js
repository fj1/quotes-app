import React from 'react';
import Quote from './Quote';

import { API_URL } from '../constants';

import './QuoteSection.css';

function QuoteSection() {
  const [quotes, setQuotes] = React.useState([]);

  React.useEffect(() => {
    async function fetchQuotes() {
      const response = await fetch(`${API_URL}/api/quotes`);
      const result = await response.json();

      setQuotes(result.data);
    }

    fetchQuotes();
  }, []);

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
