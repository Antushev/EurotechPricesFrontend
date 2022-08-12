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

export {getPrice, getUserEurotech};
