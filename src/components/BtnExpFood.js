import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function BtnExpFood() {
  async function fetchAPI() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((data) => data.json())
      .then((e) => e.meals[0].idMeal);
    return console.log(response);
  }

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
        // onClick={ () => history.push(`comidas/${fetchAPI}`) }
        onClick={ fetchAPI }
      >
        Me Surpreenda!
      </Button>
    </>
  );
}
