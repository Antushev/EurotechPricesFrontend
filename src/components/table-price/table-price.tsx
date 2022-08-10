import * as React from 'react';

interface Props {
  firms: Firm[],
  products: Product[],
  onButtonAddPriceClick: (evt: any, product: any, firm: any) => any
}

const TablePrice: React.FunctionComponent<Props> = (props: Props) => {
  const {firms, products, onButtonAddPriceClick} = props;

  const firmsNames = getAllFirmsNames(firms);

  return (
    <table className="table table-price__table">
      <thead>
        <tr className="table__tr">
          <th className="table__th">Товары</th>
          {renderHeaderTable(firmsNames)}
        </tr>
      </thead>

      <tbody>
        {renderTableStroke(products, firms, onButtonAddPriceClick)}
      </tbody>
    </table>
  );
}

const getAllFirmsNames = (firms) => {
  return firms.map((firm) => {
    return firm.name;
  });
}

const renderHeaderTable = (firms) => {
  return firms.map((firm) => {
    return <th key={Math.random()} className="table__th">{firm}</th>
  });
}

const renderTableStroke = (products, firms, onButtonClick) => {
  if (products.length === 0) {
    return <tr key={Math.random()} className="table__tr">
      <td className="table__td" colSpan={10}><h4>Ничего не найдено. Отчистите поле ввода или отредактируйте название товара в поисковой строке.</h4></td>
    </tr>
  }
  return products.map((product) => {
    const currentProductPopup = product;
    const eurotechPrice = getEurotechPrice(product);

    const productsElements = firms.map((firm) => {
      return product.firms.map((firmProduct) => {
        if (firm.name === firmProduct.name) {
          const currentFirmProduct = firm;
          return (
            <td key={firmProduct.id + firmProduct.name} className="table__td">
              {
                firmProduct.price === null
                  ? <button key={firmProduct.id}
                    className="button button--link button--blue"
                    onClick={(evt) => {
                      onButtonClick(evt, currentProductPopup, currentFirmProduct);
                    }}
                  >
                    Добавить
                </button>
                  : getMarkupCompare(firmProduct.name, eurotechPrice, firmProduct.price)
              }
            </td>
          );
        }
      });
    });

    return <tr key={product.name + product.id} className="table__tr">
      <td key={product.name + product.id} className="table__td">{product.name}</td>
      {productsElements}
    </tr>
  });
}

const getEurotechPrice = (product) => {
  const firms = product.firms;

  return firms.find((firm) => {
    return firm.name === 'ЕВРОТЕК';
  }).price;
}

const getMarkupCompare = (firmName, eurotechPrice, productPrice) => {
  const comparePrice = Math.floor(Math.abs(eurotechPrice - productPrice) * 100) / 100;

  if (eurotechPrice !== null && firmName !== 'ЕВРОТЕК') {
    return (
      <div>
        {productPrice}
        <span
          className={eurotechPrice > productPrice
            ? "table__td-compare table__td-compare--more"
            : "table__td-compare table__td-compare--less"}
        >
          {eurotechPrice > productPrice ? "<" + String(comparePrice) : ">" + String(comparePrice)}
        </span>
      </div>
    );
  }

  return productPrice;
}

export default TablePrice;
