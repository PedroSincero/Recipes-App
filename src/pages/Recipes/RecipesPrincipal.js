import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderWithButton from '../../components/HeaderWithButton';
import Menu from '../../components/Menu';
import AppContext from '../../context/AppContext';

export default function RecipesPrincipal() {
  const location = useLocation();
  const { setFoodEndPoint,
    setDrinkEndpoint,
    foodsAPI, drinksAPI, category, categoryDrink } = useContext(AppContext);
  const filterCategory = (param) => {
    const map = param.map(({ strCategory }, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `${strCategory}-category-filter` }
      >
        { strCategory }
      </button>
    ));
    return map;
  };
  const nameTitle = () => {
    if (location.pathname === '/bebidas') {
      setDrinkEndpoint('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      return (
        <>
          <HeaderWithButton title="Bebidas" />
          {categoryDrink && filterCategory(categoryDrink)}
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
        </>
      );
    }
    if (location.pathname === '/comidas') {
      setFoodEndPoint('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      console.log(category);
      return (
        <>
          <HeaderWithButton title="Comidas" />
          {category && filterCategory(category)}
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
        </>
      );
    }
  };

  return (
    <>
      <h1>Tela principal de receitas</h1>
      {nameTitle()}
      <Menu />
    </>
  );
}
