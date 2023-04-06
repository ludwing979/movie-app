import movieTrailer from 'movie-trailer'
import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Container } from '../components/Navbar'

import '../styles/TrailerMovie.css'

const Trailers = ({ title }) => {
  const {toggle} = useContext(Container)
  const [video, setVideo] = useState("")
  const [videoURL, setVideoURL] = useState("")

  const handleSearch = () => {
    setVideo(title)
    movieTrailer(video).then(res => {
      setVideoURL(res)
    })
  }
  useEffect(() => {
    handleSearch()
  }, [videoURL])
  

  return (
    <>
      <div className='Container'>

      </div>
      <div className='player'>
        <h1 id={toggle ? 'TrailerMovie-name-dark' : 'TrailerMovie-name-light'}>{title}</h1>
        <ReactPlayer
          url={videoURL}
          controls={true}
          width='1000px'
          height='700px'
          muted={false} 
        />
      </div>
    </>
  )
}

export default Trailers