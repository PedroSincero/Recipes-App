import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, Row, Card, Col } from 'react-bootstrap';
import HeaderWithButton from '../../components/HeaderWithButton';
import Menu from '../../components/Menu';
import AppContext from '../../context/AppContext';
import '../../styles/RecipesPrincipal.css';

export default function RecipesPrincipal() {
  const location = useLocation();
  const { setFoodEndPoint,
    setDrinkEndpoint,
    foodsAPI, drinksAPI, category, categoryDrink } = useContext(AppContext);
  const [status, setStatus] = useState('');
  const endpointDrinkAll = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const endpointFoodAll = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  useEffect(() => {
    if (location.pathname === '/bebidas') {
      setDrinkEndpoint(endpointDrinkAll);
    }
    if (location.pathname === '/comidas') {
      setFoodEndPoint(endpointFoodAll);
    }
  }, [location, setDrinkEndpoint, setFoodEndPoint]);

  const toggle = (strCategory) => {
    if (!status || status !== strCategory) {
      if (location.pathname === '/comidas') {
        setFoodEndPoint(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`);
      }
      if (location.pathname === '/bebidas') {
        setDrinkEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`);
      }
      setStatus(strCategory);
    }
    if (status === strCategory) {
      if (location.pathname === '/comidas') {
        setFoodEndPoint(endpointFoodAll);
      }
      if (location.pathname === '/bebidas') {
        setDrinkEndpoint(endpointDrinkAll);
      }
      setStatus('');
    }
  };

  const filterCategory = (param) => {
    const map = param.map(({ strCategory }, index) => (
      <Button
        size="sm"
        variant="outline-secondary"
        key={ index }
        type="button"
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => toggle(strCategory) }
      >
        { strCategory }
      </Button>
    ));
    return map;
  };
  const nameTitle = () => {
    if (location.pathname === '/bebidas') {
      return (
        <>
          <HeaderWithButton title="Bebidas" />
          {categoryDrink && filterCategory(categoryDrink)}
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => setDrinkEndpoint(endpointDrinkAll) }
          >
            All
          </button>
          {drinksAPI && drinksAPI.map((info, index) => (
            <Link to={ `bebidas/${info.idDrink}` } key={ index }>
              <li data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{info.strDrink}</p>
                <img
                  src={ info.strDrinkThumb }
                  alt={ info.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </li>
            </Link>
          ))}
        </>
      );
    }
    if (location.pathname === '/comidas') {
      return (
        <>
          <HeaderWithButton title="Comidas" />
          {category && filterCategory(category)}
          <Button variant="outline-secondary" size="sm" type="button" data-testid="All-category-filter" onClick={ () => setFoodEndPoint('https://www.themealdb.com/api/json/v1/1/search.php?s=') }>All</Button>
          {/* https://react-bootstrap.netlify.app/components/cards/ */}
          <Row xs={ 1 } md={ 2 } className="g-4">
            {foodsAPI && foodsAPI.map((info, index) => (
              <Col className="flex-sm-wrap-reverse" key={ index }>

                <Card
                  className="card text-white bg-primary mb-3"
                  style={ { width: '18rem' } }
                >

                  <Card.Title>Card title</Card.Title>
                  <Link to={ `comidas/${info.idMeal}` }>
                    <li data-testid={ `${index}-recipe-card` }>
                      <img
                        src={ info.strMealThumb }
                        { ...'100px180' }
                        alt={ info.strMeal }
                        data-testid={ `${index}-card-img` }
                      />
                      <p data-testid={ `${index}-card-name` }>{info.strMeal}</p>
                    </li>
                  </Link>

                </Card>

              </Col>

            ))}
          </Row>
        </>
      );
    }
  };
  return (
    <>
      {nameTitle()}
      <Menu />
    </>
  );
}
