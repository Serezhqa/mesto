import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._heading = this._popup.querySelector('.popup__heading');
  }

  open(evt) {
    this._image.src = evt.currentTarget.firstElementChild.src;
    this._image.alt = evt.currentTarget.firstElementChild.alt;
    this._heading.textContent = evt.currentTarget.firstElementChild.alt;
    super.open();
  }
}
