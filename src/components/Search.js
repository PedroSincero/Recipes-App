import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import AlertDismissible from './Alert';

export default function Search() {
  const { setSearch, setRadio, handleButton, onAlert } = useContext(AppContext);

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
        <Button
          data-testid="exec-search-btn"
          onClick={ () => handleButton() }
        >
          Search
        </Button>
      </Form.Group>
      {!onAlert === true ? null : (<AlertDismissible />)}
    </Form>
  );
}
