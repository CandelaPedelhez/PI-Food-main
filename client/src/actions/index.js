import axios from "axios";

export function getAllRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes"); /* acá se conecta back y front */
        return dispatch({
            type: "GET_ALL_RECIPES",
            payload: json.data
        })
    }
}

export function getRecipesByName(payload){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipes?name=" + payload);
            return dispatch({
                type: "GET_RECIPES_BY_NAME",
                payload: json.data
            })
        } catch(error){
        console.log(error)
        }
    }
}

export function getDiets(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/types");
        return dispatch({
            type: "GET_DIETS",
            payload: json.data
        })
    }
}

/* export function postRecipe (payload) {
    return function (dispatch) {
        axios.post(`http://localhost:3001/recipe`, payload)
            .then((e) =>  e)
            .catch((err) => {
                console.error(err)
            })
    }
} */

export function postRecipe(payload){
    return async function(dispatch){
        try{
            var json = await axios.post("http://localhost:3001/recipe", payload);
            console.log("este es el post", json)
            return{
                type: "POST_RECIPE",
                json
            }
        } catch(error){
            console.log(error)
        }
    }
}

export function filterRecipesByDiets(payload){
    return{
        type: "FILTER_BY_DIETS",
        payload
    }
}

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    }
}
export function orderByScore(payload){
    return {
        type: "ORDER_BY_SCORE",
        payload
    }
}

export function getDetails(payload){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/recipes/" + payload);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(e){
            console.log(e)
        }
    }
}