const Card = (props) => {
  const { card, handleCardClick, handleClickTrashBtn } = props;

  const handleClick = () => {
    handleCardClick(card);
  }
  return (
    <article className="post">
      <img src={card.link} alt={card.name} className="post__img" onClick={handleClick} />
      <button className="post__trash-btn" type="button" onClick={handleClickTrashBtn}></button>
      <div className="post__info">
        <h2 className="post__title">{card.name}</h2>
        <div className="post__like">
          <button className="post__like-btn" type="button"></button>
          <p className="post__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;