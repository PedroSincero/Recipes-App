import React, { useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeaderWithButton from '../../components/HeaderWithButton';
import Menu from '../../components/Menu';
import AppContext from '../../context/AppContext';

export default function RecipesPrincipal() {
  const location = useLocation();
  const { setFoodEndPoint,
    setDrinkEndpoint,
    foodsAPI, drinksAPI, category, categoryDrink, foodEndpoint } = useContext(AppContext);

  useEffect(() => {
    if (location.pathname === '/bebidas') {
      setDrinkEndpoint('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
    if (location.pathname === '/comidas') {
      setFoodEndPoint('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [location, setDrinkEndpoint, setFoodEndPoint]);

  const filterCategory = (param) => {
    const map = param.map(({ strCategory }, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => (location.pathname === '/comidas' ? setFoodEndPoint(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`) : setDrinkEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`)) }
      >
        { strCategory }
      </button>
    ));
    console.log(foodEndpoint);
    return map;
  };
  const nameTitle = () => {
    if (location.pathname === '/bebidas') {
      return (
        <>
          <HeaderWithButton title="Bebidas" />
          {categoryDrink && filterCategory(categoryDrink)}
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
          {foodsAPI && foodsAPI.map((info, index) => (
            <Link to={ `comidas/${info.idMeal}` } key={ index }>
              <li key={ index } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{info.strMeal}</p>
                <img
                  src={ info.strMealThumb }
                  alt={ info.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </li>
            </Link>
          ))}
        </>
      );
    }
  };
  // console.log(drinksAPI);
  return (
    <>
      <h1>Tela principal de receitas</h1>
      {nameTitle()}
      <Menu />
    </>
  );
}
