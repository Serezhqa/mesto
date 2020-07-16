import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userDescription: '',
      userAvatar: '',
      cards: []
    };
  }

  componentDidMount() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([{ name, about, avatar }, initialCards]) => {
        this.setState({
          userName: name,
          userDescription: about,
          userAvatar: avatar,
          cards: initialCards
        })
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <main className="content">
        <section className="profile">
          <button className="profile__avatar-button" type="button" onClick={this.props.onEditAvatar} aria-label="Изменить аватар.">
            <img className="profile__avatar" alt="Аватар пользователя." src={this.state.userAvatar} />
          </button>
          <div className="profile__info">
            <div className="profile__name-info">
              <h1 className="profile__name">{this.state.userName}</h1>
              <button className="profile__edit-button" type="button" onClick={this.props.onEditProfile} aria-label="Редактировать информацию о пользователе."></button>
            </div>
            <p className="profile__description">{this.state.userDescription}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={this.props.onAddPlace} aria-label="Добавить фото."></button>
        </section>

        <section className="elements">
          {this.state.cards.map(card => (
            <Card card={card} key={card._id} onCardClick={this.props.onCardClick} />
          ))}
        </section>
      </main>
    )
  }
}

export default Main;
