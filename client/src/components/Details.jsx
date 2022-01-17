import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions/index";
import { useEffect } from "react";


export default function Details() {
    const dispatch = useDispatch();
    const recipeId = useParams();
    const myRecipe = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(recipeId.id));
    }, [dispatch]) /* así accedemos al id de la recipe que accedemos  */


    return (
        <div >
            <div>
                {
                    (myRecipe.length === 0) ?
                        <div >
                            <p >Loading ...</p>
                        </div>
                        :
                        <div className="detail">
                            <h1 >{myRecipe.name}</h1>
                            <img src={myRecipe.image} />
                            <h3>Summary</h3>
                            <p >{myRecipe.summary}</p>
                            <h3>Score</h3>
                            <p >{myRecipe.score}</p>
                            <h3>Health Score</h3>
                            <p >{myRecipe.healthScore}</p>
                            <h3 >Diets</h3>
                            {
                                (myRecipe.diets) ?
                                    <p>{myRecipe.diets.map(r => (<li>{r} </li>))}</p> :
                                    <p>{myRecipe.typesofDiets.map((s) => (<li>{s.name}</li>))}</p>
                            }
                            <h3 >Step-by-Step</h3>
                            {
                                (myRecipe.stepbyStep !== "") ?
                                    <p>{myRecipe.stepbyStep}</p> :
                                    <p>You didn't load any</p>
                            }

                        </div>
                }
            </div>
            <div>
                <Link to="/home">
                    <button className="back_button">Go back!</button>
                </Link>
            </div>
        </div>
    )
}