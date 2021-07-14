import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import CopyToClipboard from 'react-copy-to-clipboard';
import shareIcon from '../../images/shareIcon.svg';
import AppContext from '../../context/AppContext';
import '../../styles/RecipesDetails.css';

export default function RecipesDetails({ match: { params: { id } } }) {
  const location = useLocation();
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const FOUR_SECONDS = 4000;
  const { setDetailsRecipe,
    detailsRecipe,
    setDrinkEndpoint,
    foodsAPI, setFoodEndPoint, drinksAPI } = useContext(AppContext);
  const NUMBER_SIX = 6;
  const pathnameBebidas = location.pathname === `/bebidas/${id}`;
  const pathnameComidas = location.pathname === `/comidas/${id}`;
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
  const carrosel = () => {
    if (pathnameBebidas) {
      return (
        <Carousel fade>
          {foodsAPI && foodsAPI.slice(0, NUMBER_SIX).map((info, index) => (
            <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
              <Carousel.Caption>
                <p data-testid={ `${index}-recomendation-title` }>
                  { info.strMeal }
                </p>
              </Carousel.Caption>
              <img
                className="recommendation"
                src={ info.strMealThumb }
                alt="Thumbnail"
              />
              <img
                className="recommendation"
                src={ info.strMealThumb }
                alt="Thumbnail"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }
    if (pathnameComidas) {
      return (
        <Carousel fade>
          {drinksAPI && drinksAPI.slice(0, NUMBER_SIX).map((info, index) => (
            <Carousel.Item key={ index } data-testid={ `${index}-recomendation-card` }>
              <Carousel.Caption>
                <p data-testid={ `${index}-recomendation-title` }>
                  { info.strDrink }
                </p>
              </Carousel.Caption>
              <img
                className="recommendation"
                src={ info.strDrinkThumb }
                alt="Thumbnail"
              />
              <img
                className="recommendation"
                src={ info.strDrinkThumb }
                alt="Thumbnail"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      );
    }
  };
  const drinkDetails = () => {
    const limit = 15;
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
        <p className="alcholic" data-testid="recipe-category">
          {pathnameBebidas ? `${strCategory} Alcoholic` : strCategory}
        </p>
        <img
          className="drink"
          src={ pathnameBebidas ? strDrinkThumb : strMealThumb }
          alt="Thumbnail"
          data-testid="recipe-photo"
        />
        <p className="instructions" data-testid="instructions">{strInstructions}</p>
        <iframe src="https://youtu.be/7atZfX85nd4" data-testid="video" title=" video teste" />
        {result.map((info, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {info}
          </li>
        ))}
        {carrosel()}
      </>
    );
  };

  return (
    <div>
      <div>
        {detailsRecipe && drinkDetails()}
        {/* <button type="button" data-testid="share-btn">compartilhar</button> */}
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
        <button type="button" data-testid="recipe-category">categoria</button>
        <p data-testid="instructions"> Instruções</p>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-start"
          onClick={ () => (location.pathname === `/bebidas/${id}`
            ? history.push(`/bebidas/${id}/in-progress`)
            : history.push(`/comidas/${id}/in-progress`)) }
        >
          Iniciar Receita
        </button>
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
