import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';

export default function RecipesDetails({ match: { params: { id } } }) {
  const location = useLocation();
  const { setDetailsRecipe } = useContext(AppContext);
  useEffect(() => {
    if (location.pathname === `/bebidas/${id}`) {
      const getDetails = async (detailID) => {
        const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${detailID}`).then((r) => r.json());
        setDetailsRecipe(result);
      };
      getDetails(id);
    }
    if (location.pathname === `/comidas/${id}`) {
      const getDetails = async (detailID) => {
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailID}`).then((r) => r.json());
        setDetailsRecipe(result);
      };
      getDetails(id);
    }
  }, [id, location, setDetailsRecipe]);
  return (
    <div>
      <h1>Tela de detalhes de uma receitaa</h1>
      <div>
        <h1 data-testid="recipe-title">{}</h1>
        <img src="" alt="" data-testid="recipe-photo" />
        <button type="button" data-testid="share-btn">compartilhar</button>
        <button type="button" data-testid="favorite-btn">favoritar</button>
        <button type="button" data-testid="recipe-category">categoria</button>
        {/* {ingredientes.map((info, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>{info}</li>
        ))} */}
        <p data-testid="instructions"> Instruções</p>
        {/* {recomendados.map((info, index) => (
          <img key={ index } src="" alt="" data-testid={ `${index}-recomendation-card` } />
        ))} */}
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
