// CHECKED - OK
import icons from '../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log('btn', btn);
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log('numPages:', numPages);

    const createButton = (type, page) =>
      `${
        type === 'next'
          ? `
          <button data-goto="${
            page + 1
          }" class="btn--inline pagination__btn--${type}">
          <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right></use>
            </svg>`
          : `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--${type}">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>`
      }
      </button>`;

    // Page 1, and there are NO other pages
    if (currentPage === 1 && numPages === 1) return '';

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1)
      return createButton('next', currentPage);

    // Other page
    if (currentPage < numPages)
      return (
        createButton('prev', currentPage) + createButton('next', currentPage)
      );

    // Last page
    if (currentPage === numPages && numPages > 1)
      return createButton('prev', currentPage);
  }
}

export default new PaginationView();
