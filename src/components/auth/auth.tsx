import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getIsErrorLogin} from '../../reducer/user/selectors';

interface Props {
  isErrorLogin: boolean,
  onButtonLoginClick: (login: string, password: string) => void
}

const Auth: React.FunctionComponent<Props> = (props: Props) => {
  const {isErrorLogin, onButtonLoginClick} = props;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="page-content page-content--auth">
      <div className="auth">
        <div className="auth__wrapper container">
          <div className="logo auth__logo">
            <img className="logo__img" src="../img/logo.png" width="264" height="152" alt="Логотип ООО ЕВРОТЕК" />
          </div>

          <div className="auth-form">
            <form className="auth-form__form">
              <div className="auth-form__inner">
                <label htmlFor="name">
                  <input
                    id="name"
                    className="input auth-form__name"
                    name="name"
                    value={login}
                    type="text"
                    placeholder="Логин"
                    onChange={(evt) => {
                      setLogin(evt.target.value);
                    }}
                  />
                </label>
                <label htmlFor="password">
                  <input
                    id="password"
                    className="input auth-form__password"
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Пароль"
                    onChange={(evt) => {
                      setPassword(evt.target.value);
                    }}
                  />
                </label>

                {isErrorLogin
                  ? <p>Неверный логин или пароль</p>
                  : ''
                }

                <button
                  className="button auth-form__button"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onButtonLoginClick(login, password);
                  }}
                >
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    isErrorLogin: getIsErrorLogin(state)
  }
}

// АВТОРИЗАЦИЯ ПЕРЕДЕЛАТЬ
const mapDispatchToProps = (dispatch) => ({
  onButtonLoginClick(login, password) {
    dispatch(UserOperation.loginUser(login, password));
  }
});
// АВТОРИЗАЦИЯ ПЕРЕДЕЛАТЬ


export {Auth};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
