import"regenerator-runtime/runtime";import"regenerator-runtime";import e from"fraction.js";function t(e){return e&&e.__esModule?e.default:e}var r,i=globalThis,a={},s={},n=i.parcelRequire3a11;null==n&&((n=function(e){if(e in a)return a[e].exports;if(e in s){var t=s[e];delete s[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){s[e]=t},i.parcelRequire3a11=n),n.register;let o="https://forkify-api.herokuapp.com/api/v2/recipes/",c="68dc8f3a-579a-45bf-b9f6-9d23d9283cb9",d=async function(e,t){try{let r=t?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),i=await Promise.race([r,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 10 second"))},1e4)})]),a=await i.json();if(!i.ok)throw Error(`${a.message} (${i.status})`);return a}catch(e){throw e}},l={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10},bookmarks:[]},u=function(e){let{recipe:t}=e.data;return{id:t.id,title:t.title,publisher:t.publisher,sourceUrl:t.source_url,image:t.image_url,servings:t.servings,cookingTime:t.cooking_time,ingredients:t.ingredients,...t.key&&{key:t.key}}},p=async function(e){try{let t=await d(`${o}${e}?key=${c}`);l.recipe=u(t),l.bookmarks.some(t=>t.id===e)?l.recipe.bookmarked=!0:l.recipe.bookmarked=!1,console.log(l.recipe)}catch(e){throw console.error(`${e} \u{1F4A5}\u{1F4A5}\u{1F4A5}\u{1F4A5}`),e}},_=async function(e){try{l.search.query=e;let t=await d(`${o}?search=${e}&key=${c}`);console.log(t),l.search.results=t.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}})),l.search.page=1}catch(e){throw console.error(`${e} \u{1F4A5}\u{1F4A5}\u{1F4A5}\u{1F4A5}`),e}},g=function(e=l.search.page){l.search.page=e;let t=(e-1)*l.search.resultsPerPage,r=e*l.search.resultsPerPage;return l.search.results.slice(t,r)},h=function(e){l.recipe.ingredients.forEach(t=>{t.quantity=t.quantity*e/l.recipe.servings}),l.recipe.servings=e},m=function(){localStorage.setItem("bookmarks",JSON.stringify(l.bookmarks))},v=function(e){l.bookmarks.push(e),e.id===l.recipe.id&&(l.recipe.bookmarked=!0),m()},f=function(e){let t=l.bookmarks.findIndex(t=>t.id===e);l.bookmarks.splice(t,1),e===l.recipe.id&&(l.recipe.bookmarked=!1),m()},k=localStorage.getItem("bookmarks");k&&(l.bookmarks=JSON.parse(k));let b=async function(e){try{let t=Object.entries(e).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=e[1].split(",").map(e=>e.trim());if(3!==t.length)throw Error("Wrong ingredient fromat! Please use the correct format :)");let[r,i,a]=t;return{quantity:r?+r:null,unit:i,description:a}}),r={title:e.title,source_url:e.sourceUrl,image_url:e.image,publisher:e.publisher,cooking_time:+e.cookingTime,servings:+e.servings,ingredients:t},i=await d(`${o}?key=${c}`,r);l.recipe=u(i),v(l.recipe)}catch(e){throw e}};var y={};r="icons.c5b0f01c.svg",y=new URL("./"+(r=n.i?.[r]||r),import.meta.url).toString();class w{_data;render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();if(!t)return r;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}update(e){this._data=e;let t=this._generateMarkup(),r=Array.from(document.createRange().createContextualFragment(t).querySelectorAll("*")),i=Array.from(this._parentElement.querySelectorAll("*"));r.forEach((e,t)=>{let r=i[t];e.isEqualNode(r)||e.firstChild?.nodeValue.trim()===""||(r.textContent=e.textContent),e.isEqualNode(r)||Array.from(e.attributes).forEach(e=>r.setAttribute(e.name,e.value))})}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let e=`
      <div class="spinner">
        <svg>
          <use href="${t(y)}#icon-loader"></use>
        </svg>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this._errorMessage){let r=`
      <div class="error">
        <div>
          <svg>
            <use href="${t(y)}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${e}</p>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderMessage(e=this._message){let r=`
      <div class="message">
        <div>
          <svg>
            <use href="${t(y)}#icon-smile"></use>
          </svg>
        </div>
        <p>${e}</p>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}}class $ extends w{_parentElement=document.querySelector(".recipe");_errorMessage="We could not find that recipe. Please try another one!";_message="";addHandlerRender(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}addHandlerUpdateServings(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--update-servings");if(!r)return;let{updateTo:i}=r.dataset;+i>0&&e(+i)})}addHandlerAddBookmark(e){this._parentElement.addEventListener("click",function(t){t.target.closest(".btn--bookmark")&&e()})}_generateMarkup(){return`
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${t(y)}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${t(y)}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">
              <svg>
                <use href="${t(y)}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">
              <svg>
                <use href="${t(y)}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
          <svg>
            <use href="${t(y)}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${t(y)}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient.bind(this)).join("")}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${t(y)}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `}_generateMarkupIngredient(r){return`
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${t(y)}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">
        ${r.quantity?new e(r.quantity).toString():""}
      </div>
      <div class="recipe__description">
        <span class="recipe__unit">${r.unit}</span>
        ${r.description}
      </div>
    </li>
    `}}var E=new $;class S{_parentEl=document.querySelector(".search");getQuery(){let e=this._parentEl.querySelector(".search__field").value;return this._clearInput(),e}_clearInput(){this._parentEl.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentEl.addEventListener("submit",function(t){t.preventDefault(),e()})}}var q=new S,H=new class extends w{_parentElement="";_generateMarkup(){let e=window.location.hash.slice(1);return`
      <li class="preview">
        <a class="preview__link ${this._data.id===e?"preview__link--active":""}" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${this._data.key?"":"hidden"}">
              <svg>
              <use href="${t(y)}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `}};class A extends w{_parentElement=document.querySelector(".results");_errorMessage="No recipes found for your query! Please try again ;)";_message="";_generateMarkup(){return this._data.map(e=>H.render(e,!1)).join("")}}var M=new A;class x extends w{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--inline");r&&e(+r.dataset.goto)})}_generateMarkup(){let e=this._data.page,r=Math.ceil(this._data.results.length/this._data.resultsPerPage);return 1===e&&r>1?`
        <button data-goto="${e+1}" class="btn--inline pagination__btn--next">
          <span>Page ${e+1}</span>
          <svg class="search__icon">
            <use href="${t(y)}#icon-arrow-right"></use>
          </svg>
        </button>
      `:e===r&&r>1?`
        <button data-goto="${e-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${t(y)}#icon-arrow-left"></use>
          </svg>
          <span>Page ${e-1}</span>
        </button>
      `:e<r?`
        <button data-goto="${e-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${t(y)}#icon-arrow-left"></use>
          </svg>
          <span>Page ${e-1}</span>
        </button>
        <button data-goto="${e+1}" class="btn--inline pagination__btn--next">
          <span>Page ${e+1}</span>
          <svg class="search__icon">
            <use href="${t(y)}#icon-arrow-right"></use>
          </svg>
        </button>
      `:""}}var L=new x;class P extends w{_parentElement=document.querySelector(".bookmarks__list");_errorMessage="No bookmarks yet. Find a nice recipe and bookmark it ;)";_message="";addHandlerRender(e){window.addEventListener("load",e)}_generateMarkup(){return this._data.map(e=>H.render(e,!1)).join("")}}var T=new P;class F extends w{_parentElement=document.querySelector(".upload");_message="Recipe was successfully uploaded :)";_window=document.querySelector(".add-recipe-window");_overlay=document.querySelector(".overlay");_btnOpen=document.querySelector(".nav__btn--add-recipe");_btnClose=document.querySelector(".btn--close-modal");constructor(){super(),this._addHandlerShowWindow(),this._addHandlerHideWindow()}toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}_addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}_addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUpload(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e(Object.fromEntries([...new FormData(this)]))})}_generateMarkup(){}}var j=new F;let R=async function(){try{let e=window.location.hash.slice(1);if(!e)return;E.renderSpinner(),M.update(g()),T.update(l.bookmarks),await p(e),E.render(l.recipe)}catch(e){E.renderError(),console.error(e)}},W=async function(){try{M.renderSpinner();let e=q.getQuery();if(!e)return;await _(e),M.render(g()),L.render(l.search)}catch(e){console.log(e)}},C=async function(e){try{j.renderSpinner(),await b(e),console.log(l.recipe),E.render(l.recipe),j.renderMessage(),T.render(l.bookmarks),window.history.pushState(null,"",`#${l.recipe.id}`),setTimeout(function(){j.toggleWindow()},2500)}catch(e){console.error("\uD83D\uDCA5",e),j.renderError(e.message)}};T.addHandlerRender(function(){T.render(l.bookmarks)}),E.addHandlerRender(R),E.addHandlerUpdateServings(function(e){h(e),E.update(l.recipe)}),E.addHandlerAddBookmark(function(){l.recipe.bookmarked?f(l.recipe.id):v(l.recipe),E.update(l.recipe),T.render(l.bookmarks)}),q.addHandlerSearch(W),L.addHandlerClick(function(e){M.render(g(e)),L.render(l.search)}),j.addHandlerUpload(C);
//# sourceMappingURL=18. Forkify.b287c48c.js.map
