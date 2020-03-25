import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { fetchAuthorRequest, fetchAuthorCancel } from '@data/actions/author'
import Showcase from '@components/Authors/cards/Hanna/Showcase.jsx'

const useStyles = makeStyles(() => ({
  info: {
    backgroundColor: '#F5F5F5',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'grayscale(70%)',
    height: '80%',
    width: '100%',
    margin: '0px auto'
  },
  title: {
    width: '50%',
    marginTop: '15px',
    marginLeft: '30px'
  },
  main: {
    height: '100vh',
    resize: 'none',
    overflow: 'hidden'
  },
  motto: {
    height: '100%',
    width: '100%',
    backgroundColor: 'red'
  },
  header: {
    margin: '50px 0px 50px 20px'
  },
  avatar: {
    width: '120px',
    height: '120px'
  },
  name: {
    textTransform: 'uppercase',
    padding: 0,
    margin: '0px',
    color: '#6C5B7B',
    fontSize: 50,
    letterSpacing: 5
  },
  headerDescription: {
    color: '#6C5B7B',
    fontSize: 30,
    fontVariant: 'small-caps',
    padding: 0,
    margin: '0',
    letterSpacing: 2
  },
  quoteSection: {
    height: '20%'
  },
  mainQuote: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: '25px'
  },
  mainQuoteMotto: {
    fontSize: '15px',
    textAlign: 'center',
    letterSpacing: '5px',
    padding: '0px',
    paddingTop: '15px',
    textTransform: 'uppercase'
  }
}))

export default function ShowcaseHanna (props) {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthorRequest(2))
    return () => {
      dispatch(fetchAuthorCancel())
    }
  }, [dispatch])

  const {
    fetchSingleError,
    fetchingSingle,
    author
  } = useSelector((state) => state.author)

  if (fetchingSingle) {
    return <div>Loading...</div>
  }

  if (fetchSingleError) {
    return <div>{fetchSingleError.message}</div>
  }

  return (
    <Grid container direction="column" className={classes.main}>
      <Grid container direction="column" className={classes.info}>
        <Grid container direction="row" className={classes.header}>
          { author && <Avatar
            alt='Avatar'
            aria-label='avatar'
            className={classes.avatar}
            src={author.avatar} />
          }
          <Grid container direction="column" className={classes.title}>
            <p className={classes.name}>Hanna Gałuszka</p>
            <p className={classes.headerDescription}>Junior Fullstack Developer</p>
          </Grid>
        </Grid>
        <Box display="flex" flexDirection="row" alignItems="center" flexWrap="no-wrap" m="0">
          <Box p={4} width="25%">
            <Showcase.Section>
              <Showcase.Section.InfoIcon color="#F67280" iconName="school" />
              <Showcase.Section.Header title='EDUCATION' />
              <Showcase.Section.InfoField infoName='College' infoValue='ZUT' />
              <Showcase.Section.InfoField infoName='City' infoValue='Szczecin' />
              <Showcase.Section.InfoField infoName='Field of study' infoValue='Automation and Robotics' />
              <Showcase.Section.InfoField infoName='Year' infoValue='2017-2020' />
            </Showcase.Section>
          </Box>
          <Box p={4} width="25%">
            <Showcase.Section>
              <Showcase.Section.InfoIcon color="#355C7D" iconName="work" />
              <Showcase.Section.Header title='BASE INFO' />
              {
                author && Object.keys(author).map((key) => (
                  key === 'github' ? <Showcase.Section.InfoLink
                    infoName='Github' infoValue={author.github}></Showcase.Section.InfoLink>
                    : key !== 'avatar' && <Showcase.Section.InfoField
                      key={key}
                      infoName={key}
                      infoValue={author[key]}
                    />
                ))
              }
            </Showcase.Section>
          </Box>
          <Box p={4} width="25%">
            <Showcase.Section>
              <Showcase.Section.InfoIcon color="#6C5B7B" iconName="favorite" />
              <Showcase.Section.Header title='CONTACT' />
              <Showcase.Section.InfoField infoName='Street' infoValue='Przykładowa' />
              <Showcase.Section.InfoField infoName='Home' infoValue='13' />
              <Showcase.Section.InfoField infoName='Zip code' infoValue='99-999' />
            </Showcase.Section>
          </Box>
          <Box p={4} width="25%">
            <Showcase.Section>
              <Showcase.Section.InfoIcon color="#F67280" iconName="contacts" />
              <Showcase.Section.Header title='HOBBY' />
              <Showcase.Section.InfoField infoName='Powerlifting' infoValue='****' />
              <Showcase.Section.InfoField infoName='Cooking' infoValue='***' />
              <Showcase.Section.InfoField infoName='Caligraphing' infoValue='*' />
              <Showcase.Section.InfoField infoName='Coffee' infoValue='*****' />
            </Showcase.Section>
          </Box>
        </Box>
      </Grid>
      <Grid container direction="column" alignContent="center" alignItems="center" className="quoteSection">
        <p className={classes.mainQuoteMotto}>motto</p>
        <p className={classes.mainQuote}>&quot;Whenever you find yourself on the side of the majority, it is time to reform (or pause and reflect).&quot;</p>
      </Grid>
    </Grid>
  )
}
