import React from 'react';
export const Character = ({ name, films, tvShows, id }) => {
    console.log( name, films, tvShows)
    return ( <>
        <h3>{name}</h3> 
        <div className="character">
        <ul>
            <li> films: {films} </li>
            <li> tv shows: {tvShows} </li>
        </ul>
        </div>
        </>
    )
}