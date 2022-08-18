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
  currentProductStats: {},

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
  currentProductFirm: {},

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
  pricesStats: [],

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
  SET_CURRENT_PRODUCTS: 'SET_CURRENT_PRODUCTS',
  SET_CURRENT_PRODUCT_POPUP: 'SET_CURRENT_PRODUCT_POPUP',
  SET_IS_LOADING_PRODUCT: 'SET_IS_LOADING_PRODUCT',
  SET_CURRENT_PRODUCT_STATS: 'SET_CURRENT_PRODUCT_STATS',

  LOAD_FIRMS: 'LOAD_FIRMS',
  SET_CURRENT_FIRM_POPUP: 'SET_CURRENT_FIRM_POPUP',
  SET_FIRM_IN_PRODUCT: 'SET_FIRM_IN_PRODUCT',
  SET_IS_LOADING_FIRM: 'SET_IS_LOADING_FIRM',
  SET_FIRM_ACTIVE_STATUS: 'SET_FIRM_ACTIVE_STATUS',

  LOAD_PRICES: 'LOAD_PRICES',
  ADD_PRICE: 'ADD_PRICE',
  SET_IS_LOADING_PRICE: 'SET_IS_LOAD_PRICE',
  LOAD_PRICES_FOR_STATS: 'GET_PRICES_FOR_STATS',

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
  setCurrentProducts(products) {
    return {
      type: ActionType.SET_CURRENT_PRODUCTS,
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
  setCurrentProductStats(product) {
    return {
      type: ActionType.SET_CURRENT_PRODUCT_STATS,
      payload: product
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
  setFirmActiveStatus(idFirm) {
    return {
      type: ActionType.SET_FIRM_ACTIVE_STATUS,
      payload: idFirm
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
  loadPricesForStats(prices) {
    return {
      type: ActionType.LOAD_PRICES_FOR_STATS,
      payload: prices
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
  addProduct: (name, idAuthor, isGroup = false, idParent = null) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoadingProduct());
    api.post('/product', {
      name: name,
      idAuthor: idAuthor,
      isGroup: isGroup,
      idParent: idParent
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

  loadFirms: (idUser) => (dispatch, getState, api) => {
    return api.get(`/firms/${idUser}`)
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
  editActiveFirm: (firms, idUser) => (dispatch, getState, api) => {
    api.post('/firm-active', {
      firms: firms,
      idUser: idUser
    })
      .then(() => {

      })
      .catch((error) => {
        throw error;
      });
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
  },

  getProductById: (idProduct) => (dispatch, getState, api) => {
    return api.get(`/product/${idProduct}`)
      .then((response) => {
        const product = response.data;
        dispatch(ActionCreator.setCurrentProductStats(product));
      })
      .catch((error) => {
        throw error;
      })
  },
  loadPricesForStats: (idProduct, dateFrom, dateTo) => (dispatch, getState, api) => {
    return api.post(`/prices-stats/`, {
      idProduct: idProduct,
      dateTo: dateTo,
      dateFrom: dateFrom
    })
      .then((response) => {
        const prices = response.data;

        dispatch(ActionCreator.loadPricesForStats(prices));
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
    case ActionType.SET_CURRENT_PRODUCTS:
      return Object.assign({}, state, {
        currentProducts: action.payload
      });
    case ActionType.SET_CURRENT_PRODUCT_POPUP:
      return Object.assign({}, state, {
        currentProductPopup: action.payload
      })
    case ActionType.SET_IS_LOADING_PRODUCT:
      return Object.assign({}, state, {
        isLoadingProduct: !state.isLoadingProduct
      })
    case ActionType.SET_CURRENT_PRODUCT_STATS:
      return Object.assign({}, state, {
        currentProductStats: action.payload
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
    case ActionType.SET_FIRM_ACTIVE_STATUS:
      const idFirm = action.payload;

      const newFirms = state.firms.map((firm) => {
        if (firm.id === idFirm) {
          return Object.assign({}, firm, {
            isActive: !firm.isActive
          });
        }

        return firm;
      })

      return Object.assign({}, state, {
        firms: newFirms
      });
    case ActionType.LOAD_PRICES:
      return Object.assign({}, state, {
        prices: action.payload
      })
    case ActionType.SET_IS_LOADING_PRICE:
      return Object.assign({}, state, {
        isLoadingPrice: !state.isLoadingPrice
      })
    case ActionType.LOAD_PRICES_FOR_STATS:
      return Object.assign({}, state, {
        pricesStats: action.payload
      })
    case ActionType.LOAD_LINKS:
      return Object.assign({}, state, {
        links: action.payload
      })
  }

  return state;
}

export {reducer, ActionType, ActionCreator, Operation}

