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