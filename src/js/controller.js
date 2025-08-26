
  import icons from 'url:../img/icons.svg';
  import * as model from './model.js';
  import 'core-js/stable';
  import 'regenerator-runtime/runtime';


  console.log(icons);
  // import { async } from 'regenerator-runtime';
  // import { async } from 'regenerator-runtime/runtime';
  // import { Fraction } from 'fractional';

  const recipeContainer = document.querySelector('.recipe');
  // const recipeContainer = document.querySelector('.recipe-container'); // Definisikan container (sesuaikan selector sesuai kebutuhan)

  const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  // https://forkify-api.herokuapp.com/v2

  ///////////////////////////////////////

  const renderSpinner = function (parentEl) {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
  };





  const showRecipe = async function () {
    try {

      const id = window.location.hash.slice(1);
    if (!id) return;

    renderSpinner(recipeContainer);

    await model.loadRecipe(id); 
    const { recipe: formattedRecipe } = model.state;
    


      const markup = `
        <figure class="recipe__fig">
          <img src="${formattedRecipe.image}" alt="${formattedRecipe.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${formattedRecipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${formattedRecipe.cookingTime}</span>
            <span class="recipe__info-text">menit</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${formattedRecipe.servings}</span>
            <span class="recipe__info-text">porsi</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Bahan-bahan Resep</h2>
          <ul class="recipe__ingredient-list">
            ${formattedRecipe.ingredients
              .map(ing => {
                return `
                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__data-ingredient">
                      ${ing.quantity ? ing.quantity : ''} ${ing.unit || ''} ${ing.description}
                    </div>
                  </li>
                `;
              })
              .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">Cara Memasak</h2>
          <p class="recipe__directions-text">
            Resep ini dirancang dan diuji dengan cermat oleh
            <span class="recipe__publisher">${formattedRecipe.publisher}</span>. Silakan lihat
            petunjuk di situs web mereka.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${formattedRecipe.sourceUrl}"
            target="_blank"
          >
            <span>Petunjuk</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      `;

      if (!recipeContainer) throw new Error('recipeContainer tidak didefinisikan');
      recipeContainer.innerHTML = '';
      recipeContainer.insertAdjacentHTML('afterbegin', markup);

    } catch (err) {
      console.error('Error saat mengambil atau menampilkan resep:', err);
      alert(`Error: ${err.message}`);
    }
  };

  showRecipe();


