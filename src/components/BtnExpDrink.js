import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function BtnExpDrink() {
  const [drink, setDrink] = useState();

  async function fetchAPI() {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((data) => data.json())
      .then((e) => e.drinks[0].idDrink);
    return response;
  }

  useEffect(() => {
    fetchAPI().then((resp) => setDrink(resp));
  }, []);

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
        onClick={ () => history.push(`/bebidas/${drink}`) }
      >
        Me Surpreenda!
      </Button>
    </>
  );
}
