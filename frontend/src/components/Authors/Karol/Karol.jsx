import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import useStyles from './styles'
import WaveUpper from './WaveUpper'
import LowerWave from './WaveLower'
import Highlight from './Highlight'
import Illustration from './Illustration'

export default function Karol () {
  const defaultData = {
    id: 5,
    name: '',
    github: '',
    avatar: '',
    linkedin: ''
  }
  const [authorData, setAuthorData] = useState(defaultData)

  const classes = useStyles()

  const fetchData = async () => {
    const response = await axios.get('/api/v1/authors/' + authorData.id)
    const data = response.data
    setAuthorData(data)
  }

  useEffect(() => {
    document.body.className = classes.body
    document.title = 'Karol Dzialowski'

    fetchData()
  }, [])

  return (
    <Box data-testid='karol-card'>
      <Box className={classes.header}>
        <Box className={classes.center}>
          <a href={authorData.github}>
            <Avatar className={classes.avatar} alt='Karol Dzialowski' src={authorData.avatar} />
          </a>
        </Box>
        <Box className={classes.center}>
          <Typography className={classes.name} variant='h3' component='h3'>
          Karol Działowski
          </Typography>
        </Box>
        <WaveUpper />
      </Box>

      <Grid className={classes.content} container spacing={3}>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <Typography className={classes.social_links_header} variant='h5'>Social links</Typography>
            <Button className={classes.button} href={authorData.github}>
              <GitHubIcon className={classes.icon} />
              <span>Check me on GitHub</span>
            </Button>

            <Button className={classes.button} href={authorData.linkedin}>
              <LinkedInIcon className={classes.icon} />
              <span>Add me on LinkedIn</span>
            </Button>
          </Paper>
        </Grid>
        <Grid item md={8}>
          <Paper className={classes.paper}>
            <Typography className={classes.about_me_header} variant='h4'> About me </Typography>
            <Typography variant='body1' gutterBottom>
              I'm a journeyman developer trying to learn new things.
              Recently introduced to <Highlight>React</Highlight> and relearning <Highlight>JS</Highlight>.
              I have experience in doing <Highlight>computer vision</Highlight> applications using <Highlight>Python</Highlight> and
              developing gui applications with <Highlight>Qt</Highlight>.
              Aspiring <Highlight>clean code</Highlight> evangelist.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box className={classes.center}>
        <Illustration />
      </Box>

      <LowerWave />
    </Box>
  )
}
