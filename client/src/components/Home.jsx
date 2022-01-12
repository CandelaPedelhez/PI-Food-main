import React, { Fragment } from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getRecipes } from "../actions";
import {Link} from 'react-router-dom'
import Card from './Card'

export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector(state => state.recipes) /* traeme todo el state de recipes */
    
    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch]) /* el [] es la dependencia */

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    return(
        <div>
            <Link to= '/recipe'>Crear Receta</Link>
            <h1>Feed-me</h1>
            <button onClick={e => handleClick(e)}>
                Reload all recipes
            </button>
            <div>
                <select>
                    <option value= 'asc'>Ascending</option>
                    <option value= 'desc'>Descending</option>
                </select>
                <select>
                    <option value= 'descP'>Higher Score</option>
                    <option value= 'ascP'>Lower Score</option>
                </select>
                <select>
                    <option value= 'All'>Todas</option>
                    <option value= 'gluten free'>Gluten Free</option>
                    <option value= 'ketogenic'>Ketogenic</option>
                    <option value= 'vegetarian'>Vegetarian</option>
                    <option value= 'lacto vegetarian'>Lacto-Vegetarian</option>
                    <option value= 'ovo vegetarian'>Ovo-Vegetarian</option>
                    <option value= 'vegan'>Vegan</option>
                    <option value= 'pescetarian'>Pescetarian</option>
                    <option value= 'paleolithic'>Paleo</option>
                    <option value= 'primal'>Primal</option>
                    <option value= 'low FODMAP'>Low FODMAP</option>
                    <option value= 'whole30'>Whole30</option>
                </select>
                {
                    allRecipes?.map(e => {
                        return(
                            <fragment>
                                <Link to = {"/home/" + e.id}>
                                    <Card name={e.name} image= {e.image} diet= {e.diet}/>
                                </Link>
                            </fragment>
                            
                        )

                    })
                }
            </div>
        </div>
    )
}