import * as React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import history from '../../history';

import Main from '../main/main';
import MainPrices from '../main-prices/main-prices';
import MainStats from '../main-stats/main-stats';
import Header from '../header/header';
import Footer from '../footer/footer';

interface Props {
  menuItems: Menu[]
}

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {menuItems} = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <Header
              menuItems={menuItems}
            />
            <Main />
            <Footer />
          </div>
        }/>

        <Route path="/prices" element={
          <div>
            <Header
              menuItems={menuItems}
            />
            <MainPrices />
            <Footer />
          </div>
        }/>

        <Route path="/stats" element={
          <div>
            <Header
              menuItems={menuItems}
            />
            <MainStats />
            <Footer />
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
