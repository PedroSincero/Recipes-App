import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Search() {
  return (
    <Form>
      <Form.Group data-testid="search-top-btn">
        <Form.Control type="text" data-testid="search-input" />
        <Form.Check type="radio" data-testid="ingredient-search-radio" />
        <Form.Check type="radio" data-testid="name-search-radio" />
        <Form.Check type="radio" data-testid="first-letter-search-radio" />
        <Button data-testid="exec-search-btn">Search</Button>
      </Form.Group>
    </Form>
  );
}
