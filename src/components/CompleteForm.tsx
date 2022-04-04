import React, { FC } from 'react';
import { Button, Modal, Box, Typography, Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import Lottie from 'react-lottie';
import { useCheckout } from '../lib/context/CreateAccountContext';
import animationData from '../lotties/redirect.json';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      //marginLeft: theme.spacing(1),
      backgroundColor: '#12ae6d',
      '&:hover': {
        backgroundColor: '#12ae6d',
      },
    },
  })
);
interface ICompleteFormProps {
  setActiveStep: (activeStep: number) => void;
  user?: any;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  '@media (max-width: 700px)': {
    width: 300,
  },
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const CompleteForm: FC<ICompleteFormProps> = ({ setActiveStep, user }: ICompleteFormProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const checkoutContext = useCheckout();
  const firstName = checkoutContext.state.createAccountInfo.firstName.replace(/\s/g, '+');
  const lastName = checkoutContext.state.createAccountInfo.lastName.replace(/\s/g, '+');
  const newAddess = checkoutContext.state.createAccountInfo.address.replace(/\s/g, '+');
  const newCity = checkoutContext.state.createAccountInfo.city.replace(/\s/g, '+');
  const phoneNumber = checkoutContext.state.createAccountInfo.phone.replace('-', '');
  const creditMonitoringLink = `http://app.myryze.com/redirect.asp?GUID=BTW1135HKQ8Y&firstname=${firstName}&lastname=${lastName}&email=${checkoutContext.state.createAccountInfo.email}&phone=${phoneNumber}&bill_address=${newAddess}&bill_city=${newCity}&bill_state=${checkoutContext.state.createAccountInfo.state}&bill_zip=${checkoutContext.state.createAccountInfo.zip}`;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  if (open) {
    setTimeout(() => {
      window.location.assign(creditMonitoringLink);
    }, 8000);
  }
  const goToRyze = (e: any) => {
    e.preventDefault();
    window.location.assign(creditMonitoringLink);
  };
  return (
    <>
      <div className="thankyou-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3em' }}>
        <div style={{ fontSize: '1.2em', textAlign: 'center' }}>
          <p>Wype profile successfully created</p>
          <p> Please click "Next" to enroll in the $1 trial for credit monitoring with our partners at MyRyze.com</p>
        </div>
      </div>
      <div className={classes.buttons}>
        <Button type="button" variant="contained" color="primary" className={classes.button} onClick={handleOpen}>
          Next
        </Button>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hang Tight!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You're being redirected to myryze.com
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            After enrolling into credit monitoring, your account executuive at Wype will reach out to complete your welcome call. We look forward to working with you!
          </Typography>
          <Grid container xs={12} spacing={2}>
            <Grid item xs={12} sm={7}>
              <Lottie options={defaultOptions} height={80} width={250} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <div className={classes.buttons} style={{ marginTop: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button type="button" variant="contained" color="primary" className={classes.button} style={{ height: '45px', borderRadius: '10px' }} onClick={goToRyze}>
                  Leave Now
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default CompleteForm;
