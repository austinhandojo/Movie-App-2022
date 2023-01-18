
import './components/scss/Thumbnail.scss';
import './components/scss/Description.scss';

import Star from './components/images/Gold_Star.svg';
import React, {useState} from 'react';
import Close from './components/images/close.svg';
const API_IMG="https://image.tmdb.org/t/p/w500/";

const Thumbnail =({id,name, poster_path, vote_average, first_air_date, overview, backdrop_path})=>{
    const [show, setShow]=useState(false);

    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);
    // this renders the thumbnail of movies and tv shows
    
        return(
            // when clicked the popup modal shows
            <div className="cell large-2 results">
                <div  onClick={()=> document.getElementsByClassName(id)[0].style.display = 'initial'}>
                    <img className="poster" src={API_IMG+poster_path}/>
                    <p className="title">{name}</p>
                    <div className="rating grid-x">
                        <p>Action, Drama</p>
                        <div className="grid-x">
                            <img src={Star}/>
                            <p>{vote_average}</p>
                        </div>
                        
                    </div>
                </div>
                <div className={"description-modal"+" "+id} id="modal" style={{ backgroundImage:'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),'+`url(${API_IMG+backdrop_path})`  }}>
                    <div className="grid-y top-section" >
                        {/* this button will close the modal */}
                        <button onClick={()=> document.getElementsByClassName(id)[0].style.display = 'none'}><img className="close" src={Close}/></button>
                        <div className="grid-x">
                            <div className="large-3 small-12 poster-container">
                                <img className="description-poster" src={API_IMG+poster_path}/>
                            </div>
                            <div className="grid-y medium-9">
                                <div className="grid-x">
                                    <div className="large-5 small-12">
                                        <p className="title">{name}</p>
                                    </div>
                                    <div className="grid-y large-7 small-12 release-container">
                                        
                                    </div>
                                </div>
                                <p>{overview}</p>
                                
                                <div className="grid-x">
                                    <img className="star" src={Star}/>
                                    <p>{vote_average}</p>
                                </div>
                                <p>Release Date: {first_air_date}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="trailer-section grid-y">
                        <p>Trailer</p>
                        <div className="video-container">
                        <iframe src="https://www.youtube.com/embed/DotnJ7tTA34" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div> */}
                </div>
            </div>
            
            )
    }

    export default Thumbnail;