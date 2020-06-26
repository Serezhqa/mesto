export default class Card {
  constructor({name, link, _id, owner, likes}, userId, selector, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._likes = likes;
    this._userId = userId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.querySelector('.elements__item').cloneNode(true);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
    this._handleLikeButtonClick(this._cardId, this._likes.some(item => item._id === this._userId))
      .then(result => {
        this._likes = result.likes;
        this._card.querySelector('.elements__like-counter').textContent = result.likes.length;
      })
      .catch(err => console.log(err));
  }

  _setEventListeners() {
    this._card.querySelector('.elements__like-button').addEventListener('click', (evt) => this._toggleLike(evt));
    this._card.querySelector('.elements__delete-button').addEventListener('click', (evt) => this._handleDeleteButtonClick(this._cardId, evt));
    this._card.querySelector('.elements__image-button').addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link
    }));
  }

  _checkId() {
    if (this._userId !== this._ownerId) {
      this._card.querySelector('.elements__delete-button').remove();
    }
    if (this._likes.some(item => item._id === this._userId)) {
      this._card.querySelector('.elements__like-button').classList.add('elements__like-button_active');
    }
  }

  createCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.elements__image').src = this._link;
    this._card.querySelector('.elements__image').alt = this._name;
    this._card.querySelector('.elements__heading').textContent = this._name;
    this._card.querySelector('.elements__like-counter').textContent = this._likes.length;
    this._setEventListeners();
    this._checkId();
    return this._card;
  }
}
