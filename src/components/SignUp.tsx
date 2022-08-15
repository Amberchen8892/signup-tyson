import React, { FC, useState } from 'react';
import { Paper, Stepper, Typography, Step, StepLabel, Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { CheckoutProvider } from '../lib/context/CreateAccountContext';
import CreateAccount from './CreateAccount';
import VerifyIdentityForm from './VerifyIdentityForm'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiStepIcon-active': { color: 'red' },
      '& .MuiStepIcon-completed': { color: 'green' },
      '& .Mui-disabled .MuiStepIcon-root': { color: 'cyan' },
      width: '100vw',
    },
    layout: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.down(400 + 16 * 2)]: {
        width: '100%',
      },
      [theme.breakpoints.up(700 + 16 * 2)]: {
        width: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.down(400 + 16 * 2)]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        width: '360px',
      },
      [theme.breakpoints.up(600 + 24 * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
      '& .MuiStepIcon-active': { color: '#12ae6d' },
      '& .MuiStepIcon-completed': { color: '#12ae6d' },
      // '& .Mui-disabled .MuiStepIcon-root': { color: 'cyan' },
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      backgroundColor: '#12ae6d',
    },
  })
);

const steps = ['Create Account', 'Wype Info'];

function SignUp() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div>
      <Grid container item xs={12}>
        <Grid
          item
          sm={12}
          md={12}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
        >
          <main className={classes.layout} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Signup
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <>
                {activeStep === steps.length ? (
                  <>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order confirmation, and will send you an
                      update when your order has shipped.
                    </Typography>
                  </>
                ) : (
                  <>
                    <CheckoutProvider>
                      <div>
                        {activeStep === 0 && <CreateAccount setActiveStep={setActiveStep} />}
                        {activeStep === 1 && <VerifyIdentityForm setActiveStep={setActiveStep} />}
                      </div>
                    </CheckoutProvider>
                    {/* <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                )}
                <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </div> */}
                  </>
                )}
              </>
            </Paper>
          </main>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
