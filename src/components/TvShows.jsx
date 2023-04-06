import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'

import '../styles/Videos.css'

import NoImg from '../Images/NoImage.jpg'
import { Container } from './Navbar'
import Trailers from '../Trailers/Trailers'

function TvShows() {
  const { toggle, inputValue } = useContext(Container)
  const [showData, setShowData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [title, setTitle] = useState('')
  const shown = inputValue ? 'search' : 'discover'
  const Api = `https://api.themoviedb.org/3/${shown}/tv`
  const Images = "https://image.tmdb.org/t/p/w500"
  const TvShows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: '67ac021e36d2e8ea79e7872bdc92a551',
        query: inputValue
      }
    })
    setShowData(data.data.results);
  }
  useEffect(() => {
    TvShows()
  }, [inputValue])
  const TvShowTitle = (show) => {
    setTitle(show.name)
    setTrailer(!trailer)
  }
  return (
    <>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className='movies-container'>
        {showData.map(show => (
          <div key={show.id} id={trailer ? 'container' : 'NoContainer'}>
            <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TvShowTitle(show)} />
            <img src={show.poster_path ? `${Images}${show.poster_path}` : NoImg} alt="" onClick={() => TvShowTitle(show)} />
            <h3 id={show.name.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'}>{show.name}</h3>
          </div>
        ))}
          {trailer ? '' : <Trailers title={title} />}
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

export default TvShows