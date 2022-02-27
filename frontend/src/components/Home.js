import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import CurrencyList from './CurrencyList';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns';
import subDays from 'date-fns/subDays';

const Home = () => {
  const [stateCurrency, setCurrency] = useState([]);
  const [currencyCode, setCurrencyCode] = useState('eur');
  const [fromDate, setFromDate] = useState(
    subDays(new Date(), 15).toLocaleDateString('fr-CA')
  );
  const [yesterdayDate] = useState(
    subDays(new Date(), 1).toLocaleDateString('fr-CA')
  );
  const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [stateYesterdayCurrencies, setYesterdayMids] = useState([]);
  const [currencyName, setCurrencyName] = useState('');
  const [chartRates, setChartRates] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  const triggerFetch = () => {
    async function fetchChart() {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/${fromDate}/${toDate}/`
      );

      const json = await response.json();
      const chartRatesArray = [];
      const chartLabelsArray = [];
      //eslint-disable-next-line
      json.rates.map((rate) => {
        if (rate && rate.mid) {
          chartRatesArray.push(rate.mid);
        }
        if (rate && rate.effectiveDate) {
          chartLabelsArray.push(rate.effectiveDate);
        }
      });

      setChartRates(chartRatesArray);
      setChartLabels(chartLabelsArray);
      setCurrencyName(json.currency);
    }
    fetchChart();
  };

  useEffect(() => {
    async function fetchCurrencies() {
      const response = await fetch(
        'https://api.nbp.pl/api/exchangerates/tables/a/?format=json'
      );
      const json = await response.json();
      setCurrency(json[0].rates);
    }
    fetchCurrencies();

    async function fetchYesterdayMid() {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/tables/a/${yesterdayDate}/?format=json`
      );
      const json = await response.json();
      setYesterdayMids(json[0].rates);
    }
    fetchYesterdayMid();

    triggerFetch();
  }, []);

  useEffect(() => triggerFetch(), [currencyCode, fromDate, toDate]);

  const changeChartData = (code) => {
    setCurrencyCode(code);
  };
  const todayCurrencies = stateCurrency;
  const yesterdayCurrencies = stateYesterdayCurrencies;

  const yesterdayMids = yesterdayCurrencies.map((hej) => hej.mid);

  const bothMids = todayCurrencies.map((dzisiaj, index) => ({
    ...dzisiaj,
    oldMid: yesterdayMids[index],
  }));

  return (
    <div className="container">
      <section className="homeScreen">
        <div className="date-picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data początkowa"
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue.toLocaleDateString('fr-CA'));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data końcowa"
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue.toLocaleDateString('fr-CA'));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <div className="chart">
          <Chart
            name={currencyName}
            labels={chartLabels}
            chartData={chartRates}
          />
        </div>
        <CurrencyList list={bothMids} click={changeChartData} />
      </section>
    </div>
  );
};

export default Home;
