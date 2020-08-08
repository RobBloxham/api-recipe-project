
// Arrays and Variables
let mealChoice = [];
let fridgeChoice = [];
let proteinChoice;
let recipeResults = null;
let start;
let endpoint;
// let ready = true;



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


init();

// Event Listeners
body.addEventListener('click', e => handleChoice(e));
searchRecipesButton.addEventListener('click', checkReady)



function handleSelectedRecipe(e) {
	console.log('recipe selected',e)
}

// Functions 
function checkReady() {
	if (proteinChoice) {
		fetchData();
		console.log('data fetched!');
	}
};

// Create request string
function createRequestString() {
	if (proteinChoice) {
		endpoint = `https://recipepuppyproxy.herokuapp.com/api/?i=${proteinChoice}&p=3`;
		return endpoint;
	}
}

// Fetch Data
function fetchData() {
	createRequestString();
	// let url = endpoint;
	let url = "https://recipepuppyproxy.herokuapp.com/api/?i=chicken&q=sandwich&p=3";
	
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
			console.log('recipe results', recipeResults)
			console.log('results',results);
			createRecipeCard(results, recipeSection);
			// console.log(recipeCards);
			// console.log('new recipe array',Array.from(recipeCards))
			for (let i=0; i<recipeCards.length;i++) {
				recipeCards[i].addEventListener('click', e => {
					// e.stopPropagation();
					appendExpandedRecipeCard(results, e.target.id)
				})
			}

			return recipeResults;
		});
	
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
	// take the recipeCard id (which is the title)
	// match it to the data in 
	
	let selectedRecipe = results.filter(recipe => recipe.title.toLowerCase() === id);
	let expandedRecipeCard = document.createElement("div");
	expandedRecipeCard.setAttribute('class', 'card');
	expandedRecipeCard.id ="selected-recipe";
	expandedRecipeCard.innerHTML = `
	<div class="card-body">
				<img class="card-img-top"width="200" height="200" src=${selectedRecipe.thumbnail}>
				<h1>You chose ${selectedRecipe.title}</h1>
				<h2>${selectedRecipe.ingredients}</h2>
				<div>
					<h1></h1>
				</div>
			</div>`
	main.appendChild(expandedRecipeCard);
}

function handleChoice(e) {
	// get the container that the id is in
	const id = e.target.id;
	const parent = e.target.parentElement.id;
	// match the container to the appropriate array
	if (parent === 'select-meal') {
		if (mealChoice.includes(id)) {
			mealChoice.splice(mealChoice.indexOf(id));
		} else if (mealList.includes(id)) {
			mealChoice.push(id) ;
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
	console.log(proteinChoice)
}



// Initialization Function
function init() {
	render();
}

// Render Fuction
function render() {
	createButtons(mealList, mealSelect);
	createButtons(fridgeList, fridgeItemsSelect);
	createButtons(proteinList,proteinSelect);
	
}



// * Create expanded template recipe card.

// Create request based off of user inputs.
// * Send request to Recipe Puppy for Meal Type and Primary Protein.
// // issue with request, CORs, I took a snapshot and will show it to instructors.
//ask david why element.class = "doesnt work" when element.id = "does work" , instead I had to use setAtrribute('class', 'btn btn-primary')

// * Create Shopping list template.
// * Listen for click event on rendered recipe card and jump to expanded recipe card.
// * Listen to click event on Shopping List button to render Shopping List Template.
// recipe.ingredients is a string, parse by , and add to an array.

// Stretch Goals
// Interaction
// handle if user selects too many proteins.
// CORS Anywhere NODE proxy


