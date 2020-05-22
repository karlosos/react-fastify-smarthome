import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Box from '@material-ui/core/Box'
import StatusBar from './StatusBar.jsx'
import RuleDetails from './RuleDetails.jsx'
import TemperatureSensor from './TemperatureSensor.jsx'
import WindowSensors from './WindowSensors.jsx'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: theme.typography.fontWeightBold
  },
  id: {
    ...theme.typography.caption
  },
  expansionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
}))

const HVACListItem = ({ data }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Box>
          <Box>
            <Typography className={classes.heading}>{data.name ? data.name : t('hvac:name-not-defined') + ' ' + data.id}</Typography>
          </Box>
          <Box flexDirection='row'>
            <Typography className={classes.id}>id: {data.id}</Typography>
            <StatusBar data={data} />
          </Box>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionDetails}>
        <RuleDetails data={data} />
        <TemperatureSensor data={data} />
        <WindowSensors data={data} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default HVACListItem
