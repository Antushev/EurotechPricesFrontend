import React from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';

import {AuthorizationStatus} from '../../utils/const.js';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

interface Props {
  children: any,
  authorizationStatus: string
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {children, authorizationStatus} = props;

  // АВТОРИЗАЦИЯ ПЕРЕДЕЛАТЬ
  const authorizationStatusLocal = localStorage.getItem('authorizationStatus');

  if (
    authorizationStatusLocal === AuthorizationStatus.NO_AUTH
    || authorizationStatus === AuthorizationStatus.NO_AUTH
  ) {
    // @ts-ignore
    return <Navigate auth={authorizationStatus} to="/auth" replace/>
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

export {PrivateRoute};
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
