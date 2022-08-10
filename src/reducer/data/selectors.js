import {NameSpace} from './../name-space.js';

const getProducts = (state) => {
  return state[NameSpace.DATA].products;
}

const getProductById = (state, idProduct) => {
  const products = state[NameSpace.DATA].products;

  return [products.find((product) => {
    return product.id === idProduct;
  })]
}

const getCurrentProductPopup = (state) => {
  return state[NameSpace.DATA].currentProductPopup;
}

const getIsLoadingProduct = (state) => {
  return state[NameSpace.DATA].isLoadingProduct;
}

const getFirms = (state) => {
  return state[NameSpace.DATA].firms;
}

const getCurrentFirmPopup = (state) => {
  return state[NameSpace.DATA].currentFirmPopup;
}

const getIsLoadingFirm = (state) => {
  return state[NameSpace.DATA].isLoadingFirm;
}

export {
  getProducts,
  getProductById,
  getCurrentProductPopup,
  getIsLoadingProduct,
  getFirms,
  getCurrentFirmPopup,
  getIsLoadingFirm
};

