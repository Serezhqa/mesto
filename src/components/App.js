import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: ''
    }
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true
    })
  }

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true
    })
  }

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true
    })
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card.link
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: ''
    })
  }

  render() {
    return (
      <div className="page">
        <Header />
        <Main
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
          onCardClick={this.handleCardClick}
        />
        <Footer />

        <PopupWithForm name="edit-info" title="Редактировать профиль" isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups}>
          <input className="popup__input popup__input_type_username" id="username-input" type="text" name="username"
            placeholder="Имя пользователя" required minLength="2" maxLength="40" pattern="[а-яА-Яa-zA-Z -]+" />
          <span className="popup__input-error" id="username-input-error"></span>
          <input className="popup__input popup__input_type_description" id="description-input" type="text" name="description"
            placeholder="О себе" required minLength="2" maxLength="200" />
          <span className="popup__input-error" id="description-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="add-photo" title="Новое место" isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}>
          <input className="popup__input popup__input_type_place" id="place-input" type="text" name="name"
            placeholder="Название" required maxLength="30" />
          <span className="popup__input-error" id="place-input-error"></span>
          <input className="popup__input popup__input_type_link" id="link-input" type="url" name="link"
            placeholder="Ссылка на картинку" required />
          <span className="popup__input-error" id="link-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="delete-photo" title="Вы уверены?" />

        <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}>
          <input className="popup__input popup__input_type_link" id="avatar-link-input" type="url" name="link"
            placeholder="Ссылка на картинку" required />
          <span className="popup__input-error" id="avatar-link-input-error"></span>
        </PopupWithForm>

        <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
      </div>
    );
  }
}

export default App;
