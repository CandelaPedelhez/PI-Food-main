import React from "react";

export default function Card({image, name, diet}){
    return(
        <div>
            <img src={image} alt="img not found" width="200px" heigth= "250px"/>
            <h3>{name}</h3>
            <h5>{diet}</h5>
        </div>
    )
}