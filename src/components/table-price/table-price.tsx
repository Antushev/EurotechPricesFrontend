import * as React from 'react';
import {Link} from 'react-router-dom';
import {getParentProduct} from '../../utils/common.js';

const ID_FIRM_EUROTECH = 1;

interface Props {
  firms: Firm[],
  products: Product[],
  prices: Price[],
  links: Link[],
  currentIdGroup,
  isLoadingStart: boolean,
  onButtonAddPriceClick: (evt: any, product: any, firm: any) => any
}

const TablePrice: React.FunctionComponent<Props> = (props: Props) => {
  const {
    firms,
    products,
    prices,
    links,
    currentIdGroup,
    isLoadingStart,
    onButtonAddPriceClick
  } = props;

  const firmsNames = getAllFirmsNames(firms);
  const parentProduct = getParentProduct(products, currentIdGroup);

  if (!isLoadingStart) {
    return (
      <table className="table table-price__table">
        <thead>
        <tr className="table__tr">
          <th className="table__th">Товары</th>
          {renderHeaderTable(firmsNames)}
        </tr>
        </thead>

        <tbody>
        {currentIdGroup !== null &&
          <tr className="table__tr">
            <td className="table__td">
              <Link
                className="link link--table"
                to={parentProduct === null
                  ? '/prices'
                  : `/prices/${parentProduct.id}`
                }
              >
                <svg className="table__td-icon" width="25" height="17" viewBox="0 0 25 17">
                  <path
                    d="M24.8565 9.89987L21.7131 15.2885C21.4685 15.7079 21.1182 16.0558 20.6972 16.2976C20.2763 16.5394 19.7992 16.6667 19.3138 16.6667H1.95421C1.15026 16.6667 0.649349 15.7946 1.05443 15.1001L4.19783 9.71146C4.44246 9.2921 4.79272 8.94418 5.21372 8.70238C5.63471 8.46057 6.11173 8.33333 6.59722 8.33333H23.9568C24.7607 8.33333 25.2616 9.20542 24.8565 9.89987ZM6.59722 6.94444H20.8333V4.86111C20.8333 3.7105 19.9006 2.77778 18.75 2.77778H11.8056L9.02778 0H2.08333C0.932726 0 0 0.932726 0 2.08333V14.1513L2.99813 9.01163C3.74193 7.73654 5.12105 6.94444 6.59722 6.94444Z"
                    fill="black"/>
                </svg>
                ...
              </Link>
            </td>
          </tr>
          }

          {renderTableStroke(products, firms, prices, links, currentIdGroup, onButtonAddPriceClick)}
        </tbody>
      </table>
    );
  } else {
    return (
      <p>Идет загрузка...</p>
    );
  }


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

const renderTableStroke = (products, firms, prices, links, currentIdGroup, onButtonClick) => {
  if (products.length === 0) {
    return <tr key={Math.random()} className="table__tr">
      <td className="table__td" colSpan={10}><h4>Ничего не найдено. Отчистите поле ввода или отредактируйте название товара в поисковой строке.</h4></td>
    </tr>
  }
  return products.map((product) => {
    const eurotechPrice = getPriceProduct(product.id, ID_FIRM_EUROTECH, prices);

    const productsElements = firms.map((firm) => {
      const isProductByLinksArray = getIsLinksByProduct(product, firm, links);
      const priceFind = getPriceProduct(product.id, firm.id, prices);

      if (typeof priceFind !== 'undefined' && priceFind.price !== null) {
        if (typeof eurotechPrice !== 'undefined' && firm.id !== ID_FIRM_EUROTECH) {
          return (
            <td key={String(product.id) + String(firm.id)} className="table__td">
              {getMarkupCompare(firm.name, eurotechPrice.price, priceFind.price)}
            </td>
          );
        } else {
          return (
            <td key={String(product.id) + String(firm.id)} className="table__td">
            {priceFind.price}
          </td>
          );
        }
      } else {
        if (isProductByLinksArray) {
          return <td className="table__td" key={String(product.id) + String(firm.id)}>
            <svg width="31" height="23" viewBox="0 0 26 18" fill="none">
              <path fillOpacity="0.4" d="M21.7532 7.98834C21.9133 7.57037 22.0032 7.11334 22.0032 6.63678C22.0032 4.56647 20.3235 2.88678 18.2532 2.88678C17.4836 2.88678 16.7649 3.12115 16.1711 3.51959C15.0891 1.64459 13.0696 0.38678 10.7532 0.38678C7.30005 0.38678 4.50317 3.18365 4.50317 6.63678C4.50317 6.74225 4.50708 6.84772 4.51099 6.95319C2.32349 7.72272 0.753174 9.80865 0.753174 12.2618C0.753174 15.3672 3.27271 17.8868 6.37817 17.8868H20.7532C23.5149 17.8868 25.7532 15.6485 25.7532 12.8868C25.7532 10.4688 24.0344 8.44928 21.7532 7.98834ZM16.5618 11.4532L12.4446 15.5704C12.2024 15.8126 11.804 15.8126 11.5618 15.5704L7.44458 11.4532C7.05005 11.0587 7.3313 10.3868 7.88599 10.3868H10.4407V6.01178C10.4407 5.66803 10.7219 5.38678 11.0657 5.38678H12.9407C13.2844 5.38678 13.5657 5.66803 13.5657 6.01178V10.3868H16.1204C16.675 10.3868 16.9563 11.0587 16.5618 11.4532V11.4532Z" fill="#ffc901"/>
            </svg>
          </td>
        } else {
          return (
            <td key={String(product.id) + String(firm.id)} className="table__td">
              <button
                key={product.id}
                className="button button--link button--blue"
                onClick={(evt) => {
                  onButtonClick(evt, product, firm);
                }}
              >
                Добавить
              </button>
            </td>
          );
        }

      }
    });

    if (product.is_group) {
      return (
        <tr key={product.id + product.name} className="table__tr">
          <td className="table__td">
            <Link className="link link--table" to={`/prices/${product.id}`}>
              <svg className="table__td-icon" width="25" height="19" viewBox="0 0 25 19" fill="none">
                <path
                  d="M22.6562 3.125H13.2812L10.1562 0H2.34375C1.04932 0 0 1.04932 0 2.34375V16.4062C0 17.7007 1.04932 18.75 2.34375 18.75H22.6562C23.9507 18.75 25 17.7007 25 16.4062V5.46875C25 4.17432 23.9507 3.125 22.6562 3.125Z"
                  fill="black"/>
              </svg>
              {product.name}
            </Link>
          </td>
        </tr>
      );
    }

    return (
     <tr
       key={product.name + product.id}
       className="table__tr"
       onClick={(evt) => {
         // const currentElement = evt.target as Element;
         //
         // if (!currentElement.classList.contains('button--link')) {
         //   return <Navigate to={`/stats/${product.id}`} />
         // }

       }}
     >
       <td key={product.name + product.id} className="table__td">
         <Link className="link link--table" to={`/stats/${product.id}`}>
         {product.name}
       </Link>
       </td>
       {productsElements}
     </tr>
    );
  });
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
          {eurotechPrice > productPrice ? "(<" + String(comparePrice) + ")" : "(>" + String(comparePrice) + ")"}
         </span>
      </div>
    );
  }

  return productPrice;
}

const getPriceProduct = (idProduct, idFirm, prices) => {
  return prices.find((price) => {
    return price.idProduct === idProduct && price.idFirm === idFirm;
  });
}

const getIsLinksByProduct = (product, firm, links) => {
  return links.some((link) => {
    return link.idProduct === product.id && link.idFirm === firm.id;
  });
}

export default TablePrice;
