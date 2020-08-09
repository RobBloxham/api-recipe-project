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
// const createShoppingListButton = document.getElementById('create-shopping-list');
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
				cleanData(results);
				createRecipeCard(results, recipeSection);
				expandCard(results)
			});
	}
	
}

function cleanData(data) {
	data.forEach(recipe => {
		recipe.ingredients = recipe.ingredients.split(',');
	});
	return data;
}

function expandCard(results) {
	for (let i=0; i<recipeCards.length;i++) {
		recipeCards[i].addEventListener('click', e => {
			recipeCards[i].style.backgroundColor = 'red';
			appendExpandedRecipeCard(results, e.target.id);
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
	recipeArray.forEach(recipe => {
		appendRecipeCard(recipe, recipeContainer);
		createList(recipe);
	});
	
}

function appendRecipeCard(recipe, recipeContainer) {
	let newRecipeCard = document.createElement("div");
	newRecipeCard.setAttribute('class','card-body recipe-card');
	newRecipeCard.id = recipe.title.toLowerCase();
	newRecipeCard.innerHTML = `<img width="50" height="50" id="${recipe.title.toLowerCase()}" src=${recipe.thumbnail}>
														<h1>${recipe.title}</h1>
														<div class="list-container">
														</div>`;
	recipeContainer.appendChild(newRecipeCard);
}

function createList(recipe) {
	const divs = document.getElementsByClassName('list-container');
	for (let i = 0; i < divs.length; i++) {
		const ul = document.createElement('ul');
		divs[i].appendChild(ul);
		const li = document.createElement('li');
		
		recipe.ingredients.forEach(ingredient => {
			li.innerHTML = ingredient;
			ul.appendChild(li);
		})
	}
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
	createShoppingList.addEventListener('click', e => appendShoppingList(e));
	let returnToRecipesButton = document.getElementById('return-to-recipes');
	returnToRecipesButton.addEventListener('click', e => removeExpandedCard(e, expandedRecipeCard));
}

function removeExpandedCard(e, expandedRecipeCard) {
	main.removeChild(expandedRecipeCard)
}

function appendShoppingList(e) {
	let shoppingList = document.createElement("div");
	shoppingList.setAttribute('class', 'card');
	shoppingList.id="shopping-list";
	shoppingList.innerHTML = `
		<ul>
			<li>Ingredient</li>
			<li>Ingredient</li>
			<li>Ingredient</li>
			<li>Ingredient</li>
		</ul>
	`;
	main.appendChild(shoppingList);
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
	// [] return removes the recipe, changes the color of the recipe card back to white, and shows the rest of the recipes.
	// add a button for dont like!, remove card from list, keep browsing. 
	// add a maybe button that changes the color to something.

// * Jump to appended card
// * highlight the items in the returned recipe-card that already exist in your fridge ingredients array.
// * If a request returns a recipe with no thumbnail, generate an image with the recipe.title and render that instead.


// cleaning JSON data
	// go through every title and remove \r\n\t
	// check if thumbnails is empty and relpace
	// iterate through results.ingredients and results.ingredients.split(','), to get an array of ingredients in the object.
// iterate through results.ingredients array and render to unordered list on recipe card.
// iterate through results.ingredients array and render to shopping list.
// * Check the returned recipe ingredients to see what ingredients match from my fridge.




// Stretch Goals
// Interaction
// handle if user selects too many proteins.
// CORS Anywhere NODE proxy


