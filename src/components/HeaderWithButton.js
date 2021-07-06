import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function HeaderWithButton({ title }) {
  const history = useHistory();
  const [searchButton, setSearchButton] = useState(false);

  return (
    <header>
      <button type="button" onClick={ () => history.push('/perfil') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </button>
      <h3 data-testid="page-title">{title}</h3>
      <button
        type="button"
        onClick={ () => (!searchButton ? setSearchButton(true) : setSearchButton(false)) }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
      </button>
      {searchButton && <Search />}
    </header>
  );
}

HeaderWithButton.propTypes = {
  title: PropTypes.string.isRequired,
};
