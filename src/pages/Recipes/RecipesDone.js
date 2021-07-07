import React, { useEffect, useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import Header from '../../components/Header';
import DoneRecipesCard from '../../components/DoneRecipesCard';

export default function RecipesDone() {
  const { doneRecipesList, setDoneRecipesList } = useContext(AppContext);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    async function filterRecipes(filterParam) {
      const doneRecipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      const filteredRecipes = doneRecipes
        .filter((element) => element.type === filterParam);
      setDoneRecipesList(filteredRecipes);
    }

    async function getDoneRecipes() {
      const doneRecipes = await JSON.parse(localStorage.getItem('doneRecipes'));
      if (filterType === 'food') return filterRecipes('comida');
      if (filterType === 'drinks') return filterRecipes('bebida');
      setDoneRecipesList(doneRecipes);
    }
    getDoneRecipes();
  }, [setDoneRecipesList, filterType]);

  function handleFilter(filterParam) {
    setFilterType(filterParam);
  }

  return (
    <>
      <Header title="Receitas Feitas" />
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
          doneRecipesList !== null || undefined
            ? doneRecipesList.map(
              (recipe, index) => (
                <DoneRecipesCard key={ recipe.id } recipe={ recipe } index={ index } />
              ),
            )
            : ''
        }
      </main>
    </>
  );
}
