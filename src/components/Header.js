import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

export default function Header({ title }) {
  const history = useHistory();
  return (
    <header>
      <button type="button" onClick={ () => history.push('/perfil') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </button>
      <h3 data-testid="page-title">{title}</h3>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
