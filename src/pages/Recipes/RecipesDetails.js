import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function RecipesDetails({ match: { params: { id } } }) {
  const location = useLocation();
  const { setDetailsRecipe,
    detailsRecipe,
    setDrinkEndpoint,
    foodsAPI, setFoodEndPoint } = useContext(AppContext);

  useEffect(() => {
    if (location.pathname === `/bebidas/${id}`) {
      const getDetails = async (detailID) => {
        const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailID}`).then((r) => r.json());
        setDetailsRecipe(drinks);
      };
      getDetails(id);
      setFoodEndPoint('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    if (location.pathname === `/comidas/${id}`) {
      const getDetails = async (detailID) => {
        const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailID}`).then((r) => r.json());
        setDetailsRecipe(meals);
      };
      getDetails(id);
      setDrinkEndpoint('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [id, location, setDetailsRecipe, setFoodEndPoint, setDrinkEndpoint]);

  const drinkDetails = () => {
    // console.log('detailsRecipe[0]', detailsRecipe[0]);
    console.log('foodsAPI', foodsAPI);
    const limit = 15;
    const result = [];
    const NUMBER_SIX = 6;
    for (let index = 1; index <= limit; index += 1) {
      const ingredient = detailsRecipe[0][`strIngredient${index}`];
      const measure = detailsRecipe[0][`strMeasure${index}`];
      if (ingredient !== null) {
        const func = () => (measure === null ? result.push(ingredient)
          : result.push(`${ingredient} - ${measure}`));
        func();
      }
      // console.log(detailsRecipe[0][`strIngredient${index}`], detailsRecipe[0][`strMeasure${index}`]);
    }
    return (
      <>
        <h1 data-testid="recipe-title">{detailsRecipe[0].strDrink}</h1>
        <p data-testid="recipe-category">{detailsRecipe[0].strCategory}</p>
        <img
          src={ detailsRecipe[0].strDrinkThumb }
          alt={ detailsRecipe[0].strDrink }
          data-testid="recipe-photo"
        />
        <p data-testid="instructions">{detailsRecipe[0].strInstructions}</p>
        <iframe src="https://youtu.be/7atZfX85nd4" data-testid="video" title=" video teste" />
        {result.map((info, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {info}
          </li>
        ))}
        {foodsAPI && foodsAPI.slice(0, NUMBER_SIX).map((info, index) => (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <img
              src={ location.pathname === `/bebidas/${id}`
                ? info.strMealThumb : info.strDrinkThumb }
              alt="Thumbnail"
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <h1>Tela de detalhes de uma receitaa</h1>
      <div>
        {detailsRecipe && drinkDetails()}
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favoritar</button>
        <button type="button" data-testid="recipe-category">categoria</button>
        <p data-testid="instructions"> Instruções</p>
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>
    </div>
  );
}

RecipesDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
