import React from "react";
import { useState, useEffect } from "react";
import { postRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function CreateRecipe() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const diets = useSelector((state) => state.diets);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    const [input, setInput] = useState({ /* input = estado local */
        name: "",
        summary: "",
        score: 0,
        healthScore: 0,
        stepbyStep: "",
        image: "",
        diets: []
    });

    function handleChange(e) {
        setInput((input) => ({
            ...input,
            [e.target.name]: e.target.value,
            diet: e.target.value,
        }));
    }

    function handleSelect(e) {
        setInput((input) => ({
            diets: [...input.diets, e.target.value]
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(input));
        setInput({
            name: "",
            summary: "",
            score: 0, 
            healthScore: 0,
            stepbyStep: "",
            image: "",
            diets: []
        });
        alert("Recipe created");
        navigate("/home")
    }

    return (
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Create your own recipe</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Summary</label>
                    <input type="text" value={input.summary} name="summary" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Score</label>
                    <input type="number" value={input.score} name="score" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Health-Score</label>
                    <input type="number" value={input.healthScore} name="healthScore" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Step-by-Step</label>
                    <input type="text" value={input.stepbyStep} name="stepbyStep" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)} />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {diets.map((diet) => {
                        return <option value={diet.name}>{diet.name}</option>
                    })}
                </select>
                {<ul><li>{input.diets.map(e => e + ", ")}</li></ul>}
                <button type="submit">Create recipe</button>
            </form>
        </div>
    )
}