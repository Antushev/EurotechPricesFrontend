import * as React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getUser} from '../../reducer/user/selectors';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {
  getProducts,
  getFirms,
  getPrices,
  getLinks
} from '../../reducer/data/selectors';

import Auth from '../auth/auth';
import AuthRoute from '../auth-route/auth-route';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import MainPrices from '../main-prices/main-prices';
import MainStats from '../main-stats/main-stats';
import ProductStats from '../product-stats/product-stats';
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
    links,
  } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
        />

        <Route path="/" element={
          <PrivateRoute>
            <Header
              menuItems={menuItems}
            />
            <Main />
            <Footer />
          </PrivateRoute>
        }/>

        <Route path="/prices" element={
          <PrivateRoute>
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
          </PrivateRoute>
        }/>

        <Route path="/stats" element={
          <PrivateRoute>
            <Header
              menuItems={menuItems}
            />
            <MainStats />
            <Footer />
          </PrivateRoute>
        }/>

        <Route path="/stats/:id" element={
          <PrivateRoute>
            <Header
              menuItems={menuItems}
            />
            <ProductStats
              firms={firms}
              products={products}
              links={links}
              prices={prices}
            />
            <Footer />
          </PrivateRoute>
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
