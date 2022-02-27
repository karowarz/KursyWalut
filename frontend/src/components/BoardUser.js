import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import DataService from '../services/user.service';
import FavoriteCurrencies from './FavoriteCurrencies';

const BoardUser = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectValue, setSelectValue] = useState('');
  const currentUser = AuthService.getCurrentUser();
  const currentUserId = AuthService.getCurrentUserId();

  useEffect(() => {
    retrieveCurrencies();
    console.log(retrieveCurrencies());
  }, []);

  const handleInputSelect = (e) => {
    const { value } = e.target;
    setSelectValue(value);
  };

  const saveCurrency = () => {
    let data = {
      currencies: selectValue.slice(0, 3),
    };
    DataService.create(currentUserId, data).then((response) => {
      setSelectValue('');
      retrieveCurrencies();
    });
  };

  const retrieveCurrencies = () => {
    DataService.getUserBoard(currentUserId)
      .then((response) => {
        const dataToArray = response.data.split(' ');
        const filtered = dataToArray.filter((e) => e);
        setCurrencies(filtered);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveCurrencies = (currencies, index) => {
    setSelectValue(currencies);
    setCurrentIndex(index);
  };

  const deleteCurrency = () => {
    let data = {
      currencies: selectValue.slice(0, 3),
    };

    DataService.create(currentUserId, data).then((response) => {
      retrieveCurrencies();
      setSelectValue('');
      setCurrentIndex(-1);
    });
  };

  return (
    <>
      <h4 className="boardUser__title">Witaj {currentUser.username}</h4>
      <header className="boardUser">
        <ul className="currencyUl">
          {currencies &&
            currencies.map((currencies, index) => (
              <li
                className={
                  'currencyRow' + (index === currentIndex ? '-active' : '')
                }
                onClick={() => setActiveCurrencies(currencies, index)}
                key={index}
              >
                {currencies}
              </li>
            ))}
        </ul>

        <div className="boardUser__manageList">
          <FavoriteCurrencies
            label={'Ulubione'}
            value={selectValue}
            onChange={handleInputSelect}
          />
          <button
            className="boardUser__manageList--element2 button boardUser__button"
            onClick={saveCurrency}
          >
            Dodaj
          </button>
          <button
            className="boardUser__manageList--element3 button boardUser__button button--delete"
            onClick={deleteCurrency}
          >
            Usuń z ulubionych
          </button>
        </div>
      </header>
    </>
  );
};

export default BoardUser;
