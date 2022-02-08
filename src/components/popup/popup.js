import React from 'react';
import s from './popup.module.scss';


function Popup({open, children, title, closeButton, closePopup, closeOnOverflowClick}) {
  return (
    <>
    {open &&
      <div className={s.popup_overflow} onClick={() => closeOnOverflowClick && closePopup()}>
        <div className={s.popup}>
          <div className={s.header}>
            {title && <h3>{title}</h3>}
            {closeButton && <span className={s.close_button} onClick={ () => closePopup()}>X</span>}
          </div>
          <div className={s.popup_content}>
            {children}
          </div>
        </div>
      </div>
    }
  </>
  );
}

export default Popup;