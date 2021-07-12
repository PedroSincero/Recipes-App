import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import CopyToClipboard from 'react-copy-to-clipboard';
import shareIcon from '../../images/shareIcon.svg';
import AppContext from '../../context/AppContext';
import '../../styles/RecipesDetails.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const carrosel = (pathnameBebidas, foodsAPI, pathnameComidas, drinksAPI) => {
  const NUMBER_SIX = 6;
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

const drinkDetails = (pathnameBebidas, detailsRecipe) => {
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
      <p data-testid="recipe-category">
        {pathnameBebidas ? `${strCategory} Alcoholic` : strCategory}
      </p>
      <img
        src={ pathnameBebidas ? strDrinkThumb : strMealThumb }
        alt="Thumbnail"
        data-testid="recipe-photo"
        className="image-details"
      />
      <p data-testid="instructions">{strInstructions}</p>
      <iframe src="https://youtu.be/7atZfX85nd4" data-testid="video" title=" video teste" />
      {result.map((info, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {info}
        </li>
      ))}
    </>
  );
};

const checkDoneRecipes = async (detailID, setHaveButton) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const haveDone = doneRecipes.some((recipe) => recipe.id === detailID);
  if (haveDone) {
    return setHaveButton(false);
  }
  setHaveButton(true);
};
const shareFavorites = async (favoriteID, setStatus) => {
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const someFavorite = favorite.some((info) => info.id === favoriteID);
  if (someFavorite) {
    return setStatus(true);
  }
  setStatus(false);
};
const clickFavorite = ({ status, setStatus, id }, detailsRecipe, pathName) => {
  const { idMeal,
    idDrink,
    strArea,
    strCategory,
    strDrink, strMeal, strAlcoholic, strDrinkThumb, strMealThumb } = detailsRecipe[0];
  const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (status === true) {
    setStatus(false);
    const removeFavorite = favorite.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
  } else {
    const newFavorite = [...favorite, {
      id: pathName ? idDrink : idMeal,
      type: pathName ? 'bebida' : 'comida',
      area: pathName ? '' : strArea,
      category: strCategory,
      alcoholicOrNot: pathName ? strAlcoholic : '',
      name: pathName ? strDrink : strMeal,
      image: pathName ? strDrinkThumb : strMealThumb,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setStatus(true);
  }
};
export default function RecipesDetails({ match: { params: { id } } }) {
  const location = useLocation();
  const history = useHistory();
  const pathnameBebidas = location.pathname === `/bebidas/${id}`;
  const pathnameComidas = location.pathname === `/comidas/${id}`;
  const [copied, setCopied] = useState(false);
  const [haveButton, setHaveButton] = useState(true);
  const [status, setStatus] = useState();
  const FOUR_SECONDS = 4000;
  const { setDetailsRecipe,
    detailsRecipe,
    setDrinkEndpoint,
    foodsAPI, setFoodEndPoint, drinksAPI } = useContext(AppContext);
  useEffect(() => {
    checkDoneRecipes(id, setHaveButton);
    shareFavorites(id, setStatus);
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

  return (
    <div>
      <h1>Tela de detalhes de uma receita</h1>
      <div>
        {detailsRecipe && drinkDetails(pathnameBebidas, detailsRecipe)}
        {carrosel(pathnameBebidas, foodsAPI, pathnameComidas, drinksAPI)}
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
        <input
          data-testid="favorite-btn"
          type="image"
          src={ status ? blackHeartIcon : whiteHeartIcon } // shareFavorite(id)
          alt="favorite"// clickFavorite
          onClick={ () => clickFavorite({ status, setStatus, id },
            detailsRecipe, pathnameBebidas) }
        />
        <button type="button" data-testid="recipe-category">categoria</button>
        <p data-testid="instructions"> Instruções</p>
        {
          haveButton
            ? (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btn-start"
                onClick={ () => (location.pathname === `/bebidas/${id}`
                  ? history.push(`/bebidas/${id}/in-progress`)
                  : history.push(`/comidas/${id}/in-progress`)) }
              >
                Iniciar Receita
              </button>)
            : ''
        }
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
