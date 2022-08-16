const getProductById = (products, idProduct) => {
  return products.find((product) => product.id === idProduct);
}

const getParentProduct = (products, idProduct) => {
  const parent = products.find((product) => product.id === idProduct);

  return typeof parent === 'undefined' ? null : parent;
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

const getUserEurotech = (api) => {
  return api.get('/user')
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      throw error;
    })
}

export {
  getProductById,
  getParentProduct,
  getPrice,
  getUserEurotech};
