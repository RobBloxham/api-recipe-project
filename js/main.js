// Arrays and Variables
let mealChoice;
let fridgeChoice = [];
let proteinChoice;
let start;
let expanded;
let endpoint;
let returnedResults = null;

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
const returnToRecipesButton = document.getElementById('return-to-recipes');


init();

// Event Listeners
body.addEventListener('click', e => handleChoice(e));
searchRecipesButton.addEventListener('click', fetchData);

// Create Buttons
function createButtons(array, buttonContainer) {
	array.forEach(foodItem => appendButton(foodItem, buttonContainer));
}

function appendButton(foodItem, buttonContainer) {
	let newButton = document.createElement("a");
	newButton.id = `${foodItem}`;
	newButton.setAttribute("class", "waves-effect waves-light red btn")
	newButton.innerHTML = `${foodItem}`;
	buttonContainer.appendChild(newButton);
}

// Handle button choices
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

// Data Handling //
// Create request string after buttons have been selected
function createRequestString() {
	if (proteinChoice) {
		endpoint = `https://recipepuppyproxy.herokuapp.com/api/?i=${proteinChoice}&q=${mealChoice}&p=3`;
		console.log('endpoint',endpoint)
		return endpoint;
	}
}

// Fetch Data and update recipe cards
function fetchData() {
	// what do my choice arrays looks like before i fetch the data?
	console.log('mealchoic', mealChoice);
	console.log('proteinchoice', proteinChoice);
	console.log('fridge items', fridgeChoice);
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
				returnedResults = results;
				update();
				return returnedResults;
			});
	}
}
function cleanData(data) {
	data.forEach(recipe => {
		recipe.title = recipe.title.replace(/\r\n|\n|\r|\t/gm,'');
		recipe.ingredients = recipe.ingredients.split(',');
		if (recipe.thumbnail === "") {
			// this is temporary, you will replace this with a generated photo eventually.
			recipe.thumbnail = "https://picsum.photos/50";
		}
	});
	return data;
}

function update() {
	createRecipeCard(returnedResults, recipeSection);
	expandCard(returnedResults);
}

function createRecipeCard(recipeArray, recipeContainer) {
	recipeArray.forEach(recipe => {
		appendRecipeCard(recipe, recipeContainer);
	});
	const listContainers = document.getElementsByClassName('list-container');
	for (let i = 0; i < listContainers.length; i++) {
		const ul = document.createElement('ul')
		ul.setAttribute('class','unordered-list');
		listContainers[i].appendChild(ul);
	}
	const unorderedList = document.getElementsByClassName('unordered-list');

	for (x = 0; x < unorderedList.length; x++) {
		recipeArray[x].ingredients.forEach(ingredient => {
			const li = document.createElement('li');
			li.innerHTML = ingredient;
			fridgeChoice.includes(ingredient) ? li.setAttribute('class', 'exists') : li.setAttribute('class', 'empty');
			unorderedList[x].appendChild(li);
		})
	}
}

function appendRecipeCard(recipe, recipeContainer) {
	let newRecipeCard = document.createElement("div");
	newRecipeCard.setAttribute('class','card cyan darken-2 recipe-card');
	newRecipeCard.id = recipe.title.toLowerCase();
	newRecipeCard.innerHTML = `
		<img width="50" height="50" id="${recipe.title.toLowerCase()}" src=${recipe.thumbnail}>
		<h1>${recipe.title}</h1>
		<div class="card-content white-text list-container">
		</div>`;
	recipeContainer.appendChild(newRecipeCard);
}

function expandCard(results) {
	for (let i=0; i<recipeCards.length;i++) {
		recipeCards[i].addEventListener('click', e => {
			recipeCards[i].style.backgroundColor = 'red';
			// console.log('results yayyy',results)
			// console.log('recipe card id',e.target.id)
			appendExpandedRecipeCard(results, e.target.id);
		})
	}
}

function appendExpandedRecipeCard(results, id) {
	// console.log('expanded card results', results);
	let selectedRecipe = results.filter(recipe => recipe.title.toLowerCase() === id);
	console.log('selectedRecip', selectedRecipe);
	let expandedRecipeCard = document.createElement("div");
	expandedRecipeCard.setAttribute('class', 'card');
	expandedRecipeCard.id ="selected-recipe";
	expandedRecipeCard.innerHTML = `
	<div class="card-body">
		<img class="card-img-top"width="200" height="200" src=${selectedRecipe[0].thumbnail}>
		<h1>You chose ${selectedRecipe[0].title}</h1>
		<h2>${selectedRecipe[0].ingredients}</h2>
		<div>
			<a class="waves-effect waves-light red btn" id="create-shopping-list">Create Shopping List</a>
			<a id="return-to-recipes">Return to Recipes</a>
		</div>
	</div>`
	main.appendChild(expandedRecipeCard);
	let createShoppingList = document.getElementById('create-shopping-list');
	createShoppingList.addEventListener('click', e => appendShoppingList(e, selectedRecipe[0]));
	let returnToRecipesButton = document.getElementById('return-to-recipes');
	returnToRecipesButton.addEventListener('click', e => removeExpandedCard(e, expandedRecipeCard));
}

function removeExpandedCard(e, expandedRecipeCard) {
	main.removeChild(expandedRecipeCard)
}

function appendShoppingList(e, recipe) {
	let shoppingList = document.createElement("div");
	shoppingList.setAttribute('class', 'card cyan darken-2');
	shoppingList.id="shopping-list";
	shoppingList.innerHTML = `
		<ul id="shopping-list-ul">
		
		</ul>
	`;
	main.appendChild(shoppingList);

	// add ingredients to shopping list
	const unorderedList = document.getElementById('shopping-list-ul');
	recipe.ingredients.forEach(ingredient => {
		// does ingredient exist in fridge?
		createListElements(ingredient, unorderedList)
	});
}


function createListElements(ingredient, unorderedList) {
	const li = document.createElement('li');
	li.innerHTML = ingredient;
	fridgeChoice.includes(ingredient) ? li.setAttribute('class', 'exists') : li.setAttribute('class', 'empty');
		unorderedList.appendChild(li);
	return;
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


// [X]] add confirm or return button to appended recipe.
// 	add a button for dont like!, remove card from list, keep browsing. 
// 	add a maybe button that changes the color to something.

// * Jump to appended card
// * highlight the items in the returned recipe-card that already exist in your fridge ingredients array.
// * If a request returns a recipe with no thumbnail, generate an image with the recipe.title and render that instead.
// make sure that it is not possible to add multiple expanded cards.

// add some more to shopping list template.
// * Check the returned recipe ingredients to see what ingredients match from my fridge.




// Stretch Goals
// Interaction
// handle if user selects too many proteins.
// CORS Anywhere NODE proxy


