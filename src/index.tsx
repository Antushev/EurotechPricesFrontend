import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/app/app';

const menuItems = [
  {name:'Главная', menuLink: '/'},
  {name:'Статистика', menuLink: '/stat'},
  {name:'Цены', menuLink: '/prices'}
];

const init = () => {
  ReactDOM.render(
    <App
      menuItems={menuItems}
    />,
  document.querySelector('#root')
  );
};

init();
