const recipeContainer = document.querySelector('.recipe');
// const recipeContainer = document.querySelector('.recipe-container'); // Definisikan container (sesuaikan selector sesuai kebutuhan)
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
// console.log('Hello from controller.js :)');
const showRecipe = async function() {
    try {
        const res = await fetch('https://forkify-api.herokuapp.com/api/search?q=pizza');
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message || 'Gagal mengambil resep'} (${res.status})`);
        console.log(res, data);
        const recipe = data.recipes[0];
        if (!recipe) throw new Error('Tidak ada resep yang ditemukan untuk kueri ini');
        // Transformasi data resep ke struktur yang diharapkan
        const formattedRecipe = {
            id: recipe.recipe_id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings || 4,
            cookingTime: recipe.cooking_time || 30,
            ingredients: recipe.ingredients || []
        };
        console.log(formattedRecipe);
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
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${formattedRecipe.cookingTime}</span>
          <span class="recipe__info-text">menit</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${formattedRecipe.servings}</span>
          <span class="recipe__info-text">porsi</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Bahan-bahan Resep</h2>
        <ul class="recipe__ingredient-list">
          ${formattedRecipe.ingredients.map((ing)=>{
            return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="src/img/icons.svg#icon-check"></use>
                  </svg>
                  <div class="recipe__data-ingredient">
                    ${ing.quantity ? ing.quantity : ''} ${ing.unit || ''} ${ing.description}
                  </div>
                </li>
              `;
        }).join('')}
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
            <use href="src/img/icons.svg#icon-arrow-right"></use>
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

//# sourceMappingURL=18. Forkify.62406edb.js.map
