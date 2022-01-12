import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllRecipes } from "../actions";
import {Link} from 'react-router-dom'
import Card from './Card'
import Paginado from "./Paginado";

export default function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector(state => state.recipes) /* traeme todo el state de recipes */
    const [currentPage, setCurrentPage] = useState(1); /* seteamos la pagina actual */
    const [recipesPerPage, setRecipesPerPage] = useState(9); /* guardamos cuántos personajes por página */
    const indexOfLastRecipe = currentPage * recipesPerPage; /* última receta de la página */
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage /* acá nos da la primer receta de cada pag */
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);/* acá nos muestra todas las recetas de la página actual */

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getAllRecipes())
    },[dispatch]) /* el [] es la dependencia */

    function handleClick(e){
        e.preventDefault();
        dispatch(getAllRecipes());
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
                    <option value= 'All'>All</option>
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
                <Paginado
                recipesPerPage = {recipesPerPage}
                allRecipes = {allRecipes.length}
                paginado = {paginado}
                />
                {
                    currentRecipes?.map(e => {
                        return(
                            <fragment>
                                <Link to = {"/home/" + e.id}>
                                    <Card name={e.name} image= {e.image} diets= {e.diets}/>
                                </Link>
                            </fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}