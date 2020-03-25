import React from 'react'
import useStyles from './styles'

const WaveLower = () => {
  const classes = useStyles()

  return (
    <svg className={classes.wave_bottom} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
      <path fill='#0099ff' fillOpacity='1' d='M0,192L48,176C96,160,192,128,288,149.3C384,171,480,245,576,245.3C672,245,768,171,864,170.7C960,171,1056,245,1152,250.7C1248,256,1344,192,1392,160L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z' />
    </svg>
  )
}

export default WaveLower
