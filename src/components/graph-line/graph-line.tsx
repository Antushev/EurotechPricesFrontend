import React from 'react';
import {DateTime} from 'luxon';
import {ResponsiveLine} from '@nivo/line';
import {getMaxPrice, getMinPrice} from '../../utils/common.js';

interface Props {
  firms: Firm[],
  prices: Price[]
}

const GraphLine: React.FunctionComponent<Props> = (props: Props) => {
  const {firms, prices} = props;

  const data = getDataForGraph(firms, prices);
  const maxPrice = getMaxPrice(prices);
  const minPrice = getMinPrice(prices);

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 0, right: 10, bottom: 100, left: 50 }}
      lineWidth={4}
      colors={{datum: 'color'}}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: minPrice.price - 300,
        max: maxPrice.price + 300,
        stacked: false,
        reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 1,
        tickRotation: 0,
        legend: 'Цена',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      pointSize={4}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={4}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
}

const getDataForGraph = (firms, prices) => {
  if (typeof firms === 'undefined'
    || typeof prices === 'undefined'
  ) {
    return [
      {
        id: 'Нету',
        data: []
      }
    ];
  }

  return firms.map((firm) => {
    const pricesFirm = getPriceByFirm(firm, prices);

    const resultPricesForGraph = pricesFirm.map((price) => {
      if (price.idFirm === firm.id) {
        return {
          x: DateTime.fromISO(price.dateParse).setLocale('ru').toFormat('y-MM-dd HH:mm'),
          y: price.price
        }
      }
    });

    return {
      id: firm.name,
      color: firm.color,
      data: resultPricesForGraph
    }
  });
}

const pricesSortByDate = (prices) => {
  return prices.sort((a, b) => {
    return a.dateParse - b.dateParse;
  })
}

const getPriceByFirm = (firm, prices) => {
  return prices.filter((price) => {
    return price.idFirm === firm.id;
  })
}

const pricesForDay = (prices) => {

}

export default GraphLine;
