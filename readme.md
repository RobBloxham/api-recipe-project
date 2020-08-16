# Fridgester - Recipe Finder
<www.fridgester-final.surge.sh>
# Unit 1 Project Proposal

## Motivation:
I have always loved to cook. Eating delicious and healthy food has always been important to me. Sometimes after a long day of work, its can be hard to think about what I want to eat. I have just enough energy to go to the store and buy groceries and whip up a quick meal. I want a quick and easy way to take stock of what ingredients I have in my fridge, so as I run out to the store I can look up recipes online and create a fast shopping list for the missing ingredients.

## User Persona:
>"Dan is starting to feel hungry. He is finishing up his workday has just enough time to run out to the store and buy groceries to cook a meal but he is tired of the foods he has been eating lately. He wants be able to cook a meal based off of some of the ingredients he has in his fridge so he doesnt let them go to waste. He also doesnt want to spend too much time browsing for recipes, ideally it should take him no longer than 3-5 minutes to find a recipe. He would like to see a visual representation of how many new items he would have to purchase vs using the ingredients he currently has. Once he finds a recipe he would like to have a shopping list created that shows him what ingredients he is missing so he can run to the store and check off items as he adds them to his cart. He would also like to share a shortened link of the recipe to any friends and family."

## User Experience:
1. User opens app and selects a list of popular foods that are currently in their fridge.
2. User can select and filter from a list of common recipe categories.
    Sandwich
    Soup
    Salad
    Baked/Fried
    Slowcooked
    
3. User selects primary protein
  * chicken
  * beef
  * fish
  * tofu/tempeh
  * egg
4. User is returned a list of recipes with thumbnail images.
5. Once the user selects the image they dive deeper into a screen that shows them more information on the recipe, and and ingredient list that shows them what ingredients they have which ones they would have to purchase.
6. User checks off items as they add them to shopping cart. Once they gather all the items the recipe card is showed to them again.

## Pseudo-Code:
* Create buttons for:
    * Meal Type Selection
    * Items in fridge
    * Primary Protein
* Create Cached Element References for all buttons
* Add event listeners to all buttons
* Store Meal Type Selection and Primary Protein in a variable
* Store Items In Fridge in an Array.
* Send request to Recipe Puppy for Meal Type and Primary Protein.
* Handle response from Recipe Puppy and create an array of recipe objects storing the title, ingredient list, thumbnail url.
* Create a template recipe thumbnail card using bootstram or materialize.
* Create expanded template recipe card.
* Create Shopping list template.
* Iterate through array of recipe objects and render template recipe card to DOM using appendChild.
* Listen for click event on rendered recipe card and jump to expanded recipe card.
* Listen to click event on Shopping List button to render Shopping List Template.
    

## Technologies Used
1. Recipe Puppy: http://www.recipepuppy.com/api/
A simple api where I only have to use 2 parameters. A list of comma separated ingredients or a general search query that searches the title of the recipe.

2. Clean URL: 
https://cleanuri.com/docs
An API that I will use to shorten the recipe links.

3. Materialize
4. Picsum - For missing photos



# Shape of Request Data from Recipe Puppy
```json
{"title":"Recipe Puppy","version":0.1,"href":"http:\/\/www.recipepuppy.com\/","results":[{"title":"Buffalo Chicken Sandwich Recipe","href":"http:\/\/www.grouprecipes.com\/12566\/buffalo-chicken-sandwich.html","ingredients":"chicken, flour, milk, vegetable oil, hot sauce, salt","thumbnail":""},{"title":"Egg &amp; Chicken Club Sandwich","href":"http:\/\/www.recipezaar.com\/Egg-Chicken-Club-Sandwich-119516","ingredients":"black pepper, bread, chicken, eggs, mayonnaise, salt","thumbnail":""}
```

## Wireframes

### Screen 1
![Screen 1](https://i.imgur.com/zlevJ5Q.png)
### Screen 2
![Screen 2](https://i.imgur.com/WMobQAU.png)
### Screen 3
![Screen 3](https://i.imgur.com/FFqHg64.png)
### Screen 4
![Screen 4](https://i.imgur.com/cThToo6.png)

## Stretch Goals
  * Add copy to clipboard capability
  * Persist data and store favorite recipes
  * Improve flow from sections of website
  * Add an animation that shows how many recipe items you have in fridge
  * Make shopping list shareable to friends.
  * Connect to a more robust food api.
  * Include better images.