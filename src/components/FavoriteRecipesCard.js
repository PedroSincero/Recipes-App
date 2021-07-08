import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import './CSS/favoriteRecipesCard.css';

export default function FavoriteRecipesCard({ recipe, index }) {
  const history = useHistory();
  const [copied, setCopied] = useState(false);
  const FOUR_SECONDS = 4000;

  return (
    <section>
      {
        recipe.type === 'comida'
          ? (
            <section>
              <button
                type="button"
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              >
                <p data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </p>
              </button>
              <input
                className="card-image"
                type="image"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ `Recipe: ${recipe.name}` }
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.area} - ${recipe.category}`}
              </p>
              <CopyToClipboard
                text={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
                onCopy={ () => {
                  setCopied(index);
                  setTimeout(() => setCopied(''), FOUR_SECONDS);
                } }
              >
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
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
              <input
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="image"
                src={ blackHeartIcon }
                alt="unfavorite"
                onClick={ () => console.log('desfavoritou') }
              />
              {
                copied === index
                  ? <span style={ { color: 'red' } }>Link copiado!</span>
                  : null
              }
            </section>
          )
          : (
            <section>
              <button
                type="button"
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              >
                <p data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </p>
              </button>
              <input
                className="card-image"
                type="image"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ `Recipe: ${recipe.name}` }
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`Alcoholic: ${recipe.alcoholicOrNot}`}
              </p>
              <CopyToClipboard
                text={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
                onCopy={ () => {
                  setCopied(index);
                  setTimeout(() => setCopied(''), FOUR_SECONDS);
                } }
              >
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
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
              <input
                data-testid={ `${index}-horizontal-favorite-btn` }
                type="image"
                src={ blackHeartIcon }
                alt="unfavorite"
                onClick={ () => console.log('desfavoritou') }
              />
              {
                copied === index
                  ? <span style={ { color: 'red' } }>Link copiado!</span>
                  : null
              }
            </section>
          )
      }
    </section>
  );
}

FavoriteRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.shape({
      map: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.string.isRequired,
};
