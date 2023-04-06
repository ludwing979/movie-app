import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'
import { Container } from './Navbar'

import '../styles/Videos.css'

import NoImg from '../Images/NoImage.jpg'
import Trailers from '../Trailers/Trailers'

function Movies() {
  const { toggle, inputValue } = useContext(Container)
  const [moviesData, setMoviesData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [movieTitle, setMovieTitle] = useState('')
  const shown = inputValue ? 'search' : 'discover'
  const Api = `https://api.themoviedb.org/3/${shown}/movie`
  const Images = "https://image.tmdb.org/t/p/w500"
  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: '67ac021e36d2e8ea79e7872bdc92a551',
        query: inputValue
      }
    })
    setMoviesData(data.data.results);
  }
  useEffect(() => {
    MovieCall()
  }, [inputValue])

  const MovieTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }
  return (
    <>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className='movies-container'>
        {moviesData.map(movie => (
          <div key={movie.id} id={trailer ? 'container' : 'NoContainer'}>
            <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => MovieTitle(movie)} />
            <img src={movie.poster_path ? `${Images}${movie.poster_path}` : NoImg} alt="" onClick={() => MovieTitle(movie)} />
            <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'}>{movie.title}</h3>
          </div>
        ))}
          {trailer ? '' : <Trailers title={movieTitle} />}
          <AiOutlineClose
            id={trailer ? 'Nothing' : 'Exit1'}
            className={toggle ? 'DarkTheme' : 'LightThemeClose'}
            fontSize={55}
            color={toggle ? '#fff' : '#000'}
            onClick={() => setTrailer(!trailer)} 
          />
        </div>
      </div>
    </>
  )
}

export default Movies