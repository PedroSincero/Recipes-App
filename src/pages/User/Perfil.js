import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function Perfil() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));

  function getEmail() {
    return (
      <p
        type="text"
        data-testid="profile-email"
      >
        { user.email }
      </p>
    );
  }

  return (
    <>
      <Header title="Perfil" />
      {user && getEmail()}
      <div className="d-flex flex-column gap-2">
        <button
          data-testid="profile-done-btn"
          className="btn btn-primary"
          type="button"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          className="btn btn-primary"
          type="button"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          className="btn btn-primary"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Sair
        </button>
      </div>
      <Menu />
    </>
  );
}
