import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'
import { Container } from './Navbar'

import '../styles/Videos.css'
import NoImg from '../Images/NoImage.jpg'
import Trailers from '../Trailers/Trailers'

function Trends() {
  const {toggle} = useContext(Container)
  const [trailer, setTrailer] = useState(true)
  const [title, setTitle] = useState('')
  const [trendsArray, setTrendsArray] = useState([])
  const Api = 'https://api.themoviedb.org/3/'
  const TrendsUrl = '/trending/all/week'
  const Images = "https://image.tmdb.org/t/p/w500"
  
  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsUrl}`, {
      params: {
        api_key: '67ac021e36d2e8ea79e7872bdc92a551',
      }
    })
    setTrendsArray(data.data.results);
  }
  useEffect(() => {
    Trends()
  }, [])
  const TvTrendTitle = (trend) => {
    setTitle(trend.name ? trend.name : trend.title)
    setTrailer(!trailer)
  }
  
  return (
    <>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className='movies-container'>
        {trendsArray.map(trend => (
          <div key={trend.id} id={trailer ? 'container' : 'NoContainer'}>
            <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TvTrendTitle(trend)} />
            <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg} alt="" onClick={() => TvTrendTitle(trend)} />
            <h3
              id={(trend.name ? trend.name.length > 28 : trend.title.length > 28) ? 'smaller-Text' : ''}
              className={toggle ? 'mainColor' : 'secondaryColor'}
            >{trend.name ? trend.name : trend.title}</h3>
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

export default Trends