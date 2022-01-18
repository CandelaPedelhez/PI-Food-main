const initialState = {
    recipes: [], /* Recetas  para filtrar */
    allRecipes: [], /* Recetas*/
    recipesByScore: [], /* filtrado + ordenamiento */
    recipesByName: [],
    diets: [],
    details: []
}
let filtro = false;
let search = false;

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_ALL_RECIPES":
            filtro = false;
            search = false;
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case "GET_RECIPES_BY_NAME":
            search = true
            return {
                ...state,
                recipes: action.payload
            }

        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload
            }

        case "FILTER_BY_DIETS":
            const allRecipes = state.allRecipes
            const recipes = state.recipes
            const dietsApi = []
            const dietsDb = []
            if(search === true){
                recipes.forEach(e => {
                    if (e.hasOwnProperty("diets") && e.diets.includes(action.payload)) {
                        dietsApi.push(e)
                    }
                })
                recipes.forEach(e => {
                    if (e.hasOwnProperty("typesofDiets")){
                        if(e.typesofDiets.map((c) => c.name).includes(action.payload)) {
                            dietsDb.push(e) 
                        }
                    }
                })
            } else{
                allRecipes.forEach(e => {
                    if (e.hasOwnProperty("diets") && e.diets.includes(action.payload)) {
                        dietsApi.push(e)
                    }
                })
                allRecipes.forEach(e => {
                    if (e.hasOwnProperty("typesofDiets")){
                        if(e.typesofDiets.map((c) => c.name).includes(action.payload)) {
                            dietsDb.push(e) 
                        }
                    }
                })
            }
            const find = dietsApi.concat(dietsDb)
            if (find.length>0) {
                return {
                    ...state,
                    recipes: find,
                    recipesByScore: find,
                    recipesByName: find
                }
            }; 
            filtro = true
            break;

        case "ORDER_BY_NAME":
            if (filtro === true) {
                const sortedRecipeByName = action.payload === "asc" ?
                    state.recipesByName.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (b.name.toLowerCase() > a.name.toLowerCase()) {
                            return -1
                        }
                        return 0
                    }) : state.recipesByName.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        }
                        if (b.name.toLowerCase() > a.name.toLowerCase()) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    recipesByName: sortedRecipeByName
                }
            }
            else {
                const sortedRecipeByName = action.payload === "asc" ?
                    state.recipes.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (b.name.toLowerCase() > a.name.toLowerCase()) {
                            return -1
                        }
                        return 0
                    }) : state.recipes.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        }
                        if (b.name.toLowerCase() > a.name.toLowerCase()) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    recipes: sortedRecipeByName
                }
            }

        case "ORDER_BY_SCORE":
            if (filtro === true) {
                const sortedRecipeByScore = action.payload === "higher score" ?
                    state.recipesByScore.sort(function (a, b) {
                        if (a.score < b.score) {
                            return 1
                        }
                        if (b.score < a.score) {
                            return -1
                        }
                        return 0
                    }) : state.recipesByScore.sort(function (a, b) {
                        if (a.score < b.score) {
                            return -1
                        }
                        if (b.score < a.score) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    recipesByScore: sortedRecipeByScore
                }
            }
            else {
                const sortedRecipeByScore = action.payload === "higher score" ?
                    state.recipes.sort(function (a, b) {
                        if (a.score < b.score) {
                            return 1
                        }
                        if (b.score < a.score) {
                            return -1
                        }
                        return 0
                    }) : state.recipes.sort(function (a, b) {
                        if (a.score < b.score) {
                            return -1
                        }
                        if (b.score < a.score) {
                            return 1
                        }
                        return 0
                    })
                return {
                    ...state,
                    recipes: sortedRecipeByScore
                }
            }
        case "POST_RECIPE":
            return {
                ...state,
            }

            case "GET_DETAILS":
                return{
                    ...state,
                    details: action.payload
                }

        default:
            return state
    }
}
export default rootReducer

/*             allRecipes.forEach(e => {
               if (e.hasOwnProperty("typesofDiets")){
                   const recipesAndDiets = e.typesofDiets.map(c => c.name === action.payload)
                   for(let i=0 ; i< recipesAndDiets.length; i++){
                       dietsDb.push(recipesAndDiets[i])
                   }
               }
           }) */