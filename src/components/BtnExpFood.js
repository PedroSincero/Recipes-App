import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/Explore.css';

export default function BtnExpFood() {
  const [food, setFood] = useState();

  async function fetchAPI() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((data) => data.json())
      .then((e) => e.meals[0].idMeal);
    return response;
  }

  useEffect(() => {
    fetchAPI().then((resp) => setFood(resp));
  }, []);

  const history = useHistory();
  return (
    <div className="d-flex flex-column gap-2 margin-div">
      <Button
        className="btn btn-primary margin"
        size="lg"
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </Button>
      <Button
        className="btn btn-primary margin"
        size="lg"
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </Button>
      <Button
        className="btn btn-primary margin"
        size="lg"
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/comidas/${food}`) }
      >
        Me Surpreenda!
      </Button>
    </div>
  );
}
