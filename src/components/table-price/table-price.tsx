import * as React from 'react';

interface Props {

}

const TablePrice: React.FunctionComponent = (props: Props) => {
  return (
    <table className="table table-price__table">
      <tr className="table__tr">
        <th className="table__th">Товары</th>
        <th className="table__th">ЕВРОТЕК</th>
        <th className="table__th">ПРОМСНАБ</th>
        <th className="table__th">АТМГ</th>
        <th className="table__th">RM316</th>
        <th className="table__th">Гидроэл</th>
        <th className="table__th">Ингидро</th>
      </tr>

      <tr className="table__tr">
        <td className="table__td">Распределитель 1P40</td>
        <td className="table__td">5000</td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          9800
          <span>({`>`}4800)</span>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
      </tr>

      <tr className="table__tr">
        <td className="table__td">Распределитель 1P40</td>
        <td className="table__td">5000</td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          9800
          <span>({`>`}4800)</span>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
      </tr>

      <tr className="table__tr">
        <td className="table__td">Распределитель 1P40</td>
        <td className="table__td">5000</td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          9800
          <span>({`>`}4800)</span>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
      </tr>

      <tr className="table__tr">
        <td className="table__td">Распределитель 1P40</td>
        <td className="table__td">5000</td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          9800
          <span>({`>`}4800)</span>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
        <td className="table__td">
          <button className="button button--link button--blue">Выбрать</button>
        </td>
      </tr>
    </table>
  );
}

export default TablePrice;
