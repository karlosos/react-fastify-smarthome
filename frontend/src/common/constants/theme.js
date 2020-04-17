import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3e3e3e'
    },
    secondary: {
      main: '#ffc400'
    },
    contrastThreshold: 3,
    background: {
      default: '#fafafa',
      paper: '#fff',
      level1: '#fafafa',
      level2: '#f6f6f6'
    }
  }
})

export default theme
