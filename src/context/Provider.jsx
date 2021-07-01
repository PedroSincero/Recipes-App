import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');

  const handleButton = () => {
    const getFood = async (endpoints) => {
      const limit = 12;
      await fetch(endpoints)
        .then((response) => response
          .json())
        .then(({ meals }) => setData(meals.slice(0, limit)))
        .catch((error) => console.log(error));
      // setData(results);
    };
    let endpoint = '';
    if (search === '') {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'); // eslint-disable-line no-alert
    }
    if (radio === 'firstLetter' && search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
    }
    if (radio === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      getFood(endpoint);
    }
    if (radio === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      getFood(endpoint);
    }
    if (radio === 'firstLetter' && search.length <= 1) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
      getFood(endpoint);
    }
  };

  const handleDrink = () => {
    const getDrink = async (endpoints) => {
      const limit = 12;
      await fetch(endpoints)
        .then((response) => response
          .json())
        .then(({ drinks }) => setData(drinks.slice(0, limit)))
        .catch((error) => console.log(error));
      // setData(results);
    };
    let endpoint = '';
    if (radio === 'firstLetter' && search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
    }
    if (radio === 'ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
      getDrink(endpoint);
      console.log('voce esta em bebidas');
    }
    if (radio === 'name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
      getDrink(endpoint);
    }
    if (radio === 'firstLetter' && search.length <= 1) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
      getDrink(endpoint);
    }
  };

  const contextValue = {
    search,
    setSearch,
    radio,
    setRadio,
    handleButton,
    handleDrink,
    data,
  };
  // console.log(history);
  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
