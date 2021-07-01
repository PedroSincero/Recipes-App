import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');

  const handleButton = () => {
    let endpoint = '';
    const getAPI = async (endpoints) => {
      const results = await fetch(endpoints).then((response) => response.json());
      setData(results);
    };
    if (radio === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    }
    if (radio === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    }
    if (radio === 'firstLetter' && search.length <= 1) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    }
    if (radio === 'firstLetter' && search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
    }
    getAPI(endpoint);
  };

  const contextValue = {
    search,
    setSearch,
    radio,
    setRadio,
    handleButton,
    data,
  };

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
