import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {DateTime} from 'luxon';
import {getMaxPrice, getMinPrice} from '../../utils/common.js';

import GraphLine from '../../components/graph-line/graph-line';
import 'chartkick/chart.js';

import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getCurrentProductStats, getPricesForStats} from '../../reducer/data/selectors';

interface Props {
  products: Product[],
  currentProduct: Product
  firms: Firm[],
  links: Link[],
  prices: Price[],
  currentPrices: Price[],
  loadProductById: (idProduct: number) => void,
  loadPricesForStats: (idProduct: number, dateTo: string, dateFrom: string) => void
}

const ProductStats: React.FunctionComponent<Props> = (props: Props) => {
  const {
    products,
    currentProduct,
    firms,
    links,
    prices,
    currentPrices,
    loadProductById,
    loadPricesForStats
  } = props;

  let maxPrice: any = "0";
  let minPrice: any = "0";
  let maxPriceFirm: any = "0";
  let minPriceFirm: any = "0";
  let averagePrice: any = "0";
  let minPriceDate;
  let maxPriceDate;
  let pricesForGraph;
  let currentFirms;

  const params = useParams();
  const idProduct = Number(params.id);
  const nowDate = DateTime.local().toFormat('y-MM-dd');
  const [dateTo, setDateTo] = useState(nowDate);
  const [dateFrom, setDateFrom] = useState(nowDate);

  if (currentPrices.length !== 0) {
    currentFirms = getCurrentFirmsByPrices(firms, currentPrices)
    pricesForGraph = getPricesForGraph(currentFirms, currentPrices);

    maxPrice = getMaxPrice(currentPrices);
    maxPriceFirm = getFirmById(maxPrice.idFirm, firms);
    minPrice = getMinPrice(currentPrices);
    minPriceFirm = getFirmById(minPrice.idFirm, firms);
    averagePrice = getAveragePrice(currentPrices);

    minPriceDate = DateTime.fromISO(minPrice.dateParse).setLocale('ru').toFormat('dd.MM.y HH:mm');
    maxPriceDate = DateTime.fromISO(maxPrice.dateParse).setLocale('ru').toFormat('dd.MM.y HH:mm');
  }

  useEffect(() => {
    loadProductById(idProduct);
  }, []);

  useEffect(() => {
    loadPricesForStats(idProduct, dateTo, dateFrom);
  }, []);

  return (
    <main className="page-content">
      <div className="page-content__wrapper container">
        <section className="stats-product page-content__inner">
          <header className="stats-product__header">
            <h1 className="header header--1 stats-product__header-1">{currentProduct.name}</h1>
            <ul className="service-buttons">
              <li className="service-buttons__item">
                <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.4979 0.939224L9.08038 7.92039L1.43404 9.0435C0.0628285 9.24386 -0.486703 10.947 0.507688 11.9224L6.03964 17.3534L4.73123 25.0253C4.49572 26.4121 5.94544 27.4508 7.15964 26.8022L14 23.1798L20.8404 26.8022C22.0546 27.4455 23.5043 26.4121 23.2688 25.0253L21.9604 17.3534L27.4923 11.9224C28.4867 10.947 27.9372 9.24386 26.566 9.0435L18.9196 7.92039L15.5021 0.939224C14.8897 -0.305153 13.1155 -0.320971 12.4979 0.939224Z"
                    fill="#F0F0F0"/>
                </svg>
              </li>
              <li className="service-buttons__item">
                <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.9687 4.38308L25.6667 9.14065C25.8646 9.34108 25.8646 9.6681 25.6667 9.86853L14.2917 21.388L9.45833 21.9312C8.8125 22.0051 8.26563 21.4513 8.33854 20.7972L8.875 15.9025L20.25 4.38308C20.4479 4.18265 20.7708 4.18265 20.9687 4.38308ZM29.4062 3.17523L26.8646 0.601289C26.0729 -0.20043 24.7865 -0.20043 23.9896 0.601289L22.1458 2.46845C21.9479 2.66888 21.9479 2.9959 22.1458 3.19633L26.8438 7.9539C27.0417 8.15433 27.3646 8.15433 27.5625 7.9539L29.4062 6.08674C30.1979 5.27974 30.1979 3.97695 29.4062 3.17523V3.17523ZM20 18.2549V23.6243H3.33333V6.74604H15.3021C15.4687 6.74604 15.625 6.67748 15.7448 6.56144L17.8281 4.45165C18.224 4.05079 17.9427 3.37039 17.3854 3.37039H2.5C1.11979 3.37039 0 4.5044 0 5.90213V24.4683C0 25.866 1.11979 27 2.5 27H20.8333C22.2135 27 23.3333 25.866 23.3333 24.4683V16.1451C23.3333 15.5808 22.6615 15.3012 22.2656 15.6968L20.1823 17.8066C20.0677 17.9279 20 18.0862 20 18.2549Z"
                    fill="#F0F0F0"/>
                </svg>
              </li>
            </ul>
          </header>

          <div className="stats-product__filter">
            <h2 className="header header--2">График цен</h2>

            <ul className="periods-list stats-product__periods">
              <li className="periods-list__item">
                час
              </li>
              <li className="periods-list__item periods-list__item--active">
                день
              </li>
              <li className="periods-list__item">
                неделя
              </li>
              <li className="periods-list__item">
                месяц
              </li>
            </ul>

            <div className="stats-product__date">
              <form>
                <span> c </span>
                <label>
                  <input
                    name="date-from"
                    type="date"
                    value={dateFrom}
                    alt="Выборка, начиная с данной даты"
                    onChange={(evt) => {
                      setDateFrom(evt.target.value);

                      loadPricesForStats(idProduct, evt.target.value, dateTo);
                    }}
                  />
                </label>
                <span> по </span>
                <label>
                  <input
                    name="date-to"
                    type="date"
                    value={dateTo}
                    alt="Выборка, заканчивая данной датой"
                    onChange={(evt) => {
                      setDateTo(evt.target.value);

                      loadPricesForStats(idProduct, dateFrom, evt.target.value);
                    }}
                  />
                </label>
              </form>
            </div>
          </div>

          <div className="stats-product__graph">
            <div className="stats-product__graph-block graph">
              <GraphLine
                firms={currentFirms}
                prices={currentPrices}
              />
            </div>

            <ul className="firms-list">
              {renderCompanyList(currentFirms)}
            </ul>
          </div>

          <div className="stats-product__prices-stats">
            <ul className="prices-stats">
              <li className="prices-stats__item">
                <h3 className="prices-stats__header">минимальная</h3>
                <p className="prices-stats__price">{minPrice.price} руб.</p>
                <div className="prices-stats__firm-info">
              <span className="prices-stats__firm">
                {minPriceFirm.name}
              </span>
                  <span className="prices-stats__date">
                {minPriceDate}
              </span>
                </div>
              </li>

              <li className="prices-stats__item">
                <h3 className="prices-stats__header">средняя</h3>
                <p className="prices-stats__price">{averagePrice} руб.</p>
              </li>

              <li className="prices-stats__item">
                <h3 className="prices-stats__header">максимальная</h3>
                <p className="prices-stats__price">{maxPrice.price} руб.</p>
                <div className="prices-stats__firm-info">
              <span className="prices-stats__firm">
                {maxPriceFirm.name}
              </span>
                  <span className="prices-stats__date">
                {maxPriceDate}
              </span>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

const getProductById = (idProduct, products) => {
  return products.find((product) => {
    return product.id === idProduct;
  });
}

const getFirmById = (idFirm, firms) => {
  return firms.find((firm) => {
    return firm.id === idFirm
  });
}

const getAveragePrice = (prices) => {
  const pricesNum = prices.map((price) => {
    return price.price;
  });

  return Math.floor((pricesNum.reduce((a, b) => (a + b)) / prices.length) * 100) / 100;
}

const getPricesForGraph = (firms, prices) => {
  let resultPrices = {};

  return firms.map((currentFirm) => {
    const currentResult = {
      "name": currentFirm.name,
      "data": null
    };

    const currentPrice = prices.filter((price) => {
      return price.idFirm === currentFirm.id;
    });

    resultPrices = currentPrice.map((price) => {
      return Object.assign({}, resultPrices, {
        [DateTime.fromISO(price.dateParse).setLocale('ru').toFormat('y-MM-dd hh:mm')]: price.price
      })
    });

    return Object.assign({}, currentResult, {
      "data": resultPrices
    });
  });
}

const getCurrentFirmsByPrices = (firms, prices) => {
  const currentFirms = firms.filter((findFirm) => {
    return prices.some((price) => {
      return findFirm.id === price.idFirm;
    })
  });

  return currentFirms.filter((firm) => typeof firm !== 'undefined');
}

const renderCompanyList = (firms) => {
  if (typeof firms !== 'undefined') {
    return firms.map((firm) => {
      return (
        <li key={firm.id} className="firms-list__item firms-list__item" style={{
          backgroundColor: firm.color
        }}>
          {firm.name}
        </li>
      );
    })
  }

  return <li>Нет данных для данного периода</li>;
}

const mapStateToProps = (state) => {
  return {
    currentProduct: getCurrentProductStats(state),
    currentPrices: getPricesForStats(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadProductById(idProduct) {
    dispatch(DataOperation.getProductById(idProduct));
  },
  loadPricesForStats(idProduct, dateFrom, dateTo) {
    dispatch(DataOperation.loadPricesForStats(idProduct, dateFrom, dateTo));
  }
});

export {ProductStats};
export default connect(mapStateToProps, mapDispatchToProps)(ProductStats);
