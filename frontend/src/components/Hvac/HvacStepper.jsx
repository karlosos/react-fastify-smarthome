/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Stepper } from '@material-ui/core'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'

const HvacStepper = ({ activeStep, steps, getStepContent, classes, handleBack, handleNext }) => {
  const { t } = useTranslation()

  return (
    <Stepper activeStep={activeStep} orientation='vertical'>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            {getStepContent(index, classes)}
            <div className={classes.actionsContainer}>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  {t('hvac:back-button')}
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? t('hvac:finish-button') : t('hvac:next-button')}
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  )
}

export default HvacStepper
