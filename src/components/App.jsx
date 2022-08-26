
import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import api from './../utils/Api'
import ImagePopup from './ImagePopup';

const App = () => {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatatPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false)
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    Promise.all([api.getInitialCard(), api.getProfileInfo()])
      .then(([cardsData, userData]) => {
        setUserAvatar(userData.avatar);
        setUserName(userData.name);
        setUserDescription(userData.about);
        setCards(cardsData);
      })
      .catch(err => console.log(err))
  }, [])

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleDeleteCardClick = () => {
    setDeleteCardPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleClickClosePopup = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onDeleteCard={handleDeleteCardClick}
        userAvatar={userAvatar}
        userName={userName}
        userDescription={userDescription}
        cards={cards}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        title={'Редактировать профиль'}
        name={'edit'}
        btnValue={'Сохранить'}
        isOpen={isEditProfilePopupOpen}
        onClose={handleClickClosePopup}
      >
        <fieldset className="popup__form-inputs">
          <label className="popup__formfield">
            <input id="name-input" type="text" className="popup__input popup__input_type_name" name="name" placeholder="Имя"
              defaultValue="" minLength="2" maxLength="40" required />
            <span className="popup__input-error name-input-error"></span>
          </label>
          <label className="popup__formfield">
            <input id="job-input" type="text" className="popup__input popup__input_type_job" name="about" placeholder="О себе"
              defaultValue="" minLength="2" maxLength="200" required />
            <span className="popup__input-error job-input-error"></span>
          </label>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title={'Новое место'}
        name={'add'}
        btnValue={'Создать'}
        isOpen={isAddPlacePopupOpen}
        onClose={handleClickClosePopup}
      >
        <fieldset className="popup__form-inputs">
          <label className="popup__formfield">
            <input id="place-input" type="text" className="popup__input popup__input_type_place" name="name"
              placeholder="Название" defaultValue="" minLength="2" maxLength="30" required />
            <span className="popup__input-error place-input-error"></span>
          </label>
          <label className="popup__formfield">
            <input id="url-input" type="url" className="popup__input popup__input_type_link" name="link"
              placeholder="Ссылка на картинку" defaultValue="" required />
            <span className="popup__input-error url-input-error"></span>
          </label>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title={'Обновить аватар'}
        name={'edit-avatar'}
        btnValue={'Сохранить'}
        isOpen={isEditAvatatPopupOpen}
        popupContainerSelector={'popup__container_type_edit-avatar'}
        onClose={handleClickClosePopup}
      >
        <fieldset className="popup__form-inputs">
          <label className="popup__formfield">
            <input id="url-input-ava" type="url" className="popup__input popup__input_type_link" name="avatar"
              placeholder="Ссылка на картинку" defaultValue="" required />
            <span className="popup__input-error url-input-ava-error"></span>
          </label>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        title={'Вы уверены?'}
        name={'del'}
        btnValue={'Да'}
        isOpen={isDeleteCardPopupOpen}
        popupContainerSelector={'popup__container_type_del'}
        onClose={handleClickClosePopup}
        popupTitleSelector={'popup__title_type_del'}
      />

      <ImagePopup card={selectedCard} onClose={handleClickClosePopup} />

    </div>
  );
}

export default App;