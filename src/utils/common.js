const getProductById = (products, idProduct) => {
  return products.find((product) => product.id === idProduct);
}

const getParentProduct = (products, idParent) => {
  return products.find((product) => product['id_parent'] === idParent);
}

const getPrice = (api, link) => {
  return api.post('/parser', {
    link: link
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    })
}

const getMaxPrice = (prices) => {
  if (prices.length !== 0) {
    return prices.reduce((prev, current) => {
      if (current.price > prev.price) {
        return current;
      }

      return prev;
    })
  }

  return 0;
}

const getMinPrice = (prices) => {
  if (prices.length !== 0) {
    return prices.reduce((prev, current) => {
      if (prev.price < current.price) {
        return prev;
      }

      return current;
    })
  }

  return 0;
}

export {
  getProductById,
  getParentProduct,
  getPrice,
  getMaxPrice,
  getMinPrice
};
