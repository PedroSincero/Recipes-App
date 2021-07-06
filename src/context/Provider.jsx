import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [foodsAPI, setfoodsAPI] = useState('');
  const [drinksAPI, setDrinksAPI] = useState('');
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [foodEndpoint, setFoodEndPoint] = useState('');
  const [drinkEndpoint, setDrinkEndpoint] = useState('');
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState([]);
  const [idFood, setIdFood] = useState('');
  const [idDrinks, setIdDrinks] = useState('');
  const [category, setCategories] = useState();
  const [categoryDrink, setCategoriesDrink] = useState();
  useEffect(() => {
    const getFood = async (endpoints) => {
      const limit = 12;
      const { meals } = await fetch(endpoints).then((response) => response.json());
      if (meals === null) {
        return (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        );
      }
      if (meals.length <= 1) {
        setIdFood(meals[0].idMeal);
      }
      const result = meals.slice(0, limit);
      setfoodsAPI(result);
    };
    getFood(foodEndpoint);
  }, [foodEndpoint]);

  useEffect(() => {
    const getDrink = async (endpoints) => {
      const limit = 12;
      const { drinks } = await fetch(endpoints).then((response) => response.json());
      if (drinks === null) {
        return (
          global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
        );
      }
      if (drinks.length <= 1) {
        setIdDrinks(drinks[0].idDrink);
      }
      const result = drinks.slice(0, limit);
      setDrinksAPI(result);
    };
    getDrink(drinkEndpoint);
  }, [drinkEndpoint]);

  const getCategories = async () => {
    const limit = 5;
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((r) => r.json());
    const result = meals.meals.slice(0, limit);
    setCategories(result);
  };
  const getCategoriesDrink = async () => {
    const limit = 5;
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((r) => r.json());
    const result = drinks.slice(0, limit);
    setCategoriesDrink(result);
  };
  useEffect(() => {
    getCategories();
    getCategoriesDrink();
  }, []);

  const handleFood = async () => {
    if (search === '') {
      return (
        global.alert('por favor, digite alguma coisa na busca')
      );
    }
    if (radio === 'firstLetter' && search.length > 1) {
      return (
        global.alert('Sua busca deve conter somente 1 (um) caracter')
      );
    }
    if (radio === 'ingredient') {
      setFoodEndPoint(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    }
    if (radio === 'name') {
      setFoodEndPoint(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    }
    if (radio === 'firstLetter' && search.length <= 1) {
      setFoodEndPoint(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    }
  };

  const handleDrink = async () => {
    if (search === '') {
      return (
        global.alert('por favor, digite alguma coisa na busca')
      );
    }
    if (radio === 'firstLetter' && search.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (radio === 'ingredient') {
      setDrinkEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
    }
    if (radio === 'name') {
      setDrinkEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    }
    if (radio === 'firstLetter' && search.length <= 1) {
      setDrinkEndpoint(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
    }
  };

  const contextValue = {
    search,
    setSearch,
    radio,
    setRadio,
    handleFood,
    handleDrink,
    foodsAPI,
    drinksAPI,
    email,
    setEmail,
    password,
    setPassword,
    user,
    setUser,
    idFood,
    idDrinks,
    setFoodEndPoint,
    setDrinkEndpoint,
    category,
    categoryDrink,
  };

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
