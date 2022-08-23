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

export {
  getProductById,
  getParentProduct,
  getPrice,
};
