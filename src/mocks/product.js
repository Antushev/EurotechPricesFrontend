const firms = [
  {
    id: 1,
    name: 'ЕВРОТЕК',
    site: 'eurotechspb.com'
  },
  {
    id: 2,
    name: 'ПРОМСНАБ',
    site: 'example.com'
  },
  {
    id: 3,
    name: 'АТМГ',
    site: 'example.com'
  },
  {
    id: 4,
    name: 'RM316',
    site: 'example.com'
  },
  {
    id: 5,
    name: 'Гидроэл',
    site: 'example.com'
  },
  {
    id: 6,
    name: 'Ингидро',
    site: 'example.com'
  },
  {
    id: 7,
    name: 'Гидроулей',
    site: 'example.com'
  },
  {
    id: 8,
    name: 'Пневмакс',
    site: 'example.com'
  }
]

const products = [
  {
    id: 1,
    name: 'Распределитель 1P40',
    firms: [
      {
        name: 'ЕВРОТЕК',
        price: 5000,
        date: '25.07.2022'
      },
      {
        name: 'ПРОМСНАБ',
        price: null,
        date: '25.07.2022'
      },
      {
        name: 'АТМГ',
        price: 9800,
        date: '25.07.2022'
      },
      {
        name: 'RM316',
        price: null,
        date: '25.07.2022'
      },
      {
        name: 'Гидроэл',
        price: null,
        date: '25.07.2022'
      },
      {
        name: 'Ингидро',
        price: null,
        date: '25.07.2022'
      }
    ]
  }
];

export {firms, products}
