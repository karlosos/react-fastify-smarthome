import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import InfoField from '@components/Authors/cards/Hanna/InfoField.jsx'
import Header from '@components/Authors/cards/Hanna/Header.jsx'
import InfoIcon from '@components/Authors/cards/Hanna/InfoIcon.jsx'
import InfoLink from './InfoLink.jsx'

const useStyles = makeStyles(() => ({
  section: {
    color: 'white',
    backgroundColor: '#D3D3D3',
    padding: '10px',
    alignItems: 'center',
    minWidth: '400px',
    textAlign: 'center',
    borderRadius: '10%',
    boxShadow: '0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    '&:hover': {
      background: 'white'
    }
  }
}))

const Section = (props) => {
  const classes = useStyles()

  return (
    <Grid container direction="column" alignItems="center" justify="center" className={classes.section}>
      {props.children}
    </Grid>
  )
}

Section.InfoField = InfoField
Section.Header = Header
Section.InfoIcon = InfoIcon
Section.InfoLink = InfoLink

export default Section
