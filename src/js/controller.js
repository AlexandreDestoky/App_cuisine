import 'regenerator-runtime/runtime';
import "core-js/stable";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from './views/searchView.js';
import { async } from 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;

    recipeView.renderSpinner();
    //charge la recette
    await model.loadRecipe(id);
    //affiche recette
    recipeView.render(model.state.recipe)

  } catch(err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {
    //Get search query
    const query = searchView.getQuery();
    if(!query) return;
    
    resultsView.renderSpinner();
    //Load search results
    await model.loadSearchResults(query);
    
    // Render Results
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(2));

  } catch (err) {
    console.log(err);
  }
}
controlSearchResults()

const init = function() {
  recipeView.addHandleRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();
