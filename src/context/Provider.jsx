import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [valueRadio, setValueRadio ] = useState('');

  useEffect(() => {
    const getAPI = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}';
    };

  });

  const contextValue = {

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
