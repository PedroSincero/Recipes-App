import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import HeaderWithButton from '../../components/HeaderWithButton';
import Menu from '../../components/Menu';

import '../../styles/ExploreArea.css';

const MAX_RECIPES = 12;

export default function ExploreArea() {
  const history = useHistory();
  const location = useLocation();
  const [areaEndPoint, setAreaEndPoint] = useState([]);
  const [area, setArea] = useState('');
  const [resultsList, setResultsList] = useState([]);

  useEffect(() => {
    const getAreaFood = async () => {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then((r) => r.json());
      setAreaEndPoint(meals);
    };
    getAreaFood();
  }, [location.pathname]);

  useEffect(() => {
    const getResults = async (areaName) => {
      if (areaName) {
        const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`).then((r) => r.json());
        setResultsList(meals);
      }
      if (!areaName) {
        const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((r) => r.json());
        setResultsList(meals);
      }
    };
    getResults(area);
  }, [area]);

  function handleChange({ target: { value } }) {
    if (value === 'All') return setArea('');
    setArea(value);
  }

  return (
    <>
      <h1>Tela de explorar por local de origem/area</h1>
      <HeaderWithButton title="Explorar Origem" />
      <select data-testid="explore-by-area-dropdown" onChange={ (e) => handleChange(e) }>
        <option
          key="All"
          data-testid="All-option"
        >
          All
        </option>
        {
          areaEndPoint.map(({ strArea }) => (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>))
        }
      </select>
      {
        resultsList.map((recipe, index) => {
          if (index < MAX_RECIPES) {
            return (
              <button
                type="button"
                data-testid={ `${index}-recipe-card` }
                onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
              >
                <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
                <img
                  className="recipe-img"
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                />
              </button>);
          }
          return '';
        })
      }
      <Menu />
    </>
  );
}
