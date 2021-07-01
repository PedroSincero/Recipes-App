import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function Search() {
  const { setSearch, setRadio, handleButton, handleDrink, data } = useContext(AppContext);
  const location = useLocation();
  const routes = () => {
    if (location.pathname === '/comidas') {
      return (
        <>
          <Button
            data-testid="exec-search-btn"
            onClick={ () => handleButton() }
          >
            Search
          </Button>
          <div>
            {data.map((info, index) => (
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
    if (location.pathname === '/bebidas') {
      return (
        <>
          <Button
            data-testid="exec-search-btn"
            onClick={ () => handleDrink() }
          >
            Search
          </Button>
          <div>
            {data.map((info, index) => (
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
  };
  console.log(data);
  return (
    <Form>
      <Form.Group data-testid="search-top-btn">
        <Form.Control
          type="text"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setSearch(value) }
        />
        <Form.Check
          type="radio"
          data-testid="ingredient-search-radio"
          label="Ingrediente"
          name="grup-1"
          value="ingredient"
          onClick={ ({ target: { value } }) => setRadio(value) }
        />
        <Form.Check
          type="radio"
          data-testid="name-search-radio"
          label="Nome"
          value="name"
          onClick={ ({ target: { value } }) => setRadio(value) }
          name="grup-1"
        />
        <Form.Check
          type="radio"
          data-testid="first-letter-search-radio"
          label="Primeira letra"
          name="grup-1"
          value="firstLetter"
          onClick={ ({ target: { value } }) => setRadio(value) }
        />
        {routes()}
      </Form.Group>
    </Form>
  );
}

// Agradecimentos a Daniel Roberto Turma 10 Tribo B, pelo auxilio na logica do useLocation
