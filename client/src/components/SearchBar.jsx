import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getRecipesByName } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [recipe, setRecipe] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setRecipe(e.target.value) /* el e.target.value es lo que hay en el input */
    }
    function handleSubtmit(e){
        e.preventDefault()
        dispatch(getRecipesByName(recipe))
    }

    return(
        <div>
            <input type= "text" placeholder="Search..." onChange={(e) => handleInputChange(e)}/>
            <button type="submit" onClick={(e) => handleSubtmit(e)}>Search</button>
        </div>
    )
}