import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import '../../styles/Explore.css';

export default function Explore() {
  const history = useHistory();
  return (
    <>
      <Header title="Explorar" />
      <div className="d-flex flex-column gap-2 margin-div">
        <Button
          data-testid="explore-food"
          className="btn btn-primary margin"
          size="lg"
          type="button"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </Button>
        <Button
          data-testid="explore-drinks"
          className="btn btn-primary margin"
          size="lg"
          type="button"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </Button>
      </div>
      <Menu />
    </>
  );
}
