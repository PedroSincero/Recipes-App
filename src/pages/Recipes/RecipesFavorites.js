import React, { useEffect, useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import Header from '../../components/Header';
import FavoriteRecipesCard from '../../components/FavoriteRecipesCard';

export default function RecipesFavorites() {
  const { favoriteRecipesList, setFavoriteRecipesList } = useContext(AppContext);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ]));
    async function filterRecipes(filterParam) {
      const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filteredRecipes = favoriteRecipes
        .filter((element) => element.type === filterParam);
      setFavoriteRecipesList(filteredRecipes);
    }

    async function getFavoriteRecipes() {
      const favoriteRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (filterType === 'food') return filterRecipes('comida');
      if (filterType === 'drinks') return filterRecipes('bebida');
      setFavoriteRecipesList(favoriteRecipes);
    }
    getFavoriteRecipes();
  }, [setFavoriteRecipesList, filterType]);

  function handleFilter(filterParam) {
    setFilterType(filterParam);
  }

  return (
    <>
      <Header title="Receitas Favoritas" />
      <main>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          value="all"
          onClick={ () => handleFilter('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          value="food"
          onClick={ () => handleFilter('food') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          value="drinks"
          onClick={ () => handleFilter('drinks') }
        >
          Drinks
        </button>
        {
          favoriteRecipesList !== null || undefined
            ? favoriteRecipesList.map(
              (recipe, index) => (
                <FavoriteRecipesCard
                  key={ recipe.id }
                  recipe={ recipe }
                  index={ index }
                />
              ),
            )
            : ''
        }
      </main>
    </>
  );
}
