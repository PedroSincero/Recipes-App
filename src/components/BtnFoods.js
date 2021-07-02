import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';

export default function BtnFoods() {
  const { handleFood, foodsAPI } = useContext(AppContext);
  return (
    <>
      <Button
        data-testid="exec-search-btn"
        onClick={ () => handleFood() }
      >
        Search
      </Button>
      <div>
        {foodsAPI && foodsAPI.map((info, index) => (
          <li key={ index } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{info.strMeal}</p>
            <img
              src={ info.strMealThumb }
              alt={ info.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </li>
        ))}
      </div>
    </>
  );
}
