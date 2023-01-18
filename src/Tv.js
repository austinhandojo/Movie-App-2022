import './App.scss';
import React,{useState,useEffect} from 'react';
import Logo from './components/images/Logo.svg';
import TvThumbnail from './TvThumbnail';
import './components/scss/Home.scss';
var tvpagenumber = localStorage.getItem("tvpagenow");
if(tvpagenumber==null){
    tvpagenumber=1;
    localStorage.setItem("tvpagenow", tvpagenumber);

}
console.log(tvpagenumber);
const MOVIEAPI_URL="https://api.themoviedb.org/3/discover/tv?api_key=bdcf29627bbcab50f99211c0bb3a93c8&language=en-US&sort_by=popularity.desc&page="+tvpagenumber;
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
    if(tvpagenumber==1){
        tvpagenumber=1;
        localStorage.setItem("tvpagenow", tvpagenumber);

    }else{
        tvpagenumber--;

        localStorage.setItem("tvpagenow", tvpagenumber);
        window.location.reload(false);


    }
    console.log(tvpagenumber);
  }
  function nextpage(){
    tvpagenumber++;
    localStorage.setItem("tvpagenow", tvpagenumber);
    console.log(tvpagenumber);
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
                <ul class=" menu " data-dropdown-menu>
                    <li><a href="/" onClick={clearpage}>HOME</a></li>
                    <li><a href="/movies" onClick={clearpage}>MOVIES</a></li>
                    <li><a href="/tv" onClick={clearpage}>TV SHOWS</a></li>
                </ul>
                    
                </ul>
                </div>
            </div>
            {/* different sections for movies and tv shows, data will be pulled from seperate components */}
            <div className="section">
                <h1 className="section-title"> Tv Shows</h1>
                <div className="grid-x">
                {movies.map((movieReq)=>
          <TvThumbnail key={movieReq.id} {...movieReq}/>)}
                </div>
            </div>
            <div className='pagenav grid-x'>
                <div className='prev' onClick={prevpage}>
                    <h1>Previous</h1>
                </div>
                <div className='next' onClick={nextpage}>
                    <h1>Next</h1>
                    
                </div>
            </div>
        </div>
        
  );
}

export default Tv;
