import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, filterRecipesByDiets, orderByName, orderByScore} from "../actions";
import { Link } from "react-router-dom"
import Card from "./Card"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes); /* traeme todo el state de recipes */
    const [currentPage, setCurrentPage] = useState(1); /* seteamos la pagina actual */
    const [recipesPerPage, setRecipesPerPage] = useState(9); /* guardamos cuántos personajes por página */
    const indexOfLastRecipe = currentPage * recipesPerPage; /* última receta de la página */
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage /* acá nos da la primer receta de cada pag */
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);/* acá nos muestra todas las recetas de la página actual */
    const [order, setOrder] = useState("");


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getAllRecipes())
    }, [dispatch]) /* el [] es la dependencia */

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllRecipes());
    }
    function handleFilterDiets(e) {
        dispatch(filterRecipesByDiets(e.target.value))
        e.preventDefault()
    }
    function handleSortName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`) /* Si no seteamos el estado nunca nos lo renderiza */
    }
    function handleSortScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    return (
        <div className="container_menu">
            <h1>Feed-me</h1>
            <Link to="/recipe">Crear Receta</Link>
            <div className="container_search">
                <SearchBar/>
                <select onChange={e => handleSortName(e)}>
                    <option value="">Order by name</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <select onChange={e => handleSortScore(e)}>
                <option value="">Order by Score</option>
                    <option value="higher score">Higher Score</option>
                    <option value="lower score">Lower Score</option>
                </select>
                {
                    <select onChange={e => handleFilterDiets(e)}>
                        <option value="">Choose a diet</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option value="dairy free">Dairy Free</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="fodmap friendly">Fodmap friendly</option>
                        <option value="whole30">Whole30</option>
                    </select>
                }
                <button className="search_button" onClick={e => handleClick(e)} >
                    Delete filters
                </button>
                </div>
                <div>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
                <div className="recetas">
                    {
                        (currentRecipes)? currentRecipes.map(e => (
                            (e.diets) ?
                                <fragment>
                                    <Link className="container_receta" to={"/recipes/" + e.id}>
                                        <Card name={e.name} image={e.image} diets={e.diets.map((s) => (<li>{s}</li>))} />
                                    </Link>
                                </fragment> :
                                <fragment>
                                <Link className="container_receta" to={"/recipes/" + e.id}>
                                    <Card name={e.name} image={e.image} diets={e.typesofDiets.map((s) => (<li>{s.name}</li>))} />
                                </Link>
                            </fragment>

                        )) : <p >Loading ...</p>
                    }
                </div>
            </div>
        </div>
    )
}