import './App.scss';
import React,{useState,useEffect} from 'react';
import Logo from './components/images/Logo.svg';
import Thumbnail from './Thumbnail';
import TvThumbnail from './TvThumbnail';
import './components/scss/Home.scss';

const MOVIEAPI_URL="https://api.themoviedb.org/3/movie/popular?api_key=bdcf29627bbcab50f99211c0bb3a93c8";
const TVAPI_URL="https://api.themoviedb.org/3/tv/popular?api_key=bdcf29627bbcab50f99211c0bb3a93c8";

function Home() {
    
  const [movies, setMovies]=useState([]);
  const [tv, setTv]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(MOVIEAPI_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])

  useEffect(() => {
    fetch(TVAPI_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setTv(data.results);
    })
  }, [])


  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    
    <div className="Homepage">
            {/* menubar */}
            <div className="grid-x menubar">
                <div className="cell medium-8 logo">
                    <img className="logo" src={Logo}/>
                </div>
                <div className="cell medium-4 grid-x show-for-large">
                    <a className="menu" href="/">HOME</a>
                    <a className="menu" href="/movie">MOVIES</a>
                    <a className="menu" href="/tv">TV SHOWS</a>
                </div>
                <div className="hide-for-large mobile-menu">
                <ul class=" menu " data-dropdown-menu>
                    <li><a href="/">HOME</a></li>
                    <li><a href="/movie">MOVIES</a></li>
                    <li><a href="/tv">TV SHOWS</a></li>
                    
                </ul>
                </div>
            </div>
            {/* different sections for movies and tv shows, data will be pulled from seperate components */}
            <div className="section">
                <h1 className="section-title">RECOMMENDED MOVIES</h1>
                <div className="grid-x">
                {movies.map((movieReq)=>
          <Thumbnail key={movieReq.id} {...movieReq}/>)}
                </div>
            </div>
            <div className="section">
                <h1 className="section-title">RECOMMENDED TV SHOWS</h1>
                <div className="grid-x">
                {tv.map((tvReq)=>
          <TvThumbnail key={tvReq.id} {...tvReq}/>)}
                </div>
            </div>
            
        </div>

  );
}

export default Home;
