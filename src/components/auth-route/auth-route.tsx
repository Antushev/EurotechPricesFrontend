import React from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

import {AuthorizationStatus} from '../../utils/const.js';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

interface Props  {
  children: any,
  authorizationStatus: string
}

const AuthRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {children, authorizationStatus} = props;

  // АВТОРИЗАЦИЯ ПЕРЕДЕЛАТЬ
  const authorizationStatusLocal = localStorage.getItem('authorizationStatus');

  if (
    authorizationStatusLocal === AuthorizationStatus.AUTH
  || authorizationStatus === AuthorizationStatus.AUTH
  ) {
    return <Navigate to="/" replace />
  }

  return children;
}

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state)
  }
}

const mapDispatchToProps = (dispatch) => ({

});

export {AuthRoute}
export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);


