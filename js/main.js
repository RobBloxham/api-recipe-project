// Fake data until I can get Fetch working
const recipes = [{"title":"Chicken Tortilla Wrap Sandwich","href":"http:\/\/www.recipezaar.com\/Chicken-Tortilla-Wrap-Sandwich-126712","ingredients":"cheddar cheese, salsa, chicken, flour tortillas, lettuce","thumbnail":"http:\/\/img.recipepuppy.com\/299609.jpg"},{"title":"Chicken Cordon Bleu Sandwich","href":"http:\/\/www.recipezaar.com\/Chicken-Cordon-Bleu-Sandwich-349780","ingredients":"chicken, french bread, ham, swiss cheese, vegetable oil","thumbnail":"http:\/\/img.recipepuppy.com\/295527.jpg"},{"title":"Chicken & Slaw Sandwich with Bell Pepper Relish \r\n\t\t\n","href":"http:\/\/www.kraftfoods.com\/kf\/recipes\/chicken-slaw-sandwich-bell-110881.aspx","ingredients":"cheese spread, relish, sourdough bread, chicken, broccoli","thumbnail":"http:\/\/img.recipepuppy.com\/651857.jpg"},{"title":"\nHot Chicken Sandwich Recipe\n\n","href":"http:\/\/cookeatshare.com\/recipes\/hot-chicken-sandwich-51902","ingredients":"chicken, eggs, olives, mushroom, mayonnaise","thumbnail":"http:\/\/img.recipepuppy.com\/794805.jpg"},{"title":"Parmesan Chicken Sandwich","href":"http:\/\/www.recipezaar.com\/Parmesan-Chicken-Sandwich-168023","ingredients":"black pepper, chicken, butter, oregano, bread crumbs, paprika, parmesan cheese, parsley, salt","thumbnail":"http:\/\/img.recipepuppy.com\/350088.jpg"},{"title":"Crispy Chicken Sandwich \r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\r\n\r\n","href":"http:\/\/www.kraftfoods.com\/kf\/recipes\/crispy-chicken-sandwich-55445.aspx","ingredients":"chicken, chicken, mozzarella cheese, french bread, dijon mustard, lettuce, tomato","thumbnail":"http:\/\/img.recipepuppy.com\/650315.jpg"}]


// Arrays and Variables
let mealChoice = [];
let fridgeChoice = [];
let proteinChoice = null;

// append choice to array when button is clicked.

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
	console.log(mealChoice);
	console.log(fridgeChoice);
	console.log(proteinChoice);
	
	}

	




// Cached Element References
const mealSelect = document.getElementById('select-meal');
const fridgeItemsSelect = document.getElementById('select-fridge-items');
const proteinSelect = document.getElementById('select-primary-protein');
const recipeSection = document.getElementById('returned-recipes');

// Event Listeners
const body = document.body;
body.addEventListener('click', e => handleChoice(e));
// use handleChoice as callback

// List of Food Items to be rendered as buttons
const mealList = ['sandwich', 'soup', 'salad', 'baked', 'fried', 'slow cooked'];
const fridgeList = ['lettuce', 'tomato', 'pickles', 'chicken', 'mustard', 'ketchup', 'cheese', 'butter', 'cabbage'];
const proteinList = ['chicken', 'fish', 'egg', 'tofu', 'beef'];


init();

// Functions 
function handleRecipes() {
	recipes.forEach(recipe => {
		console.log(recipe.title, recipe.href, recipe.ingredients, recipe.thumbnail)
	});
}

// Create Buttons
function createButtons(array, buttonContainer) {
	array.forEach(foodItem => appendButton(foodItem, buttonContainer));
}

function appendButton(foodItem, buttonContainer) {
	let newButton = document.createElement("button");
	newButton.id = `${foodItem}`;
	newButton.innerHTML = `
										${foodItem}
	`
	buttonContainer.appendChild(newButton);
}

function createRecipeCard(recipeArray, recipeContainer) {
	recipeArray.forEach(recipe => appendRecipeCard(recipe, recipeContainer));
}

function appendRecipeCard(recipe, recipeContainer) {
	let newRecipeCard = document.createElement("div");
	newRecipeCard.innerHTML = `<div class="recipeCard" id="${recipe.title.toLowerCase()}">
															<div>
																<img width="50" height="50" id="${recipe.title.toLowerCase()}" src=${recipe.thumbnail}>
																<div>
																	<h1>${recipe.title}</h1>
																	<h2>${recipe.ingredients}</h2>
																</div>
															</div>	
														</div>`;

	recipeContainer.appendChild(newRecipeCard)
	console.dir(typeof(recipe.ingredients));
}





// Initialization Function
function init() {
	render();
	// find a better home for this since you wont have this data until after sending a request once you get your data working.
	handleRecipes();
	
}

// Render Fuction
function render() {
	createButtons(mealList, mealSelect);
	createButtons(fridgeList, fridgeItemsSelect);
	createButtons(proteinList,proteinSelect);
	createRecipeCard(recipes, recipeSection);
}


// *Style Buttons

// * Send request to Recipe Puppy for Meal Type and Primary Protein.
// // issue with request, CORs, I took a snapshot and will show it to instructors.


// * Iterate through array of recipe objects and render template recipe card to DOM using appendChild.
// * Create a template recipe thumbnail card using bootstram or materialize.
// * Create expanded template recipe card.
// * Create Shopping list template.
// * Listen for click event on rendered recipe card and jump to expanded recipe card.
// * Listen to click event on Shopping List button to render Shopping List Template.


// recipe.ingredients is a string, parse by , and add to an array.

// Stretch Goals
// Interaction
// handle if user selects too many proteins.


