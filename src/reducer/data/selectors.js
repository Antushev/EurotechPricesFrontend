import {NameSpace} from '../name-space';

const getProducts = (state) => {
  return state[NameSpace.DATA].products;
}

const getProductById = (state, idProduct) => {
  const products = state[NameSpace.DATA].products;

  return [products.find((product) => {
    return product.id === idProduct;
  })]
}

const getCurrentProducts = (state) => {
  return state[NameSpace.DATA].currentProducts;
}

const getCurrentProductPopup = (state) => {
  return state[NameSpace.DATA].currentProductPopup;
}

const getIsLoadingProduct = (state) => {
  return state[NameSpace.DATA].isLoadingProduct;
}

const getCurrentProductStats = (state) => {
  return state[NameSpace.DATA].currentProductStats;
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

const getPrices = (state) => {
  return state[NameSpace.DATA].prices;
}

const getIsLoadingPrice = (state) => {
  return state[NameSpace.DATA].isLoadingPrice;
}

const getPricesForStats = (state) => {
  return state[NameSpace.DATA].pricesStats
}

const getIsLoadingStart = (state) => {
  return state[NameSpace.DATA].isLoadingStart;
}

const getLinks = (state) => {
  return state[NameSpace.DATA].links;
}

export {
  getProducts,
  getProductById,
  getCurrentProductPopup,
  getCurrentProducts,
  getIsLoadingProduct,
  getCurrentProductStats,
  getFirms,
  getCurrentFirmPopup,
  getIsLoadingFirm,
  getPrices,
  getIsLoadingPrice,
  getPricesForStats,
  getIsLoadingStart,
  getLinks
};

