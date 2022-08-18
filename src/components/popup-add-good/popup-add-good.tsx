import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Operation as ProductsOperation} from '../../reducer/data/data';
import {getIsLoadingProduct} from '../../reducer/data/selectors.js';

const StateForm = {
  START: 1,
  SUCCESS: 2,
  ERROR: 3
}

interface Props {
  idParent: number,
  isShowPopup: boolean,
  isLoadingProduct: boolean,
  onClosePopupClick: () => void,
  onButtonAddProductClick: (name: string, idAuthor: number, isGroup: boolean, idParent: number) => void
}

const PopupAddGood: React.FunctionComponent<Props> = (props: Props) => {
  const {
    idParent,
    isShowPopup,
    onClosePopupClick,
    isLoadingProduct,
    onButtonAddProductClick
  } = props;

  const [name, setName] = useState('');
  const [stateForm, setStateForm] = useState(StateForm.START);

  return (
    <div
      className={isShowPopup ? 'popup-good' : 'popup-good visually-hidden'}
    >
      <button
        className="button button--popup popup-good__button-close"
        onClick={() => {
          setName('');
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

      <h2 className="header popup-good__container">Добавление товара</h2>

      <form>
        <div className="popup-good__container">
          <label className="popup-good__label" htmlFor="popup-name">
            Введите название товара, которое будет отображаться в общей таблице товаров.
            Название товара может быть любое.
          </label>
          <input
            className="input popup-good__input"
            id="popup-name"
            name="popup-name"
            type="text"
            value={name}
            alt="Введите название товара"
            placeholder="Введите название товара"
            onChange={(evt) => {
              setName(evt.target.value)
              setStateForm(StateForm.START);
            }}
          />
        </div>

        {stateForm === StateForm.ERROR
          ? <div className="popup-price__price-wrapper popup-price__container">
            <div className="popup-price__info">
              <p>
                Не удалось добавить товар. Пожалуйста, проверьте все ли поля заполнены корректно и отправьте форму снова.
              </p>
            </div>
          </div>
          : ''
        }

        {stateForm === StateForm.SUCCESS
          ? <div className="popup-price__price-wrapper popup-price__container">
            <div className="popup-price__info">
              <p>
                Товар <b>{name}</b> успешно добавлен!
                Его можно найти в общей таблице товаров.
                Закройте окно или добавьте ещё один товар.
              </p>
            </div>
          </div>
          : ''
        }

        <button
          className="button popup-good__button"
          onClick={(evt) => {
            evt.preventDefault();
            if (name !== '') {
              onButtonAddProductClick(name, 1, false, idParent);

              setStateForm(StateForm.SUCCESS)
              setName('');
            } else {
              setStateForm(StateForm.ERROR);
            }
          }}
        >
          {!isLoadingProduct ? 'Применить' : 'Идет загузка...'}
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
 return {
  isLoadingProduct: getIsLoadingProduct(state)
 }
}

const mapDispatchToProps = (dispatch) => ({
  onButtonAddProductClick(name, idAuthor, isGroup, idParent) {
    dispatch(ProductsOperation.addProduct(name, idAuthor, isGroup, idParent));
  }
})

export {PopupAddGood};
export default connect(mapStateToProps, mapDispatchToProps)(PopupAddGood);
