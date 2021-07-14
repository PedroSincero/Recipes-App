import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/Explore.css';

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
    <div className="d-flex flex-column gap-2 margin-div">
      <Button
        className="btn btn-primary margin"
        size="lg"
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        className="btn btn-primary margin"
        size="lg"
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/bebidas/${drink}`) }
      >
        Me Surpreenda!
      </Button>
    </div>
  );
}
