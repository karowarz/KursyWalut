import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function FavoriteCurrencies(props) {
  const [stateCurrency, setCurrency] = useState([]);

  useEffect(() => {
    async function fetchCurrencies() {
      const response = await fetch(
        'https://api.nbp.pl/api/exchangerates/tables/a/?format=json'
      );
      const json = await response.json();
      setCurrency(json[0].rates);
    }
    fetchCurrencies();
  }, []);

  const list2 = stateCurrency.map((item) => (
    <option key={item.code} value={`${item.code}${item.currency}`}>
      {item.currency}
    </option>
  ));

  return (
    <form className='selectFavorite boardUser__manageList--element1'>
      <label>
        <select className='custom-select' name='' onChange={props.onChange}>
          <option >
            Wybierz walutę.
          </option>
          {list2}
        </select>
      </label>
    </form>
  );
}
