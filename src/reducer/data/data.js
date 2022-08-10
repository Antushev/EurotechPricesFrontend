const initialState = {
  isLoadingProduct: false,
  products: [
    {
      id: 1,
      idAuthor: 4,
      name: 'Распределитель 1P40',
      isEmailNotification: true,
      firms: [
        {
          name: 'ЕВРОТЕК',
          price: 3289.15,
          date: '25.07.2022',
          link: 'example.com/add'
        },
        {
          name: 'ПРОМСНАБ',
          price: 3984.1,
          date: '25.07.2022',
          link: 'example.com/add'
        },
        {
          name: 'АТМГ',
          price: 9800,
          date: '25.07.2022',
          link: 'example.com/add'
        },
        {
          name: 'RM316',
          price: null,
          date: '25.07.2022',
          link: 'example.com/add'
        },
        {
          name: 'Гидроэл',
          price: null,
          date: '25.07.2022',
          link: 'example.com/add'
        },
        {
          name: 'Ингидро',
          price: null,
          date: '25.07.2022',
          link: 'example.com/add'
        },
        {
          name: 'Гидроулей',
          price: null,
          date: '25.07.2022',
          link: 'example.com/add'
        },
        {
          name: 'Пневмакс',
          price: 4011.84,
          date: '25.07.2022',
          link: 'example.com/add'
        }
      ]
    }
  ],
  currentProducts: [],
  currentProductPopup: {
    id: 1,
    idAuthor: 4,
    name: 'Распределитель 1P40',
    isEmailNotification: true,
    firms: [
      {
        name: 'ЕВРОТЕК',
        price: 3289.15,
        date: '25.07.2022',
        link: 'example.com/add'
      },
      {
        name: 'ПРОМСНАБ',
        price: 3984.1,
        date: '25.07.2022',
        link: 'example.com/add'
      },
      {
        name: 'АТМГ',
        price: 9800,
        date: '25.07.2022',
        link: 'example.com/add'
      },
      {
        name: 'RM316',
        price: null,
        date: '25.07.2022',
        link: 'example.com/add'
      },
      {
        name: 'Гидроэл',
        price: null,
        date: '25.07.2022',
        link: 'example.com/add'
      },
      {
        name: 'Ингидро',
        price: null,
        date: '25.07.2022',
        link: 'example.com/add'
      },
      {
        name: 'Гидроулей',
        price: null,
        date: '25.07.2022',
        link: 'example.com/add'
      },
      {
        name: 'Пневмакс',
        price: 4011.84,
        date: '25.07.2022',
        link: 'example.com/add'
      }
    ]
  },

  isLoadingFirm: false,
  firms: [
    {
      id: 1,
      name: 'ЕВРОТЕК',
      site: 'eurotechspb.com',
      date_create: '2022-08-10'
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
      idFirm: 1,
      idProduct: 1,
      idLink: 1,
      price: 1415,
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
  ADD_FIRM_IN_PRODUCT: 'ADD_FIRM_IN_PRODUCT',
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
  SET_CURRENT_PRODUCT_POPUP: 'SET_CURRENT_PRODUCT_POPUP',
  SET_EMAIL_NOTIFICATION_PRODUCT: 'SET_EMAIL_NOTIFICATION_PRODUCT',
  SET_IS_LOADING_PRODUCT: 'SET_IS_LOADING_PRODUCT',

  LOAD_FIRMS: 'LOAD_FIRMS',
  SET_CURRENT_FIRM_POPUP: 'SET_CURRENT_FIRM_POPUP',
  SET_FIRM_IN_PRODUCT: 'SET_FIRM_IN_PRODUCT',
  SET_IS_LOADING_FIRM: 'IS_LOADING_FIRM'
}

const ActionCreator = {
  addFirmInProduct(firm) {
    return {
      type: ActionType.ADD_FIRM_IN_PRODUCT,
      payload: firm
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
  setEmailNotificationProduct(product) {
    return {
      type: ActionType.SET_EMAIL_NOTIFICATION_PRODUCT,
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
      type: ActionType.IS_LOADING_FIRM,
      payload: true
    }
  }
}

const Operation = {
  addProduct: (name, idAuthor) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setIsLoadingProduct());
    api.post('/product', {
      name: name,
      idAuthor: idAuthor
    })
      .then(() => {
        dispatch(ActionCreator.setIsLoadingProduct());
      })
      .catch((error) => {
        console.log(error);
      })
  },

  loadFirms: () => (dispatch, getState, api) => {
    return api.get('/firm')
      .then((response) => {
        console.log(response.data);

        dispatch(ActionCreator.loadFirms(response.data));
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
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_FIRM_IN_PRODUCT:
      const products = state.products;
      const currentProducts = state.currentProducts;
      const newFirm = action.payload;

      products.forEach((product) => {
        product.firms.push(newFirm);
      });

      currentProducts.forEach((product) => {
        product.firms.push(newFirm);
      })

      console.log(products);

      return Object.assign({}, state, {
        products: products,
        currentProducts: currentProducts
      });
    case ActionType.LOAD_PRODUCTS:
      return Object.assign({}, state, {
        products: action.payload,
        currentProducts: action.payload
      })
    case ActionType.SET_CURRENT_PRODUCT_POPUP:
      return Object.assign({}, state, {
        currentProductPopup: action.payload
      })
    case ActionType.SET_EMAIL_NOTIFICATION_PRODUCT:
      return Object.assign({}, state, {
        isEmailNotification: !state.currentProductPopup.isEmailNotification
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
  }

  return state;
}

export {reducer, ActionType, ActionCreator, Operation}

