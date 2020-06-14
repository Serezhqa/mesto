export default class Card {
  constructor({name, link}, selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.querySelector('.elements__item').cloneNode(true);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.elements__item').remove();
  }

  _setEventListeners() {
    this._card.querySelector('.elements__like-button').addEventListener('click', this._toggleLike);
    this._card.querySelector('.elements__delete-button').addEventListener('click', this._deleteCard);
    this._card.querySelector('.elements__image-button').addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link
    }));
  }

  createCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.elements__image').src = this._link;
    this._card.querySelector('.elements__image').alt = this._name;
    this._card.querySelector('.elements__heading').textContent = this._name;
    this._setEventListeners();
    return this._card;
  }
}
