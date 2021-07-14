import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

const MAX_INGREDIENTS = 12;

export default function ExploreIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('comidas')) {
      const getIngredients = async () => {
        const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list').then((r) => r.json());
        setIngredientsList(meals);
      };
      getIngredients();
    }
    if (location.pathname.includes('bebidas')) {
      const getIngredients = async () => {
        const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').then((r) => r.json());
        setIngredientsList(drinks);
      };
      getIngredients();
    }
  }, [location.pathname]);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      { ingredientsList.map((ingredient, index) => {
        if (index < MAX_INGREDIENTS) {
          if (location.pathname.includes('bebidas')) {
            return (
              <div data-testid={ `${index}-ingredient-card` }>
                <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient1}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                  alt={ `ingredient name: ${ingredient.strIngredient1}` }
                />
              </div>
            );
          }
          return (
            <div data-testid={ `${index}-ingredient-card` }>
              <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt={ `ingredient name: ${ingredient.strIngredient}` }
              />
            </div>
          );
        }
        return '';
      })}
      <Menu />
    </>
  );
}
