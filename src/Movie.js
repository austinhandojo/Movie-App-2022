import './App.scss';
import React,{useState,useEffect} from 'react';
import Logo from './components/images/Logo.svg';
import Thumbnail from './Thumbnail';
import './components/scss/Home.scss';
import pagelogo from './components/images/page.svg'
var moviepagenumber = localStorage.getItem("moviepagenow");
if(moviepagenumber==null){
    moviepagenumber=1;
    localStorage.setItem("moviepagenow", moviepagenumber);

}
console.log(moviepagenumber);
const MOVIEAPI_URL="https://api.themoviedb.org/3/discover/movie?api_key=bdcf29627bbcab50f99211c0bb3a93c8&language=en-US&sort_by=popularity.desc&page="+moviepagenumber;
function Tv() {
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


  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  function clearpage(){
    localStorage.clear();
  }
  function prevpage(){
    if(moviepagenumber==1){
        moviepagenumber=1;
        localStorage.setItem("moviepagenow", moviepagenumber);

    }else{
        moviepagenumber--;

        localStorage.setItem("moviepagenow", moviepagenumber);
        window.location.reload(false);


    }
    console.log(moviepagenumber);
  }
  function nextpage(){
    moviepagenumber++;
    localStorage.setItem("moviepagenow", moviepagenumber);
    console.log(moviepagenumber);
    window.location.reload(false);

  }
  return (
    
    <div className="Homepage">
            {/* menubar */}
            <div className="grid-x menubar">
                <div className="cell medium-8 logo">
                    <img className="logo" src={Logo}/>
                </div>
                <div className="cell medium-4 grid-x show-for-large">
                    <a className="menu" href="/" onClick={clearpage}>HOME</a>
                    <a className="menu" href="/movie" onClick={clearpage}>MOVIES</a>
                    <a className="menu" href="/tv" onClick={clearpage}>TV SHOWS</a>
                </div>
                <div className="hide-for-large mobile-menu">
                <ul class=" menu " data-dropdown-menu>
                    <li><a href="/" onClick={clearpage}>HOME</a></li>
                    <li><a href="/movies" onClick={clearpage}>MOVIES</a></li>
                    <li><a href="/tv" onClick={clearpage}>TV SHOWS</a></li>
                    
                </ul>
                </div>
            </div>
            {/* different sections for movies and tv shows, data will be pulled from seperate components */}
            <div className="section">
                <h1 className="section-title">Movies</h1>
                <div className="grid-x">
                {movies.map((movieReq)=>
          <Thumbnail key={movieReq.id} {...movieReq}/>)}
                </div>
            </div>
            <div className='pagenav grid-x'>
                <div className='prev' onClick={prevpage}>
                    <img className="prevlogo" src={pagelogo}/>
                </div>
                <div className='next' onClick={nextpage}>
                    <img className="nextlogo" src={pagelogo}/>   
                </div>
            </div>
        </div>
        
  );
}

export default Tv;
