import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Operation as DataOperation} from './../../reducer/data/data';
import {ActionCreator as DataActionCreator} from './../../reducer/data/data';

import {getUser} from './../../reducer/user/selectors';

interface Props {
  firms: Firm[],
  user: User,
  isShowPopup: boolean,
  onButtonAcceptClick: (firms: Firm[], idUser: number) => void,
  onButtonClickItem: (idFirm: number) => void,
  onClosePopupClick: () => void
}

const PopupEditShowFirms: React.FunctionComponent<Props> = (props: Props) => {
  const {
    firms,
    user,
    isShowPopup,
    onButtonAcceptClick,
    onButtonClickItem,
    onClosePopupClick
  } = props;

  return (
    <div className={isShowPopup ? 'popup-filter-firms' : 'popup-filter-firms visually-hidden'}>
      <button
        className="button button--popup popup-filter-firms__button-close"
        onClick={() => {
          onClosePopupClick();
        }}
      >
        <svg className="popup-price__close" width="41" height="41" viewBox="0 0 41 41" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.5 0C9.1754 0 0 9.1754 0 20.5C0 31.8246 9.1754 41 20.5 41C31.8246 41 41 31.8246 41 20.5C41 9.1754 31.8246 0 20.5 0ZM30.5516 25.8813C30.9401 26.2698 30.9401 26.898 30.5516 27.2865L27.2782 30.5516C26.8897 30.9401 26.2615 30.9401 25.873 30.5516L20.5 25.129L15.1187 30.5516C14.7302 30.9401 14.102 30.9401 13.7135 30.5516L10.4484 27.2782C10.0599 26.8897 10.0599 26.2615 10.4484 25.873L15.871 20.5L10.4484 15.1187C10.0599 14.7302 10.0599 14.102 10.4484 13.7135L13.7218 10.4401C14.1103 10.0516 14.7385 10.0516 15.127 10.4401L20.5 15.871L25.8813 10.4484C26.2698 10.0599 26.898 10.0599 27.2865 10.4484L30.5599 13.7218C30.9484 14.1103 30.9484 14.7385 30.5599 15.127L25.129 20.5L30.5516 25.8813Z"
            fill="#BE1E2D"/>
        </svg>
      </button>

      <h2 className="header header--1 popup-filter-firms__container">Настройки компаний</h2>

      <h2 className="header header--2 popup-filter-firms__header popup-filter-firms__container">Отображаемые
        компании</h2>
      <p className="popup-filter-firms__text popup-filter-firms__container">
        Чтобы показать или скрыть необходимые
        компании нажмите на них, затем на кнопку «Применить»
      </p>

      <div className="popup-filter-firms__container">
        <ul className="firms-list firms-list--filter-company">
          {renderFirms(firms, onButtonClickItem)}
        </ul>
      </div>

      <button
        className="button popup-group__button"
        onClick={() => {
          onButtonAcceptClick(firms, user.id);
          onClosePopupClick();
        }}
      >
        Применить
      </button>
    </div>
  );
}

const renderFirms = (firms, onButtonClickItem) => {
  return firms.map((firm) => {
    return (
      <li
        key={firm.id}
        className={firm.isActive ? 'firms-list__item firms-list__item--active' : 'firms-list__item'}
        onClick={() => {
          onButtonClickItem(firm.id);
        }}
      >
        {firm.name}
      </li>
    );
  })
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  onButtonClickItem(idFirm) {
    dispatch(DataActionCreator.setFirmActiveStatus(idFirm));
  },

  onButtonAcceptClick(firms, idUser) {
    dispatch(DataOperation.editActiveFirm(firms, idUser));
  }
});

export {PopupEditShowFirms};
export default connect(mapStateToProps, mapDispatchToProps)(PopupEditShowFirms);
