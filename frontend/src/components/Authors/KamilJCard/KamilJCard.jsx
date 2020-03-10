import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Stripes from './Stripes'
import Showcase from './Showcase'

import { makeStyles, createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  body: {
    margin: 0,
    padding: 0
  },
  root: {
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0
  },
  stripe: {
    height: '100vh',
    borderRadius: 0,
    background: '#9debff'
  }
})

export default function KamilJCard () {
  const classes = useStyles()
  document.body.className = classes.body
  const [dataState, setDataState] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/v1/authors/3')
      .then(res => { setDataState(res.data) })
      .catch(err => { throw err })
  }, [])

  let theme = createMuiTheme()
  theme = responsiveFontSizes(theme)

  return (
    <Box className={classes.root}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={0}
        >
          <Grid item xs={1}>
            <Stripes left='#0087e4' center='#0096fe' right='#3badfc' />
          </Grid>
          <Grid item xs={10}>
            <Showcase avatar={dataState.avatar} name={dataState.name} github={dataState.github} />
          </Grid>
          <Grid item xs={1}>
            <Stripes left='#3badfc' center='#59d4ff' right='#9debff' />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  )
}
