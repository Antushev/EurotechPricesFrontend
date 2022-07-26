interface Firm {
  id: number,
  name: string,
  site: string
}

interface Product {
  id: number,
  name: string,
  idAuthor: number,
  nameAuthor: string,
  isEmailNotification: boolean,
  firms: {
    name: string,
    price: number,
    date: string
  }[]
}

interface Link {
  id: number,
  idFirm: number,
  idProduct: number,
  link: string,
  dateCreate: string
}

interface Price {
  id: number,
  idFirm: number,
  idProduct: number,
  idLink: number,
  price: number,
  count: number,
  dateParse: string
}

interface User {
  id: number,
  firstName: string,
  lastName: string,
  login: string,
  auth: string
}

interface Menu {
  name: string,
  menuLink: string
}



