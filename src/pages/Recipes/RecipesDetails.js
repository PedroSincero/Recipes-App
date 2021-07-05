import React from 'react';

export default function RecipesDetails() {
  return (
    <div>
      <h1>Tela de detalhes de uma receita</h1>
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
