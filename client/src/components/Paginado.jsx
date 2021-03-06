import React from 'react';

export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for( let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav className='paginador'>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return(
                            <li key={number}>
                                <button onClick={() => paginado(number)} key={number} className='button'>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
