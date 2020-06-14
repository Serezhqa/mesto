import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._heading = this._popup.querySelector('.popup__heading');
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._heading.textContent = name;
    super.open();
  }
}
