import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ShowTypeInfo} from '../../utils/const.js';
import {getProductById, getParentProduct} from '../../utils/common.js';

const ID_FIRM_EUROTECH = 1;

interface Props {
  firms: Firm[],
  products: Product[],
  allProducts: Product[],
  prices: Price[],
  links: Link[],
  textSearch: string,
  showTypeInfo: string,
  currentIdGroup,
  isLoadingStart: boolean,
  onButtonAddPriceClick: (evt: any, product: any, firm: any) => any,
  onThMouseOver: () => void,
  onThMouseOut: () => void
}

const TablePrice: React.FunctionComponent<Props> = (props: Props) => {
  const {
    firms,
    allProducts,
    products,
    prices,
    links,
    textSearch,
    showTypeInfo,
    currentIdGroup,
    isLoadingStart,
    onButtonAddPriceClick,
    onThMouseOver,
    onThMouseOut
  } = props;

  const [idOpenContextProduct, setIdOpenContextProduct] = useState(null);

  useEffect(() => {
    const onClick = (evt) => {
      if (
        !evt.target.classList.contains('product-options')
        && !evt.target.classList.contains('product-options__item')
        && !evt.target.classList.contains('product-options__span')
      ) {
        console.log('if');
        setIdOpenContextProduct(null);
      }
    }

    const onEscape = (evt) => {
      if (evt.key === 'Escape') {
        setIdOpenContextProduct(null);
      }
    }

    document.addEventListener('click', onClick);

    document.addEventListener('keydown', onEscape);
  }, []);

  const currentGroup = getProductById(allProducts, currentIdGroup);

  const parentProduct = typeof currentGroup !== 'undefined'
    ? getProductById(allProducts, currentGroup['id_parent'])
    : null;

  if (!isLoadingStart) {
    return (
      <table
        className="table table-price__table"
        onClick={() => {
          setIdOpenContextProduct(null);
        }}
      >
        <thead
          onMouseOver={() => {
            onThMouseOver();
          }}
          onMouseOut={() => {
            onThMouseOut();
          }}
        >
        <tr className="table__tr">
          <th className="table__th">Товары</th>
          {renderHeaderTable(firms)}
        </tr>
        </thead>

        <tbody>
        {currentIdGroup !== null &&
          <tr className="table__tr">
            <td className="table__td">
              <Link
                className="link link--table"
                to={typeof parentProduct === 'undefined'
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

          {renderTableStroke(
            products,
            firms,
            prices,
            links,
            textSearch,
            showTypeInfo,
            currentIdGroup,
            onButtonAddPriceClick,
            idOpenContextProduct,
            setIdOpenContextProduct
          )}
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
  const activeFirms = firms.filter((firm) => firm.isActive);

  return activeFirms.map((firm) => {
    return <th key={Math.random()} className="table__th">{firm.name}</th>
  });
}

const renderTableStroke = (products,
                           firms,
                           prices,
                           links,
                           textSearch,
                           showTypeInfo,
                           currentIdGroup,
                           onButtonClick,
                           idOpenContextProduct,
                           setIdOpenContextProduct) => {
  if (products.length === 0 && textSearch !== '') {
    return <tr key={Math.random()} className="table__tr">
      <td className="table__td" colSpan={10}><h4>Ничего не найдено. Отчистите поле ввода или отредактируйте название товара в поисковой строке.</h4></td>
    </tr>
  } else if (products.length === 0 && textSearch === '') {
    return <tr key={Math.random()} className="table__tr">
      <td className="table__td" colSpan={10}><h4>В данной подгруппе нет товаров.</h4></td>
    </tr>
  }

  return products.map((product) => {
    const eurotechPrice = getPriceProduct(product.id, ID_FIRM_EUROTECH, prices);
    const activeFirms = firms.filter((firm) => firm.isActive);


    const productsElements = activeFirms.map((firm) => {
      const isProductByLinksArray = getIsLinksByProduct(product, firm, links);
      const priceFind = getPriceProduct(product.id, firm.id, prices);

      if (typeof priceFind !== 'undefined' && priceFind.price !== null) {
        if (typeof eurotechPrice !== 'undefined' && firm.id !== ID_FIRM_EUROTECH) {
          return (
            <td key={String(product.id) + String(firm.id)} className="table__td">
              {showTypeInfo === ShowTypeInfo.PRICE
                ? getMarkupCompare(
                  firm.name,
                  eurotechPrice.price,
                  priceFind.price,
                  ShowTypeInfo.PRICE
                )
                : getMarkupCompare(
                  firm.name,
                  eurotechPrice.count,
                  priceFind.count,
                  ShowTypeInfo.COUNT
                )
              }
            </td>
          );
        } else {
          return (
            <td key={String(product.id) + String(firm.id)} className="table__td">
            {showTypeInfo === ShowTypeInfo.PRICE
              ? priceFind.price
              : priceFind.count
            }
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
       <td
         key={product.name + product.id}
         className="table__td"
         onContextMenu={(evt) => {
           evt.preventDefault();
           if (evt.button === 2) {
             setIdOpenContextProduct(product.id);
           }
         }}
       >
         <Link
           className="link link--table"
           to={`/stats/${product.id}`}
         >
           {product.name}
           <ul className={idOpenContextProduct === product.id
             ? 'product-options'
             : 'product-options visually-hidden'
           }
           >
             <li
               className="product-options__item"
             >
               <div className="product-options__icon-wrapper">
                 <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path className="product-options__icon-path"
                         d="M13 0C5.8208 0 0 5.8229 0 13C0 20.1813 5.8208 26 13 26C20.1792 26 26 20.1813 26 13C26 5.8229 20.1792 0 13 0ZM13 5.76613C14.2159 5.76613 15.2016 6.75182 15.2016 7.96774C15.2016 9.18366 14.2159 10.1694 13 10.1694C11.7841 10.1694 10.7984 9.18366 10.7984 7.96774C10.7984 6.75182 11.7841 5.76613 13 5.76613ZM15.9355 19.0806C15.9355 19.428 15.6538 19.7097 15.3065 19.7097H10.6935C10.3462 19.7097 10.0645 19.428 10.0645 19.0806V17.8226C10.0645 17.4752 10.3462 17.1935 10.6935 17.1935H11.3226V13.8387H10.6935C10.3462 13.8387 10.0645 13.5571 10.0645 13.2097V11.9516C10.0645 11.6042 10.3462 11.3226 10.6935 11.3226H14.0484C14.3958 11.3226 14.6774 11.6042 14.6774 11.9516V17.1935H15.3065C15.6538 17.1935 15.9355 17.4752 15.9355 17.8226V19.0806Z"
                         fill="#777777" fillOpacity="0.5"/>
                 </svg>
               </div>
               <span className="product-options__span">подробнее</span>
             </li>
             <li
               className="product-options__item"
               onClick={(evt) => {
                 evt.preventDefault();
               }}
             >
               <div className="product-options__icon-wrapper">
                 <svg className="product-options__icon" width="26" height="25" viewBox="0 0 26 25" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                   <path className="product-options__icon-path"
                         d="M11.6052 0.869652L8.43178 7.3337L1.33161 8.37361C0.0583408 8.55913 -0.451939 10.1361 0.471424 11.0393L5.60824 16.068L4.39329 23.1716C4.17459 24.4556 5.52076 25.4174 6.64824 24.8169L13 21.4628L19.3518 24.8169C20.4792 25.4125 21.8254 24.4556 21.6067 23.1716L20.3918 16.068L25.5286 11.0393C26.4519 10.1361 25.9417 8.55913 24.6684 8.37361L17.5682 7.3337L14.3948 0.869652C13.8262 -0.282549 12.1787 -0.297196 11.6052 0.869652Z"
                         fill="#777777" fillOpacity="0.5"/>
                 </svg>
               </div>
               <span className="product-options__span">в избранное</span>
             </li>
             <li
               className="product-options__item"
             >
               <div className="product-options__icon-wrapper">
                 <svg className="product-options__icon" width="15" height="25" viewBox="0 0 15 25" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                   <path className="product-options__icon-path"
                         d="M5.46875 15.4756V23.1265L6.54395 24.7388C6.77588 25.0864 7.28711 25.0864 7.51904 24.7388L8.59375 23.1265V15.4756C8.08643 15.5693 7.56543 15.625 7.03125 15.625C6.49707 15.625 5.97607 15.5693 5.46875 15.4756ZM7.03125 0C3.14795 0 0 3.14795 0 7.03125C0 10.9146 3.14795 14.0625 7.03125 14.0625C10.9146 14.0625 14.0625 10.9146 14.0625 7.03125C14.0625 3.14795 10.9146 0 7.03125 0ZM7.03125 3.71094C5.2002 3.71094 3.71094 5.2002 3.71094 7.03125C3.71094 7.35449 3.44824 7.61719 3.125 7.61719C2.80176 7.61719 2.53906 7.35449 2.53906 7.03125C2.53906 4.5542 4.55469 2.53906 7.03125 2.53906C7.35449 2.53906 7.61719 2.80176 7.61719 3.125C7.61719 3.44824 7.35449 3.71094 7.03125 3.71094Z"
                         fill="#777777" fillOpacity="0.5"/>
                 </svg>
               </div>
               <span className="product-options__span">закрепить</span>
             </li>
             <li
               className="product-options__item"
             >
               <div className="product-options__icon-wrapper">
                 <svg className="product-options__icon" width="25" height="23" viewBox="0 0 25 23" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                   <path className="product-options__icon-path"
                         d="M17.474 3.60677L21.3889 7.5217C21.5538 7.68663 21.5538 7.95573 21.3889 8.12066L11.9097 17.5998L7.88194 18.0469C7.34375 18.1076 6.88802 17.6519 6.94878 17.1137L7.39583 13.0859L16.875 3.60677C17.0399 3.44184 17.309 3.44184 17.474 3.60677ZM24.5052 2.61285L22.3872 0.494792C21.7274 -0.164931 20.6554 -0.164931 19.9913 0.494792L18.4549 2.03125C18.2899 2.19618 18.2899 2.46528 18.4549 2.63021L22.3698 6.54514C22.5347 6.71007 22.8038 6.71007 22.9687 6.54514L24.5052 5.00868C25.1649 4.34462 25.1649 3.27257 24.5052 2.61285V2.61285ZM16.6667 15.0217V19.4401H2.77778V5.55122H12.7517C12.8906 5.55122 13.0208 5.49479 13.1207 5.39931L14.8568 3.66319C15.1866 3.33333 14.9523 2.77344 14.4878 2.77344H2.08333C0.93316 2.77344 0 3.7066 0 4.85677V20.1345C0 21.2847 0.93316 22.2179 2.08333 22.2179H17.3611C18.5113 22.2179 19.4444 21.2847 19.4444 20.1345V13.2856C19.4444 12.8212 18.8845 12.5911 18.5547 12.9167L16.8186 14.6528C16.7231 14.7526 16.6667 14.8828 16.6667 15.0217Z"
                         fill="#777777" fillOpacity="0.5"/>
                 </svg>
               </div>
               <span className="product-options__span">переименовать</span>
             </li>
             <li className="product-options__item">
               <div className="product-options__icon-wrapper">
                 <svg className="product-options__icon" width="19" height="21" viewBox="0 0 19 21" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                   <path className="product-options__icon-path"
                         d="M18.3214 1.31251H13.2321L12.8335 0.545515C12.749 0.38154 12.6189 0.243608 12.4579 0.147236C12.2968 0.0508642 12.1111 -0.000124194 11.9217 7.19115e-06H7.07411C6.88512 -0.000695428 6.69974 0.0501028 6.53923 0.146582C6.37871 0.243061 6.24954 0.381319 6.16652 0.545515L5.76786 1.31251H0.678571C0.498603 1.31251 0.326006 1.38165 0.198749 1.50472C0.0714922 1.62779 0 1.79471 0 1.96876L0 3.28126C0 3.4553 0.0714922 3.62222 0.198749 3.74529C0.326006 3.86837 0.498603 3.93751 0.678571 3.93751H18.3214C18.5014 3.93751 18.674 3.86837 18.8013 3.74529C18.9285 3.62222 19 3.4553 19 3.28126V1.96876C19 1.79471 18.9285 1.62779 18.8013 1.50472C18.674 1.38165 18.5014 1.31251 18.3214 1.31251ZM2.25625 19.1543C2.28861 19.6541 2.51672 20.1232 2.89413 20.4661C3.27154 20.809 3.76989 20.9999 4.28772 21H14.7123C15.2301 20.9999 15.7285 20.809 16.1059 20.4661C16.4833 20.1232 16.7114 19.6541 16.7437 19.1543L17.6429 5.25H1.35714L2.25625 19.1543Z"
                         fill="#777777" fillOpacity="0.5"/>
                 </svg>
               </div>
               <span className="product-options__span">удалить</span>
             </li>
           </ul>
         </Link>
       </td>
       {productsElements}
     </tr>
    );
  });
}

const getMarkupCompare = (firmName, eurotechPrice, productPrice, mode = ShowTypeInfo.PRICE) => {
  const comparePrice = Math.floor(Math.abs(eurotechPrice - productPrice) * 100) / 100;

  if (eurotechPrice !== null && firmName !== 'ЕВРОТЕК') {
    return (
      <div>
        {productPrice}
        {mode === ShowTypeInfo.PRICE &&
          <span
            className={eurotechPrice > productPrice
            ? "table__td-compare table__td-compare--more"
            : "table__td-compare table__td-compare--less"}
            >
          {eurotechPrice > productPrice ? "(<" + String(comparePrice) + ")" : "(>" + String(comparePrice) + ")"}
            </span>
        }
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
