import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import InfoField from '@components/Authors/Hanna/InfoField.jsx'
import Header from '@components/Authors/Hanna/Header.jsx'

const useStyles = makeStyles(theme => ({
  section: {
    display: 'flex',
    color: 'black',
    backgroundColor: 'white',
    width: '45%',
    margin: '10px'
  }
}))

const Section = (props) => {
  const classes = useStyles()

  return (
    <Card className={classes.section}>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  )
}

Section.InfoField = InfoField
Section.Header = Header

export default Section