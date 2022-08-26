import Card from './Card';

const Main = (props) => {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onDeleteCard,
    userAvatar,
    userName,
    userDescription,
    cards,
    onCardClick
  } = props;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <div className="profile__avatar-overlay"></div>
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace}></button>

      </section>
      <section className='photo-feed'>
        {cards.map((card) => {
          return <Card
            key={card._id}
            card={card}
            handleCardClick={onCardClick}
            handleClickTrashBtn={onDeleteCard}
          />
        })}
      </section>
    </main>
  );
}

export default Main;