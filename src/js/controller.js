import 'regenerator-runtime/runtime';
import "core-js/stable";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2
//Explication modèle MVC

        

///////////////////////////////////////


const showRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;

    recipeView.renderSpinner();
    //charge la recette
    await model.loadRecipe(id);
    //affiche recette
    recipeView.render(model.state.recipe)
   
  } catch(err) {
    alert(err);
  }
}

showRecipe();

["hashchange","load"].forEach(el => window.addEventListener(el,showRecipe))

