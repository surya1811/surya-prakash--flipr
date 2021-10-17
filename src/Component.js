import React, {useState} from 'react'

function Component(props) {

    function addFavorite()
    {
        props.addToFavorite(props.id);
    }

    function deleteFavorite()
    {
        props.deleteFromFavorites(props.id);
    }
    return (
        <div>
            <p>{props.Title}</p>
            <p>{props.Year}</p>
            <p>{props.Type}</p>
            {!props.favoriteList.includes(props.Title) && <button onClick={addFavorite}>Add to Favorite</button>}
            {props.favoriteList.includes(props.Title) && <button onClick={deleteFavorite}>Delete From Favorites</button>}
            <hr></hr>
        </div>
    )
}

export default Component
