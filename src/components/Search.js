import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Search() {
  const handleRadio = ({ value }) => {
    console.log(value);
  };

  return (
    <Form>
      <Form.Group data-testid="search-top-btn">
        <Form.Control type="text" data-testid="search-input" />
        <Form.Check
          type="radio"
          data-testid="ingredient-search-radio"
          label="Ingrediente"
          name="grup-1"
          value="Ingrediente-Pesquisa"
          onClick={ ({ target }) => console.log('ingrediente') || handleRadio(target) }
        />
        <Form.Check
          type="radio"
          data-testid="name-search-radio"
          label="Nome"
          value="Nome-Usuário"
          onClick={ ({ target }) => console.log('nome') || handleRadio(target) }
          name="grup-1"
        />
        <Form.Check
          type="radio"
          data-testid="first-letter-search-radio"
          label="Primeira letra"
          name="grup-1"
          value="Primeira-Letra"
          onClick={ ({ target }) => console.log('primeira-letra') || handleRadio(target) }
        />
        <Button data-testid="exec-search-btn">Search</Button>
      </Form.Group>
    </Form>
  );
}
