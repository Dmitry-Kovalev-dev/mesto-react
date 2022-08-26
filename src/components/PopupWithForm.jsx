const PopupWithForm = (props) => {

  const { name, title, children, btnValue, isOpen, onClose, popupContainerSelector, popupTitleSelector } = props;
  const className = isOpen ? `popup popup_type_${name} popup_open` : `popup popup_type_${name}`;

  return (
    <div onClick={onClose} className={className}>
      <div className={`popup__container ${popupContainerSelector}`}>
        <button className="popup__close-btn" type="button"></button>
        <h2 className={`popup__title ${popupTitleSelector}`}>{title}</h2>
        <form action="#" className="popup__form" name={name} noValidate>
          {children}
          <button type="submit" className="popup__save-input-btn" defaultValue={btnValue} disabled>{btnValue}</button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;