import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';

export default function BtnFoods() {
  const { handleFood, foodsAPI, idFood } = useContext(AppContext);
  const history = useHistory();
  const redirecionar = () => {
    if (idFood) {
      return history.push(`comidas/${idFood}`);
    }
    return (
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
    );
  };
  return (
    <>
      <Button
        data-testid="exec-search-btn"
        onClick={ () => handleFood() }
      >
        Search
      </Button>
      {redirecionar()}
      {/* <div>
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
        { console.log(foodsAPI)}
      </div> */}
    </>
  );
}
