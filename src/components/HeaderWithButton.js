import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Search from './Search';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './CSS/Headers.css';

export default function HeaderWithButton({ title }) {
  const history = useHistory();
  const [searchButton, setSearchButton] = useState(false);

  return (
    <header className="buttonHeader">
      <Button variant="danger" type="button" onClick={ () => history.push('/perfil') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </Button>
      <h3 data-testid="page-title">{title}</h3>
      <Button
        variant="danger"
        type="button"
        onClick={ () => (!searchButton ? setSearchButton(true)
          : setSearchButton(false)) }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
      </Button>
      {searchButton && <Search />}
    </header>
  );
}

HeaderWithButton.propTypes = {
  title: PropTypes.string.isRequired,
};
