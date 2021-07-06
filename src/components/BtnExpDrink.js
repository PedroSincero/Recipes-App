import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function BtnExpDrink() {
  const history = useHistory();
  return (
    <>
      <Button
        variant="outline-primary"
        size="lg"
        block
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        variant="outline-primary"
        size="lg"
        block
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
    </>
  );
}
