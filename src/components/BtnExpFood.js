import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function BtnExpFood() {
  const history = useHistory();
  return (
    <>
      <Button
        variant="outline-primary"
        size="lg"
        block
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        variant="outline-primary"
        size="lg"
        block
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
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
