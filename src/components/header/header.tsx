import * as React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  menuItems: Menu[]
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {menuItems} = props;

  return (
    <header className="page-header">
      <div className="page-header__wrapper container">
        <nav className="menu">
          <div className="logo">
            <img className="logo__img" src="img/logo.png" width="264" height="152" alt="Логотип ООО ЕВРОТЕК"/>
          </div>

          <ul className="menu__list">
            <li  className="menu__item menu__item--active">
              <Link className="menu__link" to="/">Главная</Link>
              <Link className="menu__link" to="/prices">Цены</Link>
              <Link className="menu__link" to="/stats">Статистика</Link>
            </li>
          </ul>

          <div className="menu__login">
            <a className="menu__link-login" href="#">Светлана Павлова</a>
            <button className="menu__link-login menu__link-login--exit">Выход</button>
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

export default Header;
