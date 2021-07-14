import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import './CSS/Headers.css';

export default function Header({ title }) {
  const history = useHistory();
  return (
    <header className="buttonHeader2">
      <Button variant="danger" type="button" onClick={ () => history.push('/perfil') }>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </Button>
      <h3 className="title" data-testid="page-title">{title}</h3>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
