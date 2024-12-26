// check ok
import previewView from './previewView.js';
import View from './view.js';

class BookMarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmarks were added yet! Find a nice recipe and bookmark it!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookMarksView();
