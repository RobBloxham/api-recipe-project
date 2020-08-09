// Arrays and Variables
let mealChoice;
let fridgeChoice = [];
let proteinChoice;
let recipeResults = null;
let start;
let expanded;
let endpoint;




// List of Food Items to be rendered as buttons
const mealList = ['sandwich', 'soup', 'salad', 'baked', 'fried', 'slow cooked'];
const fridgeList = ['lettuce', 'tomato', 'pickles', 'chicken', 'mustard', 'ketchup', 'cheese', 'butter', 'cabbage'];
const proteinList = ['chicken', 'fish', 'egg', 'tofu', 'beef'];

// Cached Element References
const body = document.body;
const main = document.getElementById('main');
const mealSelect = document.getElementById('select-meal');
const fridgeItemsSelect = document.getElementById('select-fridge-items');
const proteinSelect = document.getElementById('select-primary-protein');
const searchRecipesButton = document.getElementById('search-recipes');
const recipeSection = document.getElementById('returned-recipes');
const recipeCards = document.getElementsByClassName('recipe-card');
const createShoppingListButton = document.getElementById('create-shopping-list');
const returnToRecipesButton = document.getElementById('return-to-recipes');


init();

// Event Listeners
body.addEventListener('click', e => handleChoice(e));
searchRecipesButton.addEventListener('click', fetchData);


function createShoppingList() {
	console.log('shopping list created!');
}


function handleSelectedRecipe(e) {
	console.log('recipe selected',e)
}

// Create request string
function createRequestString() {
	if (proteinChoice) {
		endpoint = `https://recipepuppyproxy.herokuapp.com/api/?i=${proteinChoice}&q=${mealChoice}&p=3`;
		console.log('endpoint',endpoint)
		return endpoint;
	}
}

// Fetch Data
function fetchData() {
	if (proteinChoice) {
		createRequestString();
		let url = endpoint;
	
		fetch(url)
			.then((response) => {
				if (response.status == 200) {
					return response.json();
				} else {
					reject('server error');
				}
			})
			.then(data => {
				let results = data.results;
				recipeResults = results;
				createRecipeCard(results, recipeSection);
				expandCard(results)
				return recipeResults;
			});
	}
	
}

function expandCard(results) {
	for (let i=0; i<recipeCards.length;i++) {
		recipeCards[i].addEventListener('click', e => {
			appendExpandedRecipeCard(results, e.target.id);
			return;
		})
	}
	
}


// Create Buttons
function createButtons(array, buttonContainer) {
	array.forEach(foodItem => appendButton(foodItem, buttonContainer));
}

function appendButton(foodItem, buttonContainer) {
	let newButton = document.createElement("button");
	newButton.id = `${foodItem}`;
	newButton.type = "button";
	newButton.setAttribute("class", "btn btn-secondary")
	newButton.innerHTML = `${foodItem}`;
	buttonContainer.appendChild(newButton);
}

function createRecipeCard(recipeArray, recipeContainer) {
	recipeArray.forEach(recipe => appendRecipeCard(recipe, recipeContainer));
}

function appendRecipeCard(recipe, recipeContainer) {
	let newRecipeCard = document.createElement("div");
	newRecipeCard.setAttribute('class','card-body recipe-card');
	newRecipeCard.id = recipe.title.toLowerCase();
	newRecipeCard.innerHTML = `<img width="50" height="50" id="${recipe.title.toLowerCase()}" src=${recipe.thumbnail}>
														<div>
															<h1>${recipe.title}</h1>
															<h2>${recipe.ingredients}</h2>
														</div>`;
	recipeContainer.appendChild(newRecipeCard);
}

function appendExpandedRecipeCard(results, id) {
	let selectedRecipe = results.filter(recipe => recipe.title.toLowerCase() === id);
	let expandedRecipeCard = document.createElement("div");
	expandedRecipeCard.setAttribute('class', 'card');
	expandedRecipeCard.id ="selected-recipe";
	expandedRecipeCard.innerHTML = `
	<div class="card-body">
				<img class="card-img-top"width="200" height="200" src=${selectedRecipe[0].thumbnail}>
				<h1>You chose ${selectedRecipe[0].title}</h1>
				<h2>${selectedRecipe[0].ingredients}</h2>
				<div>
					<button id="create-shopping-list">Create Shopping List</button>
					<button id="return-to-recipes">Return to Recipes</button>
				</div>
				
			</div>`
	main.appendChild(expandedRecipeCard);
	let createShoppingList = document.getElementById('create-shopping-list');
	createShoppingList.addEventListener('click', e => console.log(e))
}

function handleChoice(e) {
	// get the container that the id is in
	const id = e.target.id;
	const parent = e.target.parentElement.id;
	// match the container to the appropriate array
	if (parent === 'select-meal') {
		if (mealChoice) {
			mealChoice = null;
		} else if (mealList.includes(id)) {
			mealChoice = id ;
		}
	} 
	if (parent === 'select-fridge-items') {
		if (fridgeChoice.includes(id)) {
			fridgeChoice.splice(fridgeChoice.indexOf(id));
		}
		else if (fridgeList.includes(id)) {
			fridgeChoice.push(id) ;
		}
	}
	if (parent === 'select-primary-protein') {	
		if (proteinChoice === id) {
			proteinChoice = null;
		} else {
			proteinChoice = id;
		}	
	} 
}

// Initialization Function
function init() {
	renderButtons();
}

// Render Fuction
function renderButtons() {
	createButtons(mealList, mealSelect);
	createButtons(fridgeList, fridgeItemsSelect);
	createButtons(proteinList,proteinSelect);
}

function update() {
	// 
}

// [X]] add confirm or return button to appended recipe.
	// [] add cached element references for each  button
	// [] add event listeners to buttons.
	// [] confirm creates a shopping list
	// [] return removes the recipe, changes the color of the recipe card back to white, and shows the rest of the recipes.
// * Create Shopping list template.
// * Change color of returned recipe card background when selected.
// * Jump to appended card
// * Listen to click event on Shopping List button to render Shopping List Template.
// * Check the returned recipe ingredients to see what ingredients match from my fridge.
// * highlight the items in the returned recipe-card that already exist in your fridge ingredients array.
// * If a request returns a recipe with no thumbnail, generate an image with the recipe.title and render that instead.


// fridge items are added to thei


// Stretch Goals
// Interaction
// handle if user selects too many proteins.
// CORS Anywhere NODE proxy


