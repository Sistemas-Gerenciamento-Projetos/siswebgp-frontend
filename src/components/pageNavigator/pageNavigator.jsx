import React from 'react';

export default function PageNavigator({
  numbers,
  currentPage,
  setCurrentPage,
  nPage,
}) {
  function previousPage() {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCurrentPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function nextPage() {
    if (currentPage != nPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={previousPage}>
              Anterior
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? 'active' : ''}`}
              key={i}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => changeCurrentPage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Próximo
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
