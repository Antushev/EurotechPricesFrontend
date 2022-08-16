import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getProductById} from '../../utils/common.js';

import {Operation as DataOperation} from '../../reducer/data/data';
import {getUser} from '../../reducer/user/selectors';

interface Props {
  products: Product[],
  user: any,
  idParent: number,
  isShowPopupGroup: boolean,
  addProduct: (name: string, idAuthor: number, isGroup: boolean, idParent: number) => void,
  onClosePopupClick: () => void
}

const PopupAddGroup: React.FunctionComponent<Props> = (props: Props) => {
  const {
    products,
    user,
    idParent,
    isShowPopupGroup,
    addProduct,
    onClosePopupClick
  } = props;

  const StateForm = {
    START: 1,
    ERROR: 2,
    SUCCESS: 3
  }

  const parentProduct = getProductById(products, idParent);

  const [name, setName] = useState('');
  const [stateForm, setStateForm] = useState(StateForm.START);

  return (
    <div className={isShowPopupGroup ? 'popup-group' : 'popup-group visually-hidden'}>
      <button
        className="button button--popup popup-group__button-close"
        onClick={() => {
          onClosePopupClick();
          setStateForm(StateForm.START);
        }}
      >
        <svg className="popup-price__close" width="41" height="41" viewBox="0 0 41 41" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.5 0C9.1754 0 0 9.1754 0 20.5C0 31.8246 9.1754 41 20.5 41C31.8246 41 41 31.8246 41 20.5C41 9.1754 31.8246 0 20.5 0ZM30.5516 25.8813C30.9401 26.2698 30.9401 26.898 30.5516 27.2865L27.2782 30.5516C26.8897 30.9401 26.2615 30.9401 25.873 30.5516L20.5 25.129L15.1187 30.5516C14.7302 30.9401 14.102 30.9401 13.7135 30.5516L10.4484 27.2782C10.0599 26.8897 10.0599 26.2615 10.4484 25.873L15.871 20.5L10.4484 15.1187C10.0599 14.7302 10.0599 14.102 10.4484 13.7135L13.7218 10.4401C14.1103 10.0516 14.7385 10.0516 15.127 10.4401L20.5 15.871L25.8813 10.4484C26.2698 10.0599 26.898 10.0599 27.2865 10.4484L30.5599 13.7218C30.9484 14.1103 30.9484 14.7385 30.5599 15.127L25.129 20.5L30.5516 25.8813Z"
            fill="#BE1E2D"/>
        </svg>
      </button>

      <h2 className="header popup-group__container">Добавлении группы</h2>

      <div className="popup-group__container">
        <form>
          <label className="popup-group__label" htmlFor="popup-name-company">
            Введите название компании, которое будет отображаться в общей таблице товаров.
          </label>
          <input
            className="input popup-group__input"
            id="popup-name-group"
            name="popup-name-company"
            type="text"
            value={name}
            alt="Введите название компании для добавления"
            placeholder="Название группы"
            onChange={(evt) => {
              setName(evt.target.value);
            }}
          />
        </form>
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
              Группа <b>{name}</b> успешно добавлена!
            </p>
            <p>
              {typeof parentProduct === 'undefined'
                ? 'Её можно найти в корневой группе таблицы товаров'
                : `Её можно найти в подгруппе <b>${parentProduct.name}</b> таблицы товаров`
              }
              </p>
            <p>Закройте окно или добавьте ещё один товар.</p>
          </div>
        </div>
        : ''
      }

      <button
        className="button popup-group__button"
        onClick={() => {
          addProduct(name, user.id, true, idParent);

          setStateForm(StateForm.SUCCESS);
        }}
      >Применить</button>
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  addProduct(name, idAuthor, isGroup, idParent) {
    dispatch(DataOperation.addProduct(name, idAuthor, isGroup, idParent));
  }
});

export {PopupAddGroup};
export default connect(mapStateToProps, mapDispatchToProps)(PopupAddGroup)
