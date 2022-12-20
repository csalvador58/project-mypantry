// Check that DOM content had all loaded before running code
// document.addEventListener('DOMContentLoaded', function() {
    const REGEX_EXP = {
        'errorMsg': [                        // Custom validity error message array
            'Invalid input length, try again.',
            'Please enter a number.',
            'Selection required.'
        ],                 
    };

    const searchElements = document.querySelectorAll('[id*="search"]');


    const allInputs = document.getElementsByTagName('input');
    const allSelects = document.getElementsByTagName('select');
    
    const pantryInput = document.getElementById('add-to-pantry');
    const pantryItemName = document.getElementById('item-name');
    const pantryList = document.getElementById('pantry-list');
    const pantryQuantity = document.getElementById('quantity');
    const pantryMeasureUnit = document.getElementById('unit-of-measure');
    
    const recipeInput = document.getElementById('add-recipe-item');
    const recipeItem = document.getElementById('recipe-item');
    const recipeItemQty = document.getElementById('recipe-item-qty');
    const recipeItemUnit = document.getElementById('recipe-item-unit');
    const recipeList = document.getElementById('recipe-list');
    const recipeName = document.getElementById('recipe-name');
    const recipeSubmit = document.getElementById('submit-recipe');
    const ingredientsList = document.getElementById('ingredients-list');

    const pantrySearch = document.getElementById('search-name');
    const recipeSearch = document.getElementById('recipe-search');

    const saveData = document.getElementById('save-data');
    const loadData = document.getElementById('load-data');
    const eraseData = document.getElementById('erase-data');


    const pantry = [];
    const recipes = [];
    

    class Ingredient {
        constructor(name, qty, unit) {
            this.name = name;
            this.qty = qty;
            this.unit = unit;
        }
        updateQty(qty) {
            this.qty += qty;
        }
        delete() {
            this.qty = null;
        }
    }

    class Recipe {
        constructor(name) {
            this.name = name;
            this.ingredients = [];
        }
        add(ingredientName, qty, unit) {
            const recipeIngredient = {
                name: ingredientName,
                qty: qty,
                unit: unit,
                nutrition: null
            }

            if(this.ingredients.some(ingredient => ingredient.name.includes(ingredientName))) {
                // Lookup object name in pantry array
                for (let ingredient of this.ingredients) {
                    if(ingredient.name === ingredientName) {
                        ingredient.qty = qty;
                        // Prompt user to confirm unit of measurement if already exists in database.
                        if(ingredient.unit !== unit) {
                            let response = confirm(`The unit of measurement for "${ingredientName}" already exists in the database. Do you want to update this from "${ingredient.unit}" to "${unit}"`);
                            if(response) {
                                ingredient.unit = unit;
                                alert(`The unit of measurement for ${ingredientName} has been updated to "${unit}".`)
                            } else alert(`The unit of measurement for ${ingredientName} was not updated.`)
                        }
                    }
                }
            } else {
                this.ingredients.push(recipeIngredient);
            }
        }
        // getNutritionalData() {

        // }
        delete(ingredient) {
            let index = this.ingredients.indexOf(ingredient); // find index of ingredient
            this.ingredients.splice(index, 1);  // remove ingredient from array
        }
    }  
    
    const tempRecipe = new Recipe('temp_recipe');

    // **************EVENT LISTENERS*************

    // *****************************************************************WORKING_HERE*****************************************************************
    // Search pantry ingredients
    pantrySearch.addEventListener('keydown', function(e) {

        // Delay needed to store search input accurately
        const myTarget = e.target;
        
        setTimeout( function() {
    
            const regex = myTarget.value;
            // console.log(regex)
            if (/^\s*$/.test(regex)) displayPantry();
            else displayPantry(regex);
        }, 0); 
    });

    // Search recipes
    recipeSearch.addEventListener('keydown', function(e) {
        // Delay needed to store search input accurately
        const myTarget = e.target;
        
        setTimeout( function() {
    
            const regex = myTarget.value;
            // console.log(regex)
            if (/^\s*$/.test(regex)) displayRecipes();
            else displayRecipes(regex);
        }, 0); 
    });

    // Search pantry or recipes

    // Array.from(searchElements).forEach(function(element) {
    //     element.addEventListener('keydown', function(e) {

    //         // Delay needed to store regex accurately due to 'keydown' event
    //         console.log(e.target.id)
    //         console.log(e.target.value)
    //         // const element = e.target.id;
    //         // const regex = e.target.value;
    //         setTimeout( function() {
    //             const element = e.target.id;
    //             const regex = e.target.value;
    //             console.log(regex);
    //             if(element === 'search-name') {
    //                 displayPantry(regex);  
    //         displayPantry(regex);
    //                 displayPantry(regex);  
    //             } else {
    //                 displayRecipes(regex);  
    //             } 
                
                
                
    //             // console.log(lookup[element])
    //             // lookup[element];
    //             // displayRecipes(regex);
    //         }, 0); 
    //     }, 0); 
    //         }, 0); 
    //     })
    // })
   
    // Added a 'blur' listener to detect when a user leaves an input field. The useCapture argument was set to true to allow capture of all 'blur' events
    document.addEventListener('blur', function(e) {

        if( ['item-name', 'recipe-name', 'recipe-item'].includes(e.target.id) ) isInputInvalid(e.target, e.target.value, 0);
        if( ['quantity', 'recipe-item-qty' ].includes(e.target.id) ) isInputInvalid(e.target, e.target.value, 1);
        if( ['unit-of-measure', 'recipe.item-unit'].includes(e.target.id) ) isInputInvalid(e.target, e.target.value, 2);
        
        
    }, true);

    // Delete ingredients from pantry array. 
    // Add to recipe from pantry list to populate name and unit of ingredient when building a recipe.
    pantryList.addEventListener('click', function(e) {
        if(e.target.classList.contains('delete')) e.target.parentElement.remove();
        for (let ingredient of pantry) {
            if(ingredient.name === e.target.id) ingredient.delete();
        }

        if(e.target.classList.contains('add-to-recipe')) {
            const pantryLookup = pantry.find(item => item.name === e.target.previousElementSibling.id);
                
            recipeItem.value = pantryLookup.name;
            recipeItemUnit.value = pantryLookup.unit;
            resetInputsExceptFor('recipe-item', 'recipe-item-unit');
        }

        displayPantry();
    });

    // Delete ingredient from list when building a recipe.
    ingredientsList.addEventListener('click', function(e) {

        if(e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            for (let ingredient of tempRecipe.ingredients) {
                if(ingredient.name === e.target.id) tempRecipe.delete(ingredient);
            }
        }

        displayInputRecipe();
    });

    // Delete a recipe from Recipe list section.
    // Show list of ingredients for a recipe listed.
    recipeList.addEventListener('click', function(e) {   
        
        // Call function to fetch data from API
        if(e.target.classList.contains('view-nutrition')) {

            getIngredientData(e.target.nextElementSibling.id);
        }

        // Map method used to return array of recipe names from object array. Splice and indexOf methods use to find location of specific recipe and remove from array.
        if(e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            // Remove recipe from recipes array
            recipes.splice(recipes.findIndex(recipe => recipe.name === e.target.id), 1);
            displayRecipes();
        }

        if(e.target.classList.contains('view-recipe')) {
            
            if (e.target.parentElement.classList.contains('recipe-view-enabled')) {
                e.target.innerText = 'View';
                e.target.parentElement.classList.remove('recipe-view-enabled');
                e.target.nextElementSibling.remove();

            } else {
                e.target.parentElement.classList.add('recipe-view-enabled');
                e.target.innerText = 'Hide';

                let newUL = document.createElement('ul');
                
                let recipeLookup = recipes.find(recipe => recipe.name === e.target.previousElementSibling.id);
                for (let ingredient of recipeLookup.ingredients) {
                    let newListItem = document.createElement('li');
                    newListItem.classList.add('tab');
                    newListItem.innerHTML = `\n• ${ingredient.name} ${ingredient.qty} ${ingredient.unit}\n`;
                    newUL.appendChild(newListItem);
                }
                e.target.parentElement.appendChild(newUL);
            }
        } 
        
    });

        // Add an item to pantry.
    pantryInput.addEventListener('click', function(e) {

         
        isInputInvalid(pantryItemName, pantryItemName.value, 0);
        isInputInvalid(pantryQuantity, pantryQuantity.value, 1);
        isInputInvalid(pantryMeasureUnit, pantryMeasureUnit.value, 2);

        if(! (pantryItemName.validity.customError + pantryQuantity.validity.customError + pantryMeasureUnit.validity.customError ) > 0 ) {
            
            addToPantry(pantryItemName.value, parseFloat(pantryQuantity.value), pantryMeasureUnit.value);

            resetInputsExceptFor();
        }
        
    });

    // Add an ingredient to a temp recipe array used for recipe building.
    recipeInput.addEventListener('click', function(e) {   
        
        isInputInvalid(recipeItem, recipeItem.value, 0);
        isInputInvalid(recipeItemQty, recipeItemQty.value, 1);
        isInputInvalid(recipeItemUnit, recipeItemUnit.value, 2);

        if(! (recipeItem.validity.customError + recipeItemQty.validity.customError + recipeItemUnit.validity.customError ) > 0 ) {
            
            tempRecipe.add(recipeItem.value, recipeItemQty.value, recipeItemUnit.value)

            displayInputRecipe();
            resetInputsExceptFor('recipe-name');
        }
    });

    
    // Copy ingredients from temp recipe and create a new recipe object to store.
    recipeSubmit.addEventListener('click', function(e) {

        // Run validity check
        isInputInvalid(recipeName, recipeName.value, 0);
        if(tempRecipe.ingredients.length < 1) alert('Please add ingredients to create a recipe.');

        // Check validity error and ensure recipe list is not empty before creating new Recipe object
        if(! (recipeName.validity.customError + (tempRecipe.ingredients.length < 1)) > 0 ) {
            const newRecipe = new Recipe(recipeName.value);
    
            for(let ingredient of tempRecipe.ingredients) {
                newRecipe.add(ingredient.name, ingredient.qty, ingredient.unit);
            }
    
            recipes.push(newRecipe);
    
            // Clear temp recipe
            tempRecipe.name = null;
            tempRecipe.ingredients = [];
            
            ingredientsList.innerHTML = "";
            resetInputsExceptFor();
            displayRecipes();
        }

    });

    // JSON.stringify turns an object to a string
    // JSON.parse turns a string to an object
    // localStorage.setItem(key, value);

    // Save pantry and recipe data to local storage.
    saveData.addEventListener('click', function(e) {

        const pantryData = JSON.stringify(pantry);
        const recipeData = JSON.stringify(recipes);

        localStorage.setItem('pantryData', pantryData);
        localStorage.setItem('recipeData', recipeData);
        
        resetInputsExceptFor();
        displayPantry();
        displayRecipes();
    });

    // Load pantry and recipe data from local storage.
    loadData.addEventListener('click', function(e) {
        // Reset arrays before loading data from local storage
        pantry.length = 0;
        recipes.length = 0;        

        const pantryData = JSON.parse(localStorage.getItem('pantryData'));
        for(let ingredient of pantryData) {
            addToPantry(ingredient.name, ingredient.qty, ingredient.unit);
        }

        const recipeDataParse = JSON.parse(localStorage.getItem('recipeData'));
        for (recipe of recipeDataParse) {
            recipes.push(recipe);
        }

        resetInputsExceptFor();
        displayPantry();
        displayRecipes();
    });

    // Erase data from local storage and pantry/recipe arrays.
    eraseData.addEventListener('click', function(e) {
        // Reset arrays before loading data from local storage
        pantry.length = 0;
        recipes.length = 0;    
        
        const pantryData = JSON.stringify(pantry);
        const recipeData = JSON.stringify(recipes);

        localStorage.setItem('pantryData', pantryData);
        localStorage.setItem('recipeData', recipeData);

        resetInputsExceptFor();
        displayPantry();
        displayRecipes();
    });



    // **************FUNCTIONS*************
    function addToPantry(item, qty, unitOfMeasure) {
    
        if(pantry.some(ingredient => ingredient.name.includes(item))) {
            // Lookup object name in pantry array
            for (let ingredient of pantry) {
                if(ingredient.name === item) {
                    ingredient.updateQty(qty);
                    // Prompt user to confirm unit of measurement if already exists in database.
                    if(ingredient.unit !== unitOfMeasure) {
                        let response = confirm(`The unit of measurement for "${ingredient.name}" already exists in the database. Do you want to update this from "${ingredient.unit}" to "${unitOfMeasure}"`);
                        if(response) {
                            ingredient.unit = unitOfMeasure;
                            alert(`The unit of measurement for ${ingredient.name} has been updated to "${unitOfMeasure}".`)
                        } else alert(`The unit of measurement for ${ingredient.name} was not updated.`)
                    }
                }
            }
        } else {
            pantry.push(new Ingredient(item, qty, unitOfMeasure))       
        }
        displayPantry();
    }
// *****************************************************************WORKING_HERE*****************************************************************
    function displayPantry(search=0) {
        pantryList.innerHTML = "";

        let regex;
        if (search.length < 2) {
            regex = new RegExp(`^${search}`, 'gi');
        } else {
            regex = new RegExp(`${search}`, 'gi');
        }

        for (let ingredient of pantry) {
            if(ingredient.qty) {
                if(search) {
                    if(regex.test(ingredient.name)) {
                        let newListItem = document.createElement('li');
                        newListItem.innerHTML = `\n<span>• ${ingredient.name} ${ingredient.qty} ${ingredient.unit} </span>\n<a id="${ingredient.name}" class="button delete">Delete</a>\n<a class="button add-to-recipe">Add to recipe</a>\n`;
                        pantryList.appendChild(newListItem);
                    }
                } else {
                    let newListItem = document.createElement('li');
                    newListItem.innerHTML = `\n<span>• ${ingredient.name} ${ingredient.qty} ${ingredient.unit} </span>\n<a id="${ingredient.name}" class="button delete">Delete</a>\n<a class="button add-to-recipe">Add to recipe</a>\n`;
                    pantryList.appendChild(newListItem);
                }
            }
        }
    }

    function displayInputRecipe() {
        ingredientsList.innerHTML = "";

        for (let ingredient of tempRecipe.ingredients) {
            if(ingredient.qty){
                let newListItem = document.createElement('li');
                newListItem.innerHTML = `\n<span>• ${ingredient.name} ${ingredient.qty} ${ingredient.unit} </span>\n<a id="${ingredient.name}" class="button delete">Delete</a>\n`;
                ingredientsList.appendChild(newListItem);
            }
        }
    }
// *****************************************************************WORKING_HERE*****************************************************************
// const searchRegex = /^[^\s]+|[\s\S]+$/;
//*****************************************************************WORKING_HERE***************************************************************
    function displayRecipes(search=0) {
        recipeList.innerHTML = "";

        
        let regex;
        if (search.length < 2) {
            regex = new RegExp(`^${search}`, 'gi');
        } else {
            regex = new RegExp(`${search}`, 'gi');
        }


        for (let recipe of recipes) {
            if(search.length > 0) {
                if(regex.test(recipe.name)) {
                    let newListItem = document.createElement('li');
                    newListItem.innerHTML = `\n<span>• ${recipe.name} </span>\n<a class="button view-nutrition">Data</a>\n<a id="${recipe.name}" class="button delete">Delete</a>\n<a class="button view-recipe">View</a>\n`;
                    recipeList.appendChild(newListItem);
                }
            } else {
                let newListItem = document.createElement('li');
                newListItem.innerHTML = `\n<span>• ${recipe.name} </span>\n<a class="button view-nutrition">Data</a>\n<a id="${recipe.name}" class="button delete">Delete</a>\n<a class="button view-recipe">View</a>\n`;
                recipeList.appendChild(newListItem);
            }
        }
    }

    function resetInputsExceptFor(...exceptions) {
        const inputs = Array.from(allInputs);
        const selects = Array.from(allSelects);
        
        inputs.forEach(input => {
            if(! exceptions.includes(input.id)) input.value = "";
        });

        selects.forEach(select => {
            if(! exceptions.includes(select.id)) select.value = "";
        });
    }

    // Form field validation function
    function isInputInvalid(el, input, expression) {
        // Regex array - 0 for min length 3 test, 1 for number test.
        const regex = [/.{3,}/gi, /^[+-]?\d*\.?\d+$/gi, /./gi ];

        if(regex[expression].test(input)) {
            el.classList.remove('invalid');
            el.setCustomValidity('');
            
        } else {
            el.classList.add('invalid');
            el.setCustomValidity(`${REGEX_EXP['errorMsg'][expression]}`);
        }
        document.getElementById('forms').reportValidity();
    }


    function getIngredientData(recipe) {
        const BASE_URL = 'https://api.edamam.com/api/nutrition-data?';
                
        let recipeLookup = recipes.find(element => element.name === recipe);
        
        
        for (let ingredient of recipeLookup.ingredients) {
            
            if(!ingredient.nutrition) {
                let ingredientToStr = `${ingredient.qty} ${ingredient.unit} ${ingredient.name}`;
                let url = `${BASE_URL}app_id=${APP_ID}&app_key=${API_KEY}&nutrition-type=logging&ingr=${ingredientToStr}`;

                fetch(url)
                .then(function(data) {
                    return data.json();
                })
                .then(function(responseJson) {
                    console.log(responseJson)
                    ingredient.nutrition = responseJson;

                    let textWithNoSpaces = ingredient.name.replace(" ", "")
                    let newListItem = document.createElement('li');

                    // newListItem.style.opacity = 0;
                    
                    newListItem.classList.add(textWithNoSpaces);

                    newListItem.innerHTML = `<br>• ${ingredient.nutrition.ingredients[0].text} <br>
                    Calories: ${ingredient.nutrition.calories} <br>
                    ${ingredient.nutrition.totalNutrients.PROCNT.label}: ${ingredient.nutrition.totalNutrients.PROCNT.quantity.toFixed(2)} ${ingredient.nutrition.totalNutrients.PROCNT.unit} <br>
                    ${ingredient.nutrition.totalNutrients.SUGAR.label}: ${ingredient.nutrition.totalNutrients.SUGAR.quantity.toFixed(2)} ${ingredient.nutrition.totalNutrients.SUGAR.unit} <br> <br>`;

                    document.getElementById('nutrition-data').appendChild(newListItem);

                    // let animateDisplay = setInterval(function() {
                    //     // if(newListItem.style.opacity < 1) 
                    //     newListItem.style.opacity += parseFloat(0.1);
                    //     // else clearInterval(animateDisplay);
                    // }, 5000);

                });
            } else {
                let textWithNoSpaces = ingredient.name.replace(" ", "")
                let newListItem = document.createElement('li');

                // newListItem.style.opacity = 0;
                    
                newListItem.classList.add(textWithNoSpaces);

                newListItem.innerHTML = `<br>• ${ingredient.nutrition.ingredients[0].text} <br>
                Calories: ${ingredient.nutrition.calories} <br>
                ${ingredient.nutrition.totalNutrients.PROCNT.label}: ${ingredient.nutrition.totalNutrients.PROCNT.quantity.toFixed(2)} ${ingredient.nutrition.totalNutrients.PROCNT.unit} <br>
                ${ingredient.nutrition.totalNutrients.SUGAR.label}: ${ingredient.nutrition.totalNutrients.SUGAR.quantity.toFixed(2)} ${ingredient.nutrition.totalNutrients.SUGAR.unit} <br> <br>`;

                document.getElementById('nutrition-data').appendChild(newListItem);

                // let animateDisplay = setInterval(() => {
                //     // if(newListItem.style.opacity < 1) 
                //     newListItem.style.opacity += 0.1;
                //     // else clearInterval(animateDisplay);
                // }, 500);

            }
        }

    }


// });