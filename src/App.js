import './App.css'
import SearchIcon from './search.svg';
import { useEffect, useState } from 'react';
import Cards from './components/Cards';

// b6dd42cb => API KEY

const API_URL = "http://www.omdbapi.com?apikey=b6dd42cb"

// const movie1={
//   "Title": "Jurassic Park: Chaos Island",
//   "Year": "1997",
//   "imdbID": "tt1306984",
//   "Type": "game",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjcxMTliZjgtMWU5ZC00N2Y0LWIwMTgtOWNlNmQ1MWE5MTA1XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"
// }
function App() {
    const [movies,setMovies] = useState([])
    const[searchTerm,setSearchTerm] =useState('')
    const searchMovies = async (title) => {
      const response =await fetch(`${API_URL}&s=${title}`)
      const data = await response.json();
      // console.log(data.Search);
      setMovies(data.Search);
    }
    
    useEffect(()=> {
      searchMovies();
    }, [])
 
  return (
    <div className='app'>
      <h1>MovieHub</h1>
      <div className='search'>
        <input
        placeholder='Search for movies'
        value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}
        />
        <img 
        src={SearchIcon}
        alt ="search"
        onClick={()=>searchMovies(searchTerm)}
        />
      </div>
      <div className='container'>
      {movies?.length > 0 ? (movies.map((movie)=>(<Cards key={movie.imdbID}  movie = {movie}/>))) : (<div className='empty'> <h2>No Movies Found</h2></div>)}
      </div>
    </div>
  );
}

export default App;
