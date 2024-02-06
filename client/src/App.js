import React from 'react';

import { API_URL } from './constants';
import Footer from './components/Footer';
import QuoteSection from './components/QuoteSection';

import './App.css';

function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalNumOfPages, setTotalNumOfPages] = React.useState('');

  React.useEffect(() => {
    async function fetchQuotes() {
      const url =
        currentPage === 1
          ? `${API_URL}/quotes`
          : `${API_URL}/quotes?page=${currentPage}`;

      const response = await fetch(url);
      const result = await response.json();

      setQuotes(result.data);
      setCurrentPage(result.meta.page);
      setTotalNumOfPages(result.meta.totalNumOfPages);
    }

    fetchQuotes();
  }, [currentPage]);

  return (
    <div className='app-container'>
      <header>Quotes</header>
      <QuoteSection quotes={quotes} />
      <Footer
        currentPage={currentPage}
        totalNumOfPages={totalNumOfPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
