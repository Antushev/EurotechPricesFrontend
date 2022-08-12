import {DateTime} from 'luxon';

const initialState = {
  isLoadingStart: false,
  isLoadingProduct: false,
  isLoadingFirm: false,
  isLoadingPrice: false,

  products: [
    {
      id: 1,
      idAuthor: 4,
      name: 'Распределитель 1P40',
      dateCreate: '10-08-2022'
    }
  ],
  currentProducts: [],
  currentProductPopup: {
    id: 1,
    idAuthor: 4,
    name: 'Распределитель 1P40',
    isEmailNotification: true
  },

  firms: [
    {
      id: 1,
      name: 'ЕВРОТЕК',
      site: 'eurotechspb.com',
      dateCreate: '10-08-2022'
    }
  ],
  currentFirmPopup: {
    id: 1,
    name: 'ЕВРОТЕК',
    site: 'eurotechspb.com'
  },

  prices: [
    {
      id: 1,
      idProduct: 1,
      idFirm: 1,
      idLink: 1,
      price: 2150,
      count: 14,
      dateParse: '10-08-2022'
    }
  ],

  links: [
    {
      id: 1,
      idFirm: 1,
      idProduct: 1,
      link: 'example.com/catalog/4',
      dateCreate: '2022-08-10'
    }
  ]
}

const ActionType = {
  SET_IS_LOADING_START: 'SET_IS_LOADING_START',

  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
  SET_CURRENT_PRODUCT_POPUP: 'SET_CURRENT_PRODUCT_POPUP',
  SET_IS_LOADING_PRODUCT: 'SET_IS_LOADING_PRODUCT',

  LOAD_FIRMS: 'LOAD_FIRMS',
  SET_CURRENT_FIRM_POPUP: 'SET_CURRENT_FIRM_POPUP',
  SET_FIRM_IN_PRODUCT: 'SET_FIRM_IN_PRODUCT',
  SET_IS_LOADING_FIRM: 'SET_IS_LOADING_FIRM',

  LOAD_PRICES: 'LOAD_PRICES',
  ADD_PRICE: 'ADD_PRICE',
  SET_IS_LOADING_PRICE: 'SET_IS_LOAD_PRICE',

  LOAD_LINKS: 'LOAD_LINKS'
}

const ActionCreator = {
  setIsLoadingStart() {
    return {
      type: ActionType.SET_IS_LOADING_START,
      payload: false
    }
  },

  loadProducts(products) {
    return {
      type: ActionType.LOAD_PRODUCTS,
      payload: products
    }
  },
  setCurrentProductPopup(product) {
    return {
      type: ActionType.SET_CURRENT_PRODUCT_POPUP,
      payload: product
    }
  },
  setIsLoadingProduct() {
    return {
      type: ActionType.SET_IS_LOADING_PRODUCT,
      payload: true
    }
  },

  loadFirms(firms) {
    return {
      type: ActionType.LOAD_FIRMS,
      payload: firms
    }
  },
  setCurrentFirmPopup(firm) {
    return {
      type: ActionType.SET_CURRENT_FIRM_POPUP,
      payload: firm
    }
  },
  setIsLoadingFirm() {
    return {
      type: ActionType.SET_IS_LOADING_FIRM,
      payload: true
    }
  },

  loadPrices(prices) {
    return {
      type: ActionType.LOAD_PRICES,
      payload: prices
    }
  },
  setIsLoadingPrice() {
    return {
      type: ActionType.SET_IS_LOADING_PRICE,
      payload: null
    }
  },

  loadLinks(links) {
    return {
      type: ActionType.LOAD_LINKS,
      payload: links
    }
  }
}

const Operation = {
  loadProducts: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoadingStart());
    api.get('/products')
      .then((response) => {
        const products = response.data;

        dispatch(ActionCreator.loadProducts(products));
        dispatch(ActionCreator.setIsLoadingStart());
      })
      .catch((error) => {
        throw error;
      })
  },
  addProduct: (name, idAuthor) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoadingProduct());
    api.post('/product', {
      name: name,
      idAuthor: idAuthor
    })
      .then(() => {
        dispatch(Operation.loadProducts());
      })
      .then(() => {
        dispatch(ActionCreator.setIsLoadingProduct());
      })
      .catch((error) => {
        console.log(error);
      })
  },

  loadFirms: () => (dispatch, getState, api) => {
    return api.get('/firms')
      .then((response) => {
        const firms = response.data;

        dispatch(ActionCreator.loadFirms(firms));
      })
      .catch((error) => {
        throw error;
      })
  },
  addFirm: (firm) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoadingFirm());
    return api.post('/firm', {
      name: firm.name,
      site: firm.site
    })
      .then((response) => {
        const firms = response.data;

        dispatch(ActionCreator.loadFirms(firms));
      })
      .then(() => {
        dispatch(ActionCreator.setIsLoadingFirm());
      })
      .catch((error) => {
        throw error;
      })
  },

  loadPrices: (date) => (dispatch, getState, api) => {
    return api.get(`/prices/${date}`)
      .then((response) => {
        const prices = response.data;

        dispatch(ActionCreator.loadPrices(prices));
      })
      .catch((error) => {
        throw error;
      })
  },
  addPrice: (idFirm, idProduct, link, price, count) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoadingPrice());
    return api.post('/price', {
      idFirm: idFirm,
      idProduct: idProduct,
      link: link,
      price: price,
      count: count
    })
      .then(() => {
        dispatch(ActionCreator.setIsLoadingPrice());
        const nowDate = DateTime.local().toFormat('y-MM-dd');

        dispatch(Operation.loadPrices(nowDate));
        dispatch(Operation.loadLinks());
      })
      .catch((error) => {
        console.log(error);
      })
  },

  loadLinks: () => (dispatch, getState, api) => {
    return api.get('/links')
      .then((response) => {
        const links = response.data;
        dispatch(ActionCreator.loadLinks(links));
      })
      .catch((error) => {
        console.log(error);
      })
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_IS_LOADING_START:
      return Object.assign({}, state, {
        isLoadingStart: !state.isLoadingStart
      })
    case ActionType.LOAD_PRODUCTS:
      return Object.assign({}, state, {
        products: action.payload,
        currentProducts: action.payload
      })
    case ActionType.SET_CURRENT_PRODUCT_POPUP:
      return Object.assign({}, state, {
        currentProductPopup: action.payload
      })
    case ActionType.SET_IS_LOADING_PRODUCT:
      return Object.assign({}, state, {
        isLoadingProduct: !state.isLoadingProduct
      })
    case ActionType.LOAD_FIRMS:
      return Object.assign({}, state, {
        firms: action.payload
      })
    case ActionType.SET_CURRENT_FIRM_POPUP:
      return Object.assign({}, state, {
        currentFirmPopup: action.payload
      })
    case ActionType.SET_IS_LOADING_FIRM:
      return Object.assign({}, state, {
        isLoadingFirm: !state.isLoadingFirm
      })
    case ActionType.LOAD_PRICES:
      return Object.assign({}, state, {
        prices: action.payload
      })
    case ActionType.SET_IS_LOADING_PRICE:
      return Object.assign({}, state, {
        isLoadingPrice: !state.isLoadingPrice
      })
    case ActionType.LOAD_LINKS:
      return Object.assign({}, state, {
        links: action.payload
      })
  }

  return state;
}

export {reducer, ActionType, ActionCreator, Operation}
