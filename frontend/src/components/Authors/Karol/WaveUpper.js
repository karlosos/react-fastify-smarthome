import React from 'react'
import useStyles from './styles'

const WaveUpper = () => {
  const classes = useStyles()

  return (
    <svg className={classes.wave} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
      <path fill='#FFF' fillOpacity='1' d='M0,160L80,133.3C160,107,320,53,480,58.7C640,64,800,128,960,149.3C1120,171,1280,149,1360,138.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z' />
    </svg>
  )
}

export default WaveUpper
