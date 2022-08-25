import React from 'react';
import './styles/index.css';
import { LoiAgreement } from '../../lib/interfaces/LoiAgreement';
import { Grid, Modal, Box, Button, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import * as yup from 'yup';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import InputMask from 'react-input-mask';
import wypeLogo from '../../images/wype.svg';
import ryzeLogo from '../../images/ryze_1.png';
import solarLogo from '../../images/logo2.png';
import animationData from '../../lotties/redirect.json';
import Lottie from 'react-lottie';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 0),
      width: '100%',
      backgroundColor: 'white',
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#12ae6d',
      },
      '& .MuiInputLabel-outlined.Mui-focused': {
        color: '#12ae6d',
      },
    },
    form: {
      margin: theme.spacing(2),
      width: '90%',
    },
    leftField: {
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(1),
      },
      marginRight: theme.spacing(0),
    },
    card: {
      overflow: 'auto !important',
      height: '200px',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      backgroundColor: '#12ae6d',
      '&:hover': {
        backgroundColor: '#12ae6d',
      },
    },
    buttonTwo: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  })
);
const schema = yup.object().shape({
  agreement_text: yup.string(),
  agreement_date: yup
    .string()
    .matches(/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/, 'DOB must match format MM/DD/YYYY and be a valid date')
    .required('Date is required'),
});

interface LoiFormProps {
  onAgreementSuccess?: any;
}

interface ClientAgreementFormForLetterOfIntentProps extends LoiFormProps {
  setActiveStep: (page: number) => void;
}

function PaymentConditions() {
  return (
    <ul>
      <li>Solar Company will cover the cost of Wype’s service ($3,000 value).</li>
      <li>
        Credit monitoring is required by Client for $24.95 per month <img src={ryzeLogo} alt="myryze-logo" style={{ height: '1.5em', marginLeft: '5px', marginBottom: '5px' }} />
      </li>
    </ul>
  );
}
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const todayString = mm + '/' + dd + '/' + yyyy;
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
const ClientAgreementForm: React.FC<ClientAgreementFormForLetterOfIntentProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const creditMonitoringLink = `http://app.myryze.com/redirect.asp`;
  const methods = useForm<LoiAgreement>({
    resolver: yupResolver(schema),
    defaultValues: {
      agreement_text: '',
      agreement_date: todayString,
    },
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
 const goToRyze = (e: any) => {
    e.preventDefault();
    window.location.assign(creditMonitoringLink);
  };
  //const title = props.loiOptions && props.loiOptions.agreement_title_text ? props.loiOptions.agreement_title_text : props.leadSource;
  const onSubmit = (e: any) => {
    //e.preventDefault();
    setOpen(true)
    
  };

  return (
    <>
         <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hang Tight!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You're being redirected to myryze.com
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            After enrolling into credit monitoring, your account executive at Wype will reach out to complete your welcome call. We look forward to working with you!
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
      <FormProvider {...methods}>
        <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="text-left client-agreement-contents">
            <div className="client-agreement-invoice-container">
              <div>
                <img src={wypeLogo} alt="Wype logo" className="client-agreement-invoice-img client-agreement-invoice-img-left" />
              </div>
              <div></div>
              <div>
                <img src={solarLogo} alt="" className="client-agreement-invoice-img client-agreement-invoice-img-right" />
              </div>
            </div>
            <h4 className="text-center client-agreement-item" style={{textAlign:'center', marginTop:'5px', fontSize: '20px'}}>Sponsored Credit Repair Agreement</h4>
            <h5 className="text-center client-agreement-item" style={{textAlign:'center'}}>Letter of Intent</h5>
            <p>This Agreement is made and entered into this by and between you ("Client"), Solar Company, and Wype Credit Restoration ("Credit Company").</p>
            <p className="client-agreement-item">1. Services to Be Performed for Client</p>
            <p>Rapid credit restoration.</p>
            <p className="client-agreement-item">2. Payment</p>
            <PaymentConditions />
            <p className="client-agreement-item">3. Term of Agreement</p>
            <p>
              After Client’s credit score is sufficient to be approved for funding, Client promises to return to Solar Company. If Client does not return to Solar Company, Credit Company will bill Client for the full cost of
              service ($3,000). If necessary, proper steps will be taken to collect the balance due which may result in negative credit reporting.
            </p>
            <p>
              In addition, you agree that you will <span className="text-bold text-underline">NOT</span> do the following during Credit Company’s process:
            </p>
            <div>
              <ol>
                <li>Apply for new credit resulting in new inquiries.</li>
                <li>Miss payments on any open and current account.</li>
                <li>Negotiate with creditors to settle debts unless disclosed to Credit Company.</li>
              </ol>
            </div>
            <p>If any of these criteria report for two consecutive months, the Client will be removed from the sponsored program at which point one of the options below will be presented.</p>
            <div>
              <ol>
                <li>Client may enter a paid plan with Credit Company to continue work.</li>
                <div style={{ width: '50%', textAlign: 'center' }}>-or-</div>
                <li>Credit Company will bill Client for full cost of service.</li>
              </ol>
            </div>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} sm={7} className={classes.leftField}>
                <Controller
                  name="agreement_text"
                  control={methods.control}
                  render={({ field }) => <TextField {...field} label="Your Name" variant="standard" fullWidth margin="dense" error={!!methods.formState.errors.agreement_text} helperText={methods.formState.errors.agreement_text ? methods.formState.errors.agreement_text?.message : ''} />}
                />{' '}
              </Grid>
              <Grid item xs={12} sm>
                <Controller
                  name="agreement_date"
                  control={methods.control}
                  render={({ field }) => (
                    <InputMask mask="99/99/9999" disabled={true} {...field}>
                      {({ ...field }) => <TextField {...field} label="Date" variant="standard" fullWidth margin="dense" error={!!methods.formState.errors.agreement_date} helperText={methods.formState.errors.agreement_date ? methods.formState.errors.agreement_date?.message : ''} />}
                    </InputMask>
                  )}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Typography variant="caption" display="block" mt={2} ml={2}>
                * By typing your name and date, you agree to all terms as stated in this Agreement.
              </Typography>
            </Grid>
          </div>
          <div className={classes.buttons}>
              <Button type="submit" variant="contained" style={{ marginTop: '0.3rem' }} color="primary" className={classes.button}>
                Next
              </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default ClientAgreementForm;
