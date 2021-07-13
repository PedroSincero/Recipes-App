import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import AppContext from '../../context/AppContext';
import shareIcon from '../../images/shareIcon.svg';

export default function RecipesProgress({ match: { params: { id } } }) {
  const history = useHistory();
  const location = useLocation();
  const pathnameBebidas = location.pathname === `/bebidas/${id}/in-progress`;
  const {
    detailsRecipe,
    setDetailsRecipe, setFoodEndPoint, setDrinkEndpoint } = useContext(AppContext);
  const [copied, setCopied] = useState(false);
  const FOUR_SECONDS = 4000;

  useEffect(() => {
    if (location.pathname === `/bebidas/${id}/in-progress`) {
      const getDetails = async (detailID) => {
        const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailID}`).then((r) => r.json());
        setDetailsRecipe(drinks);
      };
      getDetails(id);
      setFoodEndPoint('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    if (location.pathname === `/comidas/${id}/in-progress`) {
      const getDetails = async (detailID) => {
        const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailID}`).then((r) => r.json());
        setDetailsRecipe(meals);
      };
      getDetails(id);
      setDrinkEndpoint('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [id, location, setDetailsRecipe, setFoodEndPoint, setDrinkEndpoint]);

  const drinkDetails = () => {
    const NUMBER_THREE = 3;
    const NUMBER_EIGHT = 8;
    const limit = pathnameBebidas ? NUMBER_THREE : NUMBER_EIGHT;
    const result = [];
    for (let index = 1; index <= limit; index += 1) {
      const ingredient = detailsRecipe[0][`strIngredient${index}`];
      const measure = detailsRecipe[0][`strMeasure${index}`];
      if (ingredient !== null) {
        const func = () => (measure === null ? result.push(ingredient)
          : result.push(`${ingredient} - ${measure}`));
        func();
      }
    }
    const { strDrink,
      strMeal,
      strDrinkThumb, strCategory, strMealThumb, strInstructions } = detailsRecipe[0];

    return (
      <>
        <h1 data-testid="recipe-title">{pathnameBebidas ? strDrink : strMeal}</h1>
        <p data-testid="recipe-category">
          {pathnameBebidas ? `${strCategory} Alcoholic` : strCategory}
        </p>
        <img
          src={ pathnameBebidas ? strDrinkThumb : strMealThumb }
          alt="Thumbnail"
          data-testid="recipe-photo"
        />
        <p data-testid="instructions">{strInstructions}</p>
        <iframe src="https://youtu.be/7atZfX85nd4" data-testid="video" title=" video teste" />
        {result.map((info, index) => (
          <div key={ index }>
            <label htmlFor={ info } data-testid={ `${index}-ingredient-step` }>
              {info}
              <input
                type="checkbox"
                name={ info }
              />
            </label>
            <br />
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <h1>Tela de receita em progresso</h1>
      {detailsRecipe && drinkDetails()}
      <CopyToClipboard
        text={ `http://localhost:3000${location.pathname}` }
        onCopy={ () => {
          setCopied(true);
          setTimeout(() => setCopied(''), FOUR_SECONDS);
        } }
      >
        <button
          data-testid="share-btn"
          type="button"
          src={ shareIcon }
        >
          <input
            type="image"
            src={ shareIcon }
            alt="share"
          />
        </button>
      </CopyToClipboard>
      {
        copied && <span style={ { color: 'red' } }>Link copiado!</span>
      }
      <button type="button" data-testid="favorite-btn">favoritar</button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar receita
      </button>
    </>
  );
}

RecipesProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
