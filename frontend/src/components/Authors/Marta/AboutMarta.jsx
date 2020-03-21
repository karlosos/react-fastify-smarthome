import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid } from '@material-ui/core'
import Particles from 'react-particles-js'
import { useStyles, particlesOptions, ColorCircularProgress } from './index'

import Card from './Card.jsx'

const AboutMarta = () => {
  const defaultData = {
    id: 1,
    name: '',
    github: '',
    avatar: ''
  }
  const [authorState, setAuthorState] = useState(defaultData)

  useEffect(() => {
    axios.get(`/api/v1/authors/${authorState.id}`)
      .then(res => { setAuthorState(res.data) })
      .catch(err => { throw err })
  }, [])

  const classes = useStyles()
  return (
    <div className={classes.root} data-testid='about-marta'>
      <Particles className={classes.particles} params={particlesOptions} />
      <Grid container justify='center' alignItems='center' direction='row'>
        {
          !authorState.id
            ? <ColorCircularProgress />
            : <Card authorState={authorState} />
        }
      </Grid>
    </div>
  )
}

export default AboutMarta
