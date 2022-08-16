import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../utils/const.js';

import {ActionCreator as UserActionCreator} from '../../reducer/user/user.js';
import {getUser} from '../../reducer/user/selectors';

interface Props {
  menuItems: Menu[],
  user: any,
  onButtonExitUserClick: () => void
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {
    user,
    onButtonExitUserClick
  } = props;

  return (
    <header className="page-header">
      <div className="page-header__wrapper container">
        <nav className="menu">
          <div className="logo">
            <img className="logo__img" src="img/logo.png" width="264" height="152" alt="Логотип ООО ЕВРОТЕК"/>
          </div>

          <ul className="menu__list">
            <li  className="menu__item">
              <Link className="menu__link" to="/">О сервисе</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/prices">Цены и остатки</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to="/favorites">Избранное</Link>
            </li>
          </ul>

          <div className="menu__login">
            <a className="menu__link-login" href="#">{user.firstName + ' ' + user.lastName}</a>
            <button
              className="menu__link-login menu__link-login--exit"
              onClick={() => {
                onButtonExitUserClick();
              }}
            >
              Выход
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

// const renderMenuItems = (items) => {
//   return items.map((item) => {
//     return (
//       <li key={item.name} className="menu__item menu__item--active">
//         <Link key={item.name} className="menu__link" to={item.link}>{item.name}</Link>
//       </li>
//     );
//   });
// }

const mapStateToProps = (state) => {
  return {
    user: getUser(state)
  }
}

// АВТОРИЗАЦИЯ ПЕРЕДЕЛАТЬ
const mapDispatchToProps = (dispatch) => ({
  onButtonExitUserClick() {
    dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
    // dispatch(UserActionCreator.setAuthorizationUser({}));
    localStorage.setItem('authorizationStatus', AuthorizationStatus.NO_AUTH);
    localStorage.setItem('idUser', '');
  }
});
// АВТОРИЗАЦИЯ ПЕРЕДЕЛАТЬ

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
