import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {DateTime} from 'luxon';

import {api} from '../../index';

import {Operation as DataOperation} from './../../reducer/data/data';
import {getIsLoadingPrice} from './../../reducer/data/selectors'

import {getPrice} from '../../utils/common';

const StateForm = {
  START: 1,
  GET_PRICE: 2,
  SEARCH_PRICE: 3,
  ERROR: 4,
  ERROR_LINK: 5,
  SUCCESS: 6
}

interface Props {
  currentProductPopup: Product,
  currentFirmPopup: Firm,
  isShowPopup: boolean,
  isLoadingPrice: boolean,
  onClosePopupClick: () => void,
  onButtonAddPriceClick: (idFilm: number, idProduct: number, link: string, price: number, count: number) => void
}

const PopupAddPrice: React.FunctionComponent<Props> = (props: Props) => {
  const {
    currentProductPopup,
    currentFirmPopup,
    isShowPopup,
    isLoadingPrice,
    onClosePopupClick,
    onButtonAddPriceClick
  } = props;

  const [stateForm, setStateForm] = useState(StateForm.START);

  const [link, setLink] = useState('');
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <div
      className={isShowPopup ? "popup-price" : "popup-price visually-hidden"}
    >
      <button
        className="button button--popup popup-price__button-close"
        onClick={() => {
          setLink('');
          setStateForm(StateForm.START);
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

      <div className="popup-price__container">
        <h2 className="header popup-price__header">
          Добавление ссылки на товар
        </h2>
        <ul className="popup-price__list">
          <li className="popup-price__item">
            Конкурент: <span className="popup-price__span">{currentFirmPopup.name}</span>
          </li>
          <li className="popup-price__item">
            Сайт конкурента:
            <a className="link" href={'https://' + currentFirmPopup.site}> {currentFirmPopup.site}</a>
           </li>
          <li className="popup-price__item">
            Сопоставляемый товар: <span className="popup-price__span">{currentProductPopup.name}</span>
          </li>
        </ul>
      </div>

      <form
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
      >
        {/*<div className="popup-price__push-wrapper popup-price__container popup-price__container--push">*/}
        {/*  <input*/}
        {/*    className="input popup-price__input-push"*/}
        {/*    id="popup-push"*/}
        {/*    name="popup-push"*/}
        {/*    type="checkbox"*/}
        {/*    alt="Включить уведомления на почту"*/}
        {/*    checked={isEmailChecked}*/}
        {/*    onChange={() => {*/}
        {/*      setChecked(!isEmailChecked)*/}
        {/*    }}*/}
        {/*  />*/}
        {/*    <label className="popup-price__label-push" htmlFor="popup-push">Уведомлять об изменении цены на почту*/}
        {/*      pochta@eurotechspb.com*/}
        {/*    </label>*/}
        {/*</div>*/}

        <div className="popup-price__link-wrapper popup-price__container">
          {stateForm !== StateForm.SUCCESS
          ?<div>
              <h2 className="header header--2">Добавьте ссылку на товар с сайта конкурента</h2>
              <label className="popup-price__label popup-price__label--link" htmlFor="add-info">
                Ссылка может вести на товар конкурента на его сайте или же на товар из маркетплейса (например, Ozon).
                На один отслеживаемый товар может вести только одна ссылка на товар компании-конкурента.
              </label>
              <p>
                Ссылка должна начинаться со следующего адреса: <b>{currentFirmPopup.site}</b>
              </p>
            </div>
            : ''
          }

          <div className="popup-price__link-inner">
            <input className="input popup-price__input"
                   id="add-info"
                   name="popup-link"
                   type="text"
                   value={link}
                   disabled={stateForm === StateForm.SUCCESS}
                   alt="Ссылка на товар с сайта конкурента"
                   placeholder="Ссылка на товар с сайта конкурента"
                   onChange={(evt) => {
                    const currentLink = evt.target.value;
                    setLink(currentLink);
                    setStateForm(StateForm.START);
                   }}
            />

            {stateForm !== StateForm.SUCCESS
            ? <button
                className="button popup-price__button-link"
                type="button"
                disabled={stateForm === StateForm.SEARCH_PRICE}
                onClick={() => {
                  setStateForm(StateForm.SEARCH_PRICE);
                  getPrice(api, link)
                    .then((res) => {
                      setPrice(res.price);
                      setCount(res.count);

                      const isLinkInCompany = isLinkByCompanySite(link, currentFirmPopup);

                      if (!isLinkInCompany) {
                        setStateForm(StateForm.ERROR_LINK);
                      } else if (link === '' || Number(price) === 0) {
                        setStateForm(StateForm.ERROR);
                      } else {
                        setStateForm(StateForm.GET_PRICE);
                      }
                    });
                }}
              >
                {stateForm !== StateForm.SEARCH_PRICE ? 'Проверить' : 'Анализ...'}
              </button>
              : ''
            }

          </div>
        </div>

        {stateForm === StateForm.GET_PRICE
          ? <div className="popup-price__price-wrapper popup-price__container">
            <h2 className="header header--2">Выберите цену для отслеживания</h2>
            <p className="popup-price__radio-info">
              Ниже представлено значение цены, которая была найдена в результате анализа по ссылке:
              <a className="link"
               href={link}
               target="_blank"
              >
                 {link}
              </a>
            </p>
            <div className="popup-price__find-price">
              Найденная цена: <b>{price}</b>
            </div>
            <div className="popup-price__find-price">
              Найденное количество: <b>{count !== null ? count : 'не указано'}</b>
            </div>
            <div className="popup-price__info">
              <p>
                Если цена и количество найдены верно, то нажмите кнопку «Применить», в противном случае введите другую ссылку.
              </p>
              <p>
                В дальнейшем цена и количество по ссылке будут загружаться автоматически.
              </p>
            </div>
          </div>
          : ''
        }

        {stateForm === StateForm.ERROR
          ? <div className="popup-price__price-wrapper popup-price__container">
            <div className="popup-price__info">
              <p>
                Не найдена цена по указанной ссылке. Попробуйте запустить проверку снова.
                Если повторная проверка не дала результата, то укажите другую ссылку.
              </p>
            </div>
          </div>
          : ''
        }

        {stateForm === StateForm.ERROR_LINK
          ? <div className="popup-price__price-wrapper popup-price__container">
            <div className="popup-price__info">
              <p>
                Указанная ссылка не ведет на сайт <b>{currentFirmPopup.site}</b>
              </p>
              <p>
                Пожалуйста, исправьте ссылку и повторите проверку.
              </p>
            </div>
          </div>
          : ''
        }

        {stateForm === StateForm.SUCCESS
          ? <div className="popup-price__price-wrapper popup-price__container">
            <div className="popup-price__info">
              <p>
                <i>Начальная цена</i>, <i>начальное количество</i> и <i>ссылка</i> на товар успешно добавлены на {DateTime.local().toFormat('dd.MM.y')}.
              </p>
              <p>
                В дальнейшем цена будет обновляться автоматически раз в <b>час</b>.
              </p>
              <p>
                Форму можно закрыть.
              </p>
            </div>
          </div>
          : ''
        }

        {stateForm === StateForm.GET_PRICE
          ? <button
            className="popup-price__button button"
            type="submit"
            onClick={(evt) => {
              evt.preventDefault();

              onButtonAddPriceClick(
                currentFirmPopup.id,
                currentProductPopup.id,
                link,
                price,
                0
              );

              setStateForm(StateForm.SUCCESS);
            }}
          >
            {isLoadingPrice ? 'Идет загрузка...' : 'Применить'}
        </button>
          : ''
        }

      </form>
    </div>
  );
}

const getCurrentFirm = (product, firm) => {
  if (product.firms) {
    return product.firms.find((firmProduct) => {
      return firmProduct.name === firm.name;
    });
  }
}


const isLinkByCompanySite = (link, firm) => {
  const siteFirm = firm.site.trim();

  return link.includes(siteFirm);
}


const mapStateToProps = (state) => {
  return {
    isLoadingPrice: getIsLoadingPrice(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  onButtonAddPriceClick(idFirm, idProduct, idLink, price, count) {
    dispatch(DataOperation.addPrice(idFirm, idProduct, idLink, price, count));
  }
});

export {PopupAddPrice};
export default connect(mapStateToProps, mapDispatchToProps)(PopupAddPrice);
