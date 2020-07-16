import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }

  render() {
    return (
      <div className="elements__item">
        <button className="elements__image-button" type="button" onClick={this.handleClick} aria-label="Увеличить изображение.">
          <img className="elements__image" src={this.props.card.link} />
        </button>
        <div className="elements__container">
          <h2 className="elements__heading">{this.props.card.name}</h2>
          <div className="elements__like-container">
            <button className="elements__like-button" type="button" aria-label="Поставить лайк."></button>
            <p className="elements__like-counter">{this.props.card.likes.length}</p>
          </div>
        </div>
        <button className="elements__delete-button" type="button" aria-label="Удалить фото."></button>
      </div>
    )
  }
}

export default Card;
