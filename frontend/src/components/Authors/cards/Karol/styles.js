import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  paper: {
    padding: '1em'
  },
  avatar: {
    width: '200px',
    height: '200px',
    border: '5px solid white',

    '&:hover': {
      border: '5px solid #21CBF3',
      cursor: 'pointer'
    }
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  name: {
    marginTop: '1em',
    color: '#fafafa'
  },
  body: {
    margin: 0
  },
  header: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    backgroundColor: '#0099ff',
    paddingTop: '1.5em',
    marginBottom: '-100px'
  },
  wave: {
    marginBottom: '-5px'
  },
  wave_bottom: {
    marginBottom: '-5px',
    marginTop: '-150px'
  },
  content: {
    padding: '50px',
    margin: '-24px'
  },
  button: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
  },
  icon: {
    marginRight: '1em'
  },
  social_links_header: {
    margin: '8px'
  },
  about_me_header: {
    marginBottom: '8px'
  },
  highlight: {
    color: '#2196F3',
    fontWeight: 'bold'
  },
  illustration: {
    marginTop: '-100px',
    width: '40%'
  }
})

export default useStyles
