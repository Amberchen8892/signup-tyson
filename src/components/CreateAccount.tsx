import React, { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, IconButton, FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { useForm, Controller, FormProvider, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useCheckout } from '../lib/context/CreateAccountContext';
import { CreateAccountInfo } from '../lib/interfaces/CreateAccountInfo';

const options = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO ', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

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
  })
);

const schema = yup.object().shape({
  firstName: yup.string().max(300),
  lastName: yup.string().max(300),
  email: yup.string().email().max(256),
  address: yup.string().max(400),
  phone: yup.string(),
  city: yup.string().max(100),
  state: yup.string(),
  zip: yup.string(),
  repName: yup.string().max(300),
  repEmail: yup.string().max(300),
  repPhone: yup.string().max(256),
  kW: yup.string().max(400),
  loan_amount: yup.string().max(256),
});

interface IShippingFormProps {
  setActiveStep: (page: number) => void;
}

const CreateAccount: FC<IShippingFormProps> = ({ setActiveStep }: IShippingFormProps) => {
  const classes = useStyles();
  const checkoutContext = useCheckout();
  const [passwordShown, setPasswordShown] = useState(false);

  const methods = useForm<CreateAccountInfo>({
    resolver: yupResolver(schema),
    defaultValues: checkoutContext.state.createAccountInfo,
  });

  const onSubmit: SubmitHandler<CreateAccountInfo> = (data: CreateAccountInfo) => {
    console.log('data', data);
    checkoutContext.dispatch({ type: 'updateAccountInfo', payload: data });
    console.log('state1', checkoutContext.state.createAccountInfo);
    setActiveStep(1);
  };

  const handleClickShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <Grid container item direction="column" justifyContent="center" className={classes.root}>
      <FormProvider {...methods}>
        <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={7} className={classes.leftField} style={{marginRight: '12px'}}>
              <Controller
                name="firstName"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.firstName}
                    helperText={methods.formState.errors.firstName ? methods.formState.errors.firstName?.message : ''}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="lastName"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.lastName}
                    helperText={methods.formState.errors.lastName ? methods.formState.errors.lastName?.message : ''}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={7} className={classes.leftField} style={{marginRight: '12px'}}>
              <Controller
                name="email"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.lastName}
                    helperText={methods.formState.errors.lastName ? methods.formState.errors.lastName?.message : ''}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="password"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={passwordShown ? 'text' : 'password'}
                    label="Password"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.password}
                    helperText={methods.formState.errors.password ? methods.formState.errors.password?.message : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {passwordShown ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />{' '}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm>
              <Controller
                name="phone"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.phone}
                    helperText={methods.formState.errors.phone ? methods.formState.errors.phone?.message : ''}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={methods.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street address or P.O. Box"
                  variant="standard"
                  fullWidth
                  margin="dense"
                  error={!!methods.formState.errors.address}
                  helperText={methods.formState.errors.address ? methods.formState.errors.address?.message : ''}
                />
              )}
            />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={6} className={classes.leftField} style={{marginRight: '6px'}}>
              <Controller
                name="city"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.city}
                    helperText={methods.formState.errors.city ? methods.formState.errors.city?.message : ''}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm className={classes.leftField} style={{marginRight: '6px'}}>
              <FormControl fullWidth variant="standard" sx={{ mt: 1, minWidth: 120 }} error={!!methods.formState.errors.state}>
                  <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
                  <Controller
                    name="state"
                    control={methods.control}
                    render={({ field }) => (
                      <Select {...field} label="State">
                        {options.map((o) => (
                          <MenuItem value={o.value}>{o.label}</MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {methods.formState.errors.state ? <FormHelperText>{methods.formState.errors.state?.message}</FormHelperText> : null}
                </FormControl>

            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="zip"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Zip"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.zip}
                    helperText={methods.formState.errors.zip ? methods.formState.errors.zip?.message : ''}
                  />
                )}
              />{' '}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={7} className={classes.leftField} style={{marginRight: '12px'}} >
              <Controller
                name="repName"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Referring Rep"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.repName}
                    helperText={methods.formState.errors.repName ? methods.formState.errors.repName?.message : ''}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="repEmail"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Referring Rep Email"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.repEmail}
                    helperText={methods.formState.errors.repEmail ? methods.formState.errors.repEmail?.message : ''}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} sm className={classes.leftField} style={{marginRight: '12px'}}>
              <Controller
                name="repPhone"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Rep Phone"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.repPhone}
                    helperText={methods.formState.errors.repPhone ? methods.formState.errors.repPhone?.message : ''}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="kW"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="kW"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    error={!!methods.formState.errors.kW}
                    helperText={methods.formState.errors.kW ? methods.formState.errors.kW?.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm className={classes.leftField}>
                    <FormControl fullWidth variant="standard" sx={{ mt: 1, minWidth: 120 }} error={!!methods.formState.errors.loan_amount}>
                      <InputLabel id="demo-simple-select-helper-label-loan-amount">Loan Amount</InputLabel>
                      <Controller
                        name="loan_amount"
                        control={methods.control}
                        render={({ field }) => (
                          <Select {...field} label="Loan Amount" labelId="demo-simple-select-helper-label-loan-amount">
                            <MenuItem value="$0 - $50,000">$0 - $50,000</MenuItem>
                            <MenuItem value="$50,000 - $75,000">$50,000 - $75,000</MenuItem>
                            <MenuItem value="$75,000 - $100,000">$75,000 - $100,000</MenuItem>
                            <MenuItem value="$100,000 - $125,000">$100,000 - $125,000</MenuItem>
                            <MenuItem value="$125,000+">$125,000+</MenuItem>
                          </Select>
                        )}
                      />
                      {methods.formState.errors.loan_amount ? <FormHelperText>{methods.formState.errors.loan_amount?.message}</FormHelperText> : null}
                    </FormControl>
                  </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </Grid>
  );
};

export default CreateAccount;
