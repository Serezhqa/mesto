export class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
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
    this._card.querySelector('.elements__like-button').addEventListener('click', (evt) => this._toggleLike(evt));
    this._card.querySelector('.elements__delete-button').addEventListener('click', (evt) => this._deleteCard(evt));
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
