import React from 'react';
import { useHistory } from 'react-router';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function Explore() {
  const history = useHistory();
  return (
    <>
      <h1>Tela de explorar</h1>
      <Header title="Explorar" />
      <div className="d-flex flex-column gap-2">
        <button
          data-testid="explore-food"
          className="btn btn-primary"
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          className="btn btn-primary"
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Menu />
    </>
  );
}
