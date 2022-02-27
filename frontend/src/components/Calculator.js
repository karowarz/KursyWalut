import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NumericInput from './NumericInput';
import BasicSelect from './BasicSelect';
import { format } from 'date-fns';

const Calculator = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('PLN');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [todayDate] = useState(format(new Date(), 'dd.MM.yyyy'));

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount / exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount * exchangeRate;
  }

  useEffect(() => {
    async function fetchCurrencies() {
      const response = await axios.get(
        `https://api.nbp.pl/api/exchangerates/tables/a/?format=json`
      );
      const fetchedObject = response.data[0].rates;
      fetchedObject.unshift({ currency: 'polski złoty', code: 'PLN', mid: 1 });
      fetchedObject.pop();
      const options = fetchedObject.map((currency) => currency.code);
      setCurrencyOptions(options);
      setFromCurrency(fetchedObject[0].code);
      setToCurrency(fetchedObject[8].code);
    }
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (fromCurrency === 'PLN' && toCurrency === 'PLN') {
      setExchangeRate(1);
    } else if (fromCurrency === 'PLN' && toCurrency !== 'PLN') {
      async function fetchPolishExchangeRate() {
        const response = await axios.get(
          `https://api.nbp.pl/api/exchangerates/rates/a/${toCurrency}/?format=json`
        );
        setExchangeRate(response.data.rates[0].mid);
      }
      fetchPolishExchangeRate();
    } else {
      async function foreignExchangeRate() {
        const fromResponse = await axios.get(
          `https://api.nbp.pl/api/exchangerates/rates/a/${fromCurrency}/?format=json`
        );
        const toResponse = await axios.get(
          `https://api.nbp.pl/api/exchangerates/rates/a/${toCurrency}/?format=json`
        );
        setExchangeRate(
          toResponse.data.rates[0].mid / fromResponse.data.rates[0].mid
        );
      }
      foreignExchangeRate();
    }
  }, [toCurrency, fromCurrency]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <div className='calculator'>
      <h1 className='calculator__title'>Kalkulator Walutowy</h1>
      <div className='calculator__container'>
        <div className='calculator__row'>
          <NumericInput
            label={'Mam'}
            amount={fromAmount}
            onChangeAmount={handleFromAmountChange}
          />
          <BasicSelect
            label={'Waluta'}
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>
        <div className='calculator__row'>
          <NumericInput
            label={'Chcę'}
            amount={toAmount}
            onChangeAmount={handleToAmountChange}
          />
          <BasicSelect
            label={'Waluta'}
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
      </div>
      {
        <p className='calculator__info'>
          1 {toCurrency}= {exchangeRate} {fromCurrency}, według średniego kursu
          NBP z dn. {todayDate}{' '}
        </p>
      }
    </div>
  );
};

export default Calculator;
