import React from 'react';

import './Footer.css';

const DIRECTION = {
  back: 'back',
  forward: 'forward',
};

function Footer({ currentPage, totalNumOfPages, setCurrentPage }) {
  function handlePageClick(event) {
    const direction = event.target.value;
    const updatedPage =
      direction === DIRECTION.forward ? currentPage + 1 : currentPage - 1;

    setCurrentPage(Number(updatedPage));
  }

  return (
    <footer>
      <button
        disabled={currentPage === 1}
        value={DIRECTION.back}
        onClick={handlePageClick}
      >
        {'< Previous Page'}
      </button>
      <span>Page {currentPage}</span>
      <button
        disabled={currentPage === totalNumOfPages}
        value={DIRECTION.forward}
        onClick={handlePageClick}
      >
        {'Next Page >'}
      </button>
    </footer>
  );
}

export default Footer;
