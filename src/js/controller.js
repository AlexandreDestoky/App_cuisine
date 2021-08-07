import "regenerator-runtime/runtime";
import "core-js/stable";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import { async } from "regenerator-runtime/runtime";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // maj el selectionné
    resultsView.update(model.getSearchResultsPage());
    //charge la recette
    await model.loadRecipe(id);
    //affiche recette
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1.Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2.Load search results
    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    //3.Render Results
    resultsView.render(model.getSearchResultsPage());

    // 4.Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  

};

init();
//Explication suite du projet (BookMark, localStorage etc)
