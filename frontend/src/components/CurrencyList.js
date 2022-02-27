import React from 'react';
import Currency from './Currency';

const CurrencyList = (props) => {
  const list = props.list.map((item) => (
    <Currency
      key={item.code}
      code={item.code}
      currency={item.currency}
      mid={item.mid}
      oldMid={item.oldMid}
      click={props.click}
    />
  ));

  return <ul className='currencyList'>{list}</ul>;
};

export default CurrencyList;
