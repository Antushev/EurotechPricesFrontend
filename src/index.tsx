import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import {DateTime} from 'luxon';

import {createApi} from './api.js';
import {getUserEurotech} from './utils/common.js';

import {ActionCreator as DataActionCreator} from './reducer/data/data.js';
import {Operation as DataOperation} from './reducer/data/data.js';

import App from './components/app/app';

const api = createApi();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

const menuItems = [
  {name:'Главная', menuLink: '/'},
  {name:'Статистика', menuLink: '/stat'},
  {name:'Цены', menuLink: '/prices'}
];

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App
        menuItems={menuItems}
      />
    </Provider>
    ,
  document.querySelector('#root')
  );
};



store.dispatch(DataOperation.loadPrices(DateTime.local().toFormat('y-MM-dd')));
store.dispatch(DataOperation.loadProducts());
store.dispatch(DataOperation.loadFirms());
store.dispatch(DataOperation.loadLinks());

init();

export {api};



