import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function BtnDrinks() {
  const { handleDrink, drinksAPI, idDrinks } = useContext(AppContext);
  const history = useHistory();
  const redirect = () => {
    if (idDrinks) {
      return history.push(`bebidas/${idDrinks}`);
    }
    return (
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
    );
  };

  return (
    <>
      <Button
        data-testid="exec-search-btn"
        onClick={ () => handleDrink() }
      >
        Search
      </Button>
      {redirect()}
    </>
  );
}
