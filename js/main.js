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
const shoppingList = document.getElementById('shopping-list');
const recipesHeadline = document.getElementById('recipes-headline');


init();
// const options;
// Event Listeners
body.addEventListener('click', e => handleChoice(e));
searchRecipesButton.addEventListener('click', fetchData);
// Materialzie Collapsible
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });

// Create Buttons
function createButtons(array, buttonContainer) {
	array.forEach(foodItem => appendButton(foodItem, buttonContainer));
}

function appendButton(foodItem, buttonContainer) {
	let newButton = document.createElement("a");
	newButton.id = `${foodItem}`;
	newButton.setAttribute("class", "btn")
	// waves-effect waves-light
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
}

function createRecipeCard(recipeArray, recipeContainer) {
	recipesHeadline.style.display = "block";
	console.log(recipeArray);

	recipeArray.forEach((recipe, idx) => {
		appendRecipeCard(recipe, idx, recipeContainer);
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

function appendRecipeCard(recipe, idx, recipeContainer) {
	let id = toString(idx);
	let newRecipeCard = document.createElement("li");
	newRecipeCard.setAttribute('class','card amber recipe-card');
	newRecipeCard.id = recipe.title.toLowerCase();
	newRecipeCard.innerHTML = `
	<div class="collapsible-header">
		<img width="50" height="50" id="${recipe.title.toLowerCase()}" src=${recipe.thumbnail}>
		<h1>${recipe.title}</h1>
	</div>
	<div class="list-container collapsible-body">
		<a href="#jump-to-shopping-list" class="btn create-shopping-list" id="${idx}">Create Shopping List</a>
		<h1>Ingredients</h1>
	</div> `;
	recipeContainer.appendChild(newRecipeCard);

	let createShoppingList = document.getElementById(idx);
	createShoppingList.addEventListener('click', e => appendShoppingList(recipe));
	
}


function appendShoppingList(recipe) {
	shoppingList.innerHTML = `
	<div class="card-content blue-grey-darken-4-text">
		<h1>Shopping List</h1>
		<ul id="shopping-list-ul">
		</ul>
	</div>
	`;
	// add ingredients to shopping list
	const unorderedList = document.getElementById('shopping-list-ul');
	recipe.ingredients.forEach(ingredient => {
		// does ingredient exist in fridge?
		createListElements(ingredient, unorderedList)
	});
}


function createListElements(ingredient, unorderedList) {
	const li = document.createElement('li');
	li.innerHTML = `
	<i class="small material-icons">check_box_outline_blank</i>
	<h3>${ingredient}</h3>
	`
	fridgeChoice.includes(ingredient) ? li.setAttribute('class', 'exists') : li.setAttribute('class', 'empty');
	unorderedList.appendChild(li);
	// return;
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

