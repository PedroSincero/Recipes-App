import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');

  const getAPI = async (endpoints) => {
    const results = await fetch(endpoints)
      .then((response) => response
        .json()).catch((error) => console.log(error));
    setData(results);
  };

  const handleButton = () => {
    let endpoint = '';
    if (radio === 'firstLetter' && search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
    }
    if (radio === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      getAPI(endpoint);
      console.log('voce esta em comidas');
    }
    if (radio === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      getAPI(endpoint);
    }
    if (radio === 'firstLetter' && search.length <= 1) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
      getAPI(endpoint);
    }
  };

  const handleDrink = () => {
    let endpoint = '';
    if (radio === 'firstLetter' && search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
    }
    if (radio === 'ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
      getAPI(endpoint);
      console.log('voce esta em bebidas');
    }
    if (radio === 'name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
      getAPI(endpoint);
    }
    if (radio === 'firstLetter' && search.length <= 1) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
      getAPI(endpoint);
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
