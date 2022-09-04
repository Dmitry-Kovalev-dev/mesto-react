
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from './../utils/Api';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

const App = () => {

  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatatPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [addPlaceBtnValue, setAddPlaceBtnValue] = useState('Создать');
  const [editProfileBtnValue, setEditProfileBtnValue] = useState('Сохранить');
  const [editAvatarBtnValue, setEditAvatarBtnValue] = useState('Сохранить');
  const [deleteCardBtnValue, setDeleteCardBtnValue] = useState('Да');

  useEffect(() => {
    Promise.all([api.getInitialCard(), api.getProfileInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch(err => { console.log(err) })
  }, [])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.setLikeStatus(card._id, isLiked ? 'DELETE' : 'PUT')
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  };

  const handleDeleteCard = () => {
    setDeleteCardBtnValue('Удаление...')
    api.deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards((cards) => cards.filter(c => c._id !== selectedDeleteCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => { setDeleteCardBtnValue('Да') })
  };

  const handleUpdateUser = ({ name, about }) => {
    setEditProfileBtnValue('Сохранение...');
    api.editProfile({ name, about })
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => { setEditProfileBtnValue('Сохранить') })
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setEditAvatarBtnValue('Сохранение...')
    api.editAvatar({ avatar })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => { setEditAvatarBtnValue('Сохранить') })
  };

  const handleAddPlace = ({ name, link }) => {
    setAddPlaceBtnValue('Сохранение...');
    api.createCard({ name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => { setAddPlaceBtnValue('Создать') })
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };


  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleCardTrashClick = (card) => {
    setDeleteCardPopupOpen(true);
    setSelectedDeleteCard(card);
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
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardTrash={handleCardTrashClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClickClosePopup}
          onUpdateUser={handleUpdateUser}
          btnValue={editProfileBtnValue}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleClickClosePopup}
          onAddPlace={handleAddPlace}
          btnValue={addPlaceBtnValue}
        />

        <EditAvatarPopup
          isOpen={isEditAvatatPopupOpen}
          onClose={handleClickClosePopup}
          onUpdateAvatar={handleUpdateAvatar}
          btnValue={editAvatarBtnValue}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={handleClickClosePopup}
          cardDelete={handleDeleteCard}
          btnValue={deleteCardBtnValue}
        />

        <ImagePopup
          card={selectedCard}
          onClose={handleClickClosePopup}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;