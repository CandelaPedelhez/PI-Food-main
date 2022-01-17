import React from "react";
import { useState, useEffect } from "react";
import { postRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "A name is required"
    }
    if (!input.summary) {
        errors.summary = "A summary is required"
    }
    if (input.score > 100) {
        errors.score = "The score is up to 100"
    }
    if (input.healthScore > 100) {
        errors.healthScore = "The healthScore is up to 100"
    }
    return errors
}

export default function CreateRecipe() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const diets = useSelector((state) => state.diets)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({ /* input = estado local */
        name: "",
        summary: "",
        score: 50,
        healthScore: 50,
        stepbyStep: "",
        image: "",
        diets: []
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleDelete(e, d) {
        e.preventDefault();
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== d),
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(input))
        setInput({
            name: "",
            summary: "",
            score: 50,
            healthScore: 50,
            stepbyStep: "",
            image: "",
            diets: []
        });
        alert("Recipe created");
        navigate("/home")
    }

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);


    return (
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Create your own recipe</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name *</label>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Summary *</label>
                    <input type="text" value={input.summary} name="summary" onChange={(e) => handleChange(e)} />
                    {errors.summary && (
                        <p>{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label>Score</label>
                    <input type="number" value={input.score} name="score" onChange={(e) => handleChange(e)} />
                    {errors.score && (
                        <p>{errors.score}</p>
                    )}
                </div>
                <div>
                    <label>Health-Score</label>
                    <input type="number" value={input.healthScore} name="healthScore" onChange={(e) => handleChange(e)} />
                    {errors.healthScore && (
                        <p>{errors.healthScore}</p>
                    )}
                </div>
                <div>
                    <label>Step-by-Step</label>
                    <input type="text" value={input.stepbyStep} name="stepbyStep" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                <select onChange={(e) => handleSelect(e)}>
                    {diets.map((diet) => {
                        return <option value={diet.name}>{diet.name}</option>
                    })}
                </select>
                {
                    input.diets.map(d =>
                        <div>
                            <p>{d}</p>
                            <button onClick={(e) => handleDelete(e, d)}>X</button>
                        </div>)
                }
                </div>
                <button type="submit">Create recipe</button>
            </form>
            <div>
                <h5>Those with * are obligatory</h5>
            </div>
        </div>
    )
}