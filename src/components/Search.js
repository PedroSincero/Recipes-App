import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function Search() {
  const { setSearch, setRadio, handleButton, handleDrink } = useContext(AppContext);
  const location = useLocation();
  const routes = () => {
    if (location.pathname === '/comidas') {
      return (
        <Button
          data-testid="exec-search-btn"
          onClick={ () => handleButton() }
        >
          Search
        </Button>
      );
    }
    if (location.pathname === '/bebidas') {
      return (
        <Button
          data-testid="exec-search-btn"
          onClick={ () => handleDrink() }
        >
          Search
        </Button>
      );
    }
  };

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
