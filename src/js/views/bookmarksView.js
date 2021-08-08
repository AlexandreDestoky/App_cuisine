import icons from "../../img/icons.svg";
import View from "./View.js";


class BookMark extends View{
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it 😉";
  _message = "";

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(el => this._generateMarkupPreview(el)).join("");
  }

  _generateMarkupPreview(el) {
      const id = window.location.hash.slice(1);


    return `
    <li class="preview">
      <a class="preview__link ${el.id === id ? 'preview__link--active' : ''}" href="#${el.id}">
        <figure class="preview__fig">
          <img src="${el.image}" alt="${el.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${el.title}</h4>
          <p class="preview__publisher">${el.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }
}



export default new BookMark();