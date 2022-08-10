import axios from 'axios';

const getPrice = () => {
  axios.get('http://185.20.225.130:1481/api/price')
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
      }
    }, (error) => {
      console.log('Ошибка при выполнении запроса на сервер', error);
    })
    .catch((error) => {
      console.warn('Ошибка в коде:', error);
    });
}

export {getPrice};
