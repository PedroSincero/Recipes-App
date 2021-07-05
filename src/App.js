import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './pages/User/Login';
import Perfil from './pages/User/Perfil';

import RecipesDetails from './pages/Recipes/RecipesDetails';
import RecipesDone from './pages/Recipes/RecipesDone';
import RecipesFavorites from './pages/Recipes/RecipesFavorites';
import RecipesPrincipal from './pages/Recipes/RecipesPrincipal';
import RecipesProgress from './pages/Recipes/RecipesProgress';

import Explore from './pages/Explore/Explore';
import ExploreArea from './pages/Explore/ExploreArea';
import ExploreDrinksFood from './pages/Explore/ExploreDrinksFood';
import ExploreIngredients from './pages/Explore/ExploreIngredients';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/perfil" component={ Perfil } />

      <Route exact path="/comidas" component={ RecipesPrincipal } />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <RecipesDetails { ...props } /> }
      />
      <Route exact path="/comidas/:id/in-progress" component={ RecipesProgress } />

      <Route exact path="/bebidas" component={ RecipesPrincipal } />
      <Route exact path="/bebidas/:id" component={ RecipesDetails } />
      <Route exact path="/bebidas/:id/in-progress" component={ RecipesProgress } />

      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreDrinksFood } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreArea } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinksFood } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreIngredients }
      />

      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ RecipesFavorites } />
    </Switch>
  );
}

export default App;
