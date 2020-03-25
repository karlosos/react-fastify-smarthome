import Marta from './AboutMarta.jsx'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

export default Marta

export const ColorCircularProgress = withStyles({
  root: {
    color: '#fff'
  }
})(CircularProgress)

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignSelf: 'center',
    background: 'linear-gradient(113deg, #ff5edf 0%, rgba(13,156,147,1) 100%)'
  },
  paper: {
    width: 600,
    padding: 20,
    backgroundColor: 'transparent'
  },
  color: {
    color: '#fff'
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25)
  },
  particles: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}))

export const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 650
      }
    }
  }
}
