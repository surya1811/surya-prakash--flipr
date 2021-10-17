import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import React from 'react';
import Component from './Component';
function App() {
  
  const [searchText, updateSearchtext] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriteTitles, setFavoriteTitles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [delay, setDelay] = useState(2000);
  const [showMovies, setShowMovies] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(()=> {
    const interval = setTimeout(() => {
    var link = "http://www.omdbapi.com/?apikey=23be8554&s=" + searchText + "&page=" + page.toString();
    console.log(link);
    
      fetch(link)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.Response)
            {
              // setTimeout(
              //   setItems(result.Search), 5000
              // )
              setItems(result.Search);
              var fetchedTotal = result.totalResults;
              fetchedTotal = Math.ceil(fetchedTotal/10);
              console.log(fetchedTotal);
              setTotalPages(fetchedTotal);
              console.log(searchText, items);
            }
            
          },

          (error) => {
            setError(error);
          }
        )
        }, delay);
       
      
  }, [searchText, favoriteTitles, page]);

  function searchBox(event)
  {
    var inputText = event.target.value;

    updateSearchtext(inputText);
    setPage(1);
    setDelay(2000);
    console.log(inputText, searchText);
  }

  function addFavorite(id){
    setFavorites([...favorites,items[id]]);
    setFavoriteTitles([...favoriteTitles, items[id].Title]);
    console.log("favorites", favorites, items[id]);
  }

  function deleteFavorite(id){
    setFavorites(prevFavorites => {
      return prevFavorites.filter((prevItem, index) => {
        return prevItem.Title !== items[id].Title;
      })
    });
    
    setFavoriteTitles(prevTitles => {
      return prevTitles.filter((prevItem, index) => {
        console.log(prevItem, items[id].Title);
        return prevItem!== items[id].Title;
      })
    })

    console.log(favoriteTitles);
    console.log(favorites);
  }

  function add1() {
    var curr = page;
    if(curr<totalPages) {
      console.log(totalPages);
      setPage(curr+1);
      setDelay(100);
    }
  }

  function sub1() {
    var curr = page;
    if(curr>1) {
      setPage(page-1);
      setDelay(100);
    }
  }

  function showChange(){
    if(showMovies)
    {
      setShowFavorites(true);
      setShowMovies(false);
    }
    else 
    {
      setShowMovies(true);
      setShowFavorites(false);
    }
  }

  return (
    <div>
      <button onClick={showChange} className="card"><h1>Movies</h1></button>
      <button onClick={showChange} className="card"><h1>Favorites</h1></button>
      <hr></hr>
      <input type="text" id="search" onChange={searchBox} value={searchText}></input>
      {
        showMovies && <div>
          <button onClick={sub1} className= "foot2">Previous</button>
          <button onClick={add1} className= "foot2">Next</button>
        </div>
      }

      {
        
        showMovies && items && items.map((item, index)=>{
          return <Component
          Title = {item.Title}
          key = {index}
          id = {index}
          Year = {item.Year}
          Type = {item.Type}
          addToFavorite = {addFavorite}
          favoriteList = {favoriteTitles}
          deleteFromFavorites = {deleteFavorite}
          ></Component>
        })
        
      }

      {
        
        showFavorites && favorites && favorites.map((item, index)=>{
          return <Component
          Title = {item.Title}
          key = {index}
          id = {index}
          Year = {item.Year}
          Type = {item.Type}
          addToFavorite = {addFavorite}
          favoriteList = {favoriteTitles}
          deleteFromFavorites = {deleteFavorite}
          ></Component>
        })
        
      }

      {
        showMovies && <div>
          <button onClick={sub1} className= " foot">Previous</button>
          <button onClick={add1} className = "foot">Next</button>
        </div>
      }
      <h1>Favorites</h1>
      {
        favorites && favorites.map((item, index) => {
          return <p>{item.Title}</p>
        })
      }
    </div>
  );
}

export default App;
