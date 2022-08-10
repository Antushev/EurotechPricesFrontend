import React, {useState} from 'react';
import {connect} from 'react-redux';
import {DateTime} from 'luxon';

import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getCurrentFirmPopup, getCurrentProductPopup} from '../../reducer/data/selectors.js';

import TablePrice from '../table-price/table-price';
import PopupAddCompany from '../popup-add-company/popup-add-company';
import PopupAddGood from '../popup-add-good/popup-add-good';
import PopupAddPrice from '../popup-add-price/popup-add-price';

interface Props {
  products: Product[],
  firms: Firm[],
  currentProductPopup: Product,
  currentFirmPopup: Firm,
  setCurrentProductPopup: (product: Product) => void,
  setCurrentFirmPopup: (any) => void
}

const MainPrices: React.FunctionComponent<Props> = (props: Props) => {
  const {
    products,
    firms,
    currentProductPopup,
    currentFirmPopup,
    setCurrentFirmPopup,
    setCurrentProductPopup} = props;

  const [isShowPopupCompany, setShowPopupCompany] = useState(false);
  const [isShowPopupGood, setShowPopupGood] = useState(false);
  const [isShowPopupPrice, setShowPopupPrice] = useState(false);

  const [textSearch, setTextSearch] = useState('');
  const nowDate = DateTime.local().toFormat('y-MM-dd');
  const [dateSearch, setDateSearch] = useState(String(nowDate));

  const filtersProduct = acceptFilter(products, textSearch);

  return (
    <div>
      <main className="page-content">
        <div className="page-content__wrapper container">
          <h1 className="header header">Таблица цен</h1>

          <div className="table-price">
            <div className="table-price__filters">
              <form className="table-price__search-form">
                <label className="table-price__name-label">
                  <input
                    className="input table-price__name-input"
                    type="text"
                    value={textSearch}
                    placeholder="Название товара"
                    onChange={(evt) => {
                      setTextSearch(evt.target.value)
                    }}
                  />
                  <svg className="icon icon--search table-price__icon-search" width="25" height="26" viewBox="0 0 25 26"
                       fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24.6451 21.6162L19.8283 16.748C19.6109 16.5283 19.3162 16.4062 19.007 16.4062H18.2194C19.5529 14.6826 20.3452 12.5146 20.3452 10.1562C20.3452 4.5459 15.8473 0 10.296 0C4.74481 0 0.246826 4.5459 0.246826 10.1562C0.246826 15.7666 4.74481 20.3125 10.296 20.3125C12.6296 20.3125 14.7747 19.5117 16.4802 18.1641V18.96C16.4802 19.2725 16.6009 19.5703 16.8184 19.79L21.6352 24.6582C22.0894 25.1172 22.8237 25.1172 23.273 24.6582L24.6403 23.2764C25.0945 22.8174 25.0945 22.0752 24.6451 21.6162ZM10.296 16.4062C6.88027 16.4062 4.11191 13.6133 4.11191 10.1562C4.11191 6.7041 6.87544 3.90625 10.296 3.90625C13.7118 3.90625 16.4802 6.69922 16.4802 10.1562C16.4802 13.6084 13.7166 16.4062 10.296 16.4062Z"
                      fill="black"/>
                  </svg>
                </label>
              </form>

              <div className="calendar table-price__calendar">
                {/*<label htmlFor="date">*/}
                {/* <svg className="icon icon--calendar calendar__icon table-price__icon-calendar" width="42" height="47"*/}
                {/*       viewBox="0 0 42 47" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <path*/}
                {/*      d="M0.593262 42.5938C0.593262 45.0264 2.54016 47 4.93982 47H36.8146C39.2143 47 41.1611 45.0264 41.1611 42.5938V17.625H0.593262V42.5938ZM29.5703 24.6016C29.5703 23.9957 30.0593 23.5 30.657 23.5H34.2791C34.8767 23.5 35.3657 23.9957 35.3657 24.6016V28.2734C35.3657 28.8793 34.8767 29.375 34.2791 29.375H30.657C30.0593 29.375 29.5703 28.8793 29.5703 28.2734V24.6016ZM29.5703 36.3516C29.5703 35.7457 30.0593 35.25 30.657 35.25H34.2791C34.8767 35.25 35.3657 35.7457 35.3657 36.3516V40.0234C35.3657 40.6293 34.8767 41.125 34.2791 41.125H30.657C30.0593 41.125 29.5703 40.6293 29.5703 40.0234V36.3516ZM17.9795 24.6016C17.9795 23.9957 18.4685 23.5 19.0661 23.5H22.6883C23.2859 23.5 23.7749 23.9957 23.7749 24.6016V28.2734C23.7749 28.8793 23.2859 29.375 22.6883 29.375H19.0661C18.4685 29.375 17.9795 28.8793 17.9795 28.2734V24.6016ZM17.9795 36.3516C17.9795 35.7457 18.4685 35.25 19.0661 35.25H22.6883C23.2859 35.25 23.7749 35.7457 23.7749 36.3516V40.0234C23.7749 40.6293 23.2859 41.125 22.6883 41.125H19.0661C18.4685 41.125 17.9795 40.6293 17.9795 40.0234V36.3516ZM6.38867 24.6016C6.38867 23.9957 6.87766 23.5 7.47531 23.5H11.0974C11.6951 23.5 12.1841 23.9957 12.1841 24.6016V28.2734C12.1841 28.8793 11.6951 29.375 11.0974 29.375H7.47531C6.87766 29.375 6.38867 28.8793 6.38867 28.2734V24.6016ZM6.38867 36.3516C6.38867 35.7457 6.87766 35.25 7.47531 35.25H11.0974C11.6951 35.25 12.1841 35.7457 12.1841 36.3516V40.0234C12.1841 40.6293 11.6951 41.125 11.0974 41.125H7.47531C6.87766 41.125 6.38867 40.6293 6.38867 40.0234V36.3516ZM36.8146 5.875H32.468V1.46875C32.468 0.660937 31.816 0 31.0192 0H28.1215C27.3246 0 26.6726 0.660937 26.6726 1.46875V5.875H15.0818V1.46875C15.0818 0.660937 14.4298 0 13.6329 0H10.7352C9.93836 0 9.28638 0.660937 9.28638 1.46875V5.875H4.93982C2.54016 5.875 0.593262 7.84863 0.593262 10.2812V14.6875H41.1611V10.2812C41.1611 7.84863 39.2143 5.875 36.8146 5.875Z"*/}
                {/*      fill="#BE1E2D"/>*/}
                {/*  </svg>*/}
                {/*</label>*/}
                <input
                  id="date"
                  type="date"
                  value={dateSearch}
                  onChange={(evt) => {
                    setDateSearch(evt.target.value);
                  }}
                />
              </div>

              {/*<div className="table-price__excel-download">*/}
              {/*  <svg className="icon" width="36" height="47" viewBox="0 0 36 47" fill="none"*/}
              {/*       xmlns="http://www.w3.org/2000/svg">*/}
              {/*    <path*/}
              {/*      d="M20.6976 12.4844V0H2.66054C1.46108 0 0.496094 0.982226 0.496094 2.20312V44.7969C0.496094 46.0178 1.46108 47 2.66054 47H32.9628C34.1622 47 35.1272 46.0178 35.1272 44.7969V14.6875H22.862C21.6716 14.6875 20.6976 13.6961 20.6976 12.4844ZM27.5922 31.8866L18.8966 40.6715C18.2969 41.2783 17.3283 41.2783 16.7285 40.6715L8.03287 31.8866C7.11749 30.9622 7.75961 29.375 9.04746 29.375H14.9257V22.0312C14.9257 21.2198 15.5715 20.5625 16.3687 20.5625H19.2546C20.0519 20.5625 20.6976 21.2198 20.6976 22.0312V29.375H26.5759C27.8637 29.375 28.5058 30.9622 27.5922 31.8866ZM34.4959 9.63867L25.6668 0.642578C25.261 0.229492 24.7108 0 24.1336 0H23.5835V11.75H35.1272V11.19C35.1272 10.6117 34.9018 10.0518 34.4959 9.63867Z"*/}
              {/*      fill="#BE1E2D"/>*/}
              {/*  </svg>*/}
              {/*</div>*/}

              <button
                className="button button--rounded table-price__button table-price__button--add-company"
                onClick={() => {
                  setShowPopupCompany(!isShowPopupCompany);
                  setShowPopupGood(false);
                }}
              >
                Добавить компанию
              </button>

              <button
                className="button button--rounded table-price__button"
                onClick={() => {
                  setShowPopupGood(!isShowPopupGood);
                  setShowPopupCompany(false)
                }}
              >
                Добавить товар
              </button>
            </div>

            <div className="table-price__table-wrapper">
              <TablePrice
                firms={firms}
                products={filtersProduct}
                onButtonAddPriceClick={(evt, product, firm) => {
                  setCurrentProductPopup(product);
                  setCurrentFirmPopup(firm);
                  setShowPopupPrice(!isShowPopupPrice);
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <PopupAddGood
        isShowPopup={isShowPopupGood}
        onClosePopupClick={() => {
          setShowPopupGood(!isShowPopupGood)
        }}
      />

      <PopupAddPrice
        currentProductPopup={currentProductPopup}
        currentFirmPopup={currentFirmPopup}
        isShowPopup={isShowPopupPrice}
        onClosePopupClick={() => {
          setShowPopupPrice(!isShowPopupPrice)
        }}
      />

      <PopupAddCompany
        isShowPopup={isShowPopupCompany}
        onClosePopupClick={() => {
          setShowPopupCompany(!isShowPopupCompany)
        }}
      />
    </div>
  );
}

const acceptFilter = (products, textSearch) => {
  if (products.length === 1) {
    return products;
  }
  return products.filter((product) => {
    return product.name.toLowerCase().includes(textSearch.toLowerCase());
  });
}

const mapStateToProps = (state) => {
  return {
    currentProductPopup: getCurrentProductPopup(state),
    currentFirmPopup: getCurrentFirmPopup(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentProductPopup(product) {
    dispatch(DataActionCreator.setCurrentProductPopup(product));
  },
  setCurrentFirmPopup(firm) {
    dispatch(DataActionCreator.setCurrentFirmPopup(firm))
  }
})

export {MainPrices};
export default connect(mapStateToProps, mapDispatchToProps)(MainPrices);
