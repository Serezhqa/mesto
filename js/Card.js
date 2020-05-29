import {openPhotoPopup, photo, heading, togglePopup} from './index.js';

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

  _openImage(evt) {
    photo.src = evt.currentTarget.firstElementChild.src;
    photo.alt = evt.currentTarget.firstElementChild.alt;
    heading.textContent = evt.currentTarget.firstElementChild.alt;
    togglePopup(openPhotoPopup);
}

  _setEventListeners() {
    this._card.querySelector('.elements__like-button').addEventListener('click', this._toggleLike);
    this._card.querySelector('.elements__delete-button').addEventListener('click', this._deleteCard);
    this._card.querySelector('.elements__image-button').addEventListener('click', this._openImage);
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
