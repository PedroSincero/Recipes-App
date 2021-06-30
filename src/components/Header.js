import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <button type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
      </button>
      <h3 data-testid="page-title">Título da Página</h3>
      <button type="button">
        <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
      </button>
    </header>
  );
}
