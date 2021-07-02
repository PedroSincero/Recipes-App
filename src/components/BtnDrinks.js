import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';

export default function BtnDrinks() {
  const { handleDrink, drinksAPI } = useContext(AppContext);
  return (
    <>
      <Button
        data-testid="exec-search-btn"
        onClick={ () => handleDrink() }
      >
        Search
      </Button>
      <div>
        {drinksAPI && drinksAPI.map((info, index) => (
          <li key={ index } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{info.strDrink}</p>
            <img
              src={ info.strDrinkThumb }
              alt={ info.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </li>
        ))}
      </div>
    </>
  );
}
