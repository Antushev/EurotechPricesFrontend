import * as React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {
  getProducts,
  getFirms,
  getPrices,
  getLinks
} from '../../reducer/data/selectors';

import Main from '../main/main';
import MainPrices from '../main-prices/main-prices';
import MainStats from '../main-stats/main-stats';
import Header from '../header/header';
import Footer from '../footer/footer';

interface Props {
  products: Product[],
  firms: Firm[],
  prices: Price[],
  links: Link[],
  menuItems: Menu[]
}

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {
    menuItems,
    products,
    firms,
    prices,
    links
  } = props;

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
            <MainPrices
              products={products}
              firms={firms}
              links={links}
              prices={prices}
            />
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

const mapStateToProps = (state) => {
  return {
    products: getProducts(state),
    firms: getFirms(state),
    prices: getPrices(state),
    links: getLinks(state)
  }
}

const mapDispatchToProps = (dispatch) => ({

});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App)
