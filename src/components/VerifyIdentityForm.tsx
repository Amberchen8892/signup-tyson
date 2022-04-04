import React, { FC, useState, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography, Checkbox, Paper, IconButton } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Theme } from '@mui/system';
import { InputAdornment } from '@mui/material';
import { useForm, Controller, FormProvider, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useCheckout } from '../lib/context/CreateAccountContext';
import { CustomerInfo } from '../lib/interfaces/CustomerInfo';
import InputMask from 'react-input-mask';
import ClientAgreementForm from './LOI/ClientAgreementForm';


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
  ssn: yup.string(),
  dateOfBirth: yup.string(),
  photoIdPath: yup.string(),
  proofOfAddressPath: yup.string(),
});

interface CustomerInfoFormProps {
  setActiveStep: (page: number) => void;
}

const CustomerInfoForm: FC<CustomerInfoFormProps> = ({ setActiveStep }: CustomerInfoFormProps) => {
  const classes = useStyles();
  const checkoutContext = useCheckout();
  const [showLOI, setShowLOI] = useState(false);
  const listInnerRef = useRef<HTMLHeadingElement>(null);
  const [passwordShown, setPasswordShown] = useState(false);

  const methods = useForm<CustomerInfo>({
    resolver: yupResolver(schema),
    defaultValues: checkoutContext.state.customerInfo,
  });

  const onSubmit: SubmitHandler<CustomerInfo> = (data: CustomerInfo) => {
    checkoutContext.dispatch({ type: 'updateCustomerInfo', payload: data });
    setShowLOI(true);
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollHeight - 5 < scrollTop + clientHeight && scrollTop + clientHeight < scrollHeight + 5) {
        methods.setValue('toc_agreement_ind', true);
        methods.setValue('poa_agreement_ind', true);
      }
    }
  };



  const handleClickShowPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
  <>
    {
      showLOI ?(
          <Grid container item direction="column" style={{display:'flex', justifyContent:'center', alignItems:'center'}} className={classes.root} >
            <ClientAgreementForm setActiveStep={setActiveStep}/>
          </Grid>
      ): (
          <Grid container item direction="column" justifyContent="center" className={classes.root}>
      <FormProvider {...methods}>
        <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={7} className={classes.leftField} style={{marginRight: '12px'}}>
              <Controller
                name="ssn"
                control={methods.control}
                render={({ field }) => (
                   <InputMask mask="999-99-9999" {...field}>
                        {({ ...field }) => (
                          <TextField
                            {...field}
                            label="SSN"
                            variant="standard"
                            fullWidth
                            type={passwordShown ? 'text' : 'password'}
                            margin="dense"
                            error={!!methods.formState.errors.ssn}
                            helperText={methods.formState.errors.ssn ? methods.formState.errors.ssn?.message : ''}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {passwordShown ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      </InputMask>

                )}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="dateOfBirth"
                control={methods.control}
                render={({ field }) => (
                  <InputMask mask="99/99/9999" {...field}>
                        {({ ...field }) => (
                          <TextField {...field} id="outlined-size-normal" label="Date of Birth" variant="standard" fullWidth margin="dense" error={!!methods.formState.errors.dateOfBirth} helperText={methods.formState.errors.dateOfBirth ? methods.formState.errors.dateOfBirth?.message : ''} />
                        )}
                      </InputMask>

                )}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={7} className={classes.leftField} style={{marginRight: '12px'}}>
              <Controller
                name="photoIdPath"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="standard"
                    label="Photo of ID"
                    margin="dense"
                    type="file"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!methods.formState.errors.photoIdPath}
                    helperText={
                      methods.formState.errors.photoIdPath ? methods.formState.errors.photoIdPath?.message : ''
                    }
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="proofOfAddressPath"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Proof of Address"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!methods.formState.errors.proofOfAddressPath}
                    helperText={
                      methods.formState.errors.proofOfAddressPath
                        ? methods.formState.errors.proofOfAddressPath?.message
                        : ''
                    }
                  />
                )}
              />{' '}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm>
              <Typography variant="subtitle1" gutterBottom component="div" style={{ marginTop: '1em' }}>
                Terms & Condition and Limited Power of Attorney
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
           <Grid item xs={12} sm>
                  <Paper elevation={3} style={{ padding: '2em' }}>
                    <div className="list">
                      <div className="list-inner" style={{ height: '200px', overflow: 'scroll' }} onScroll={() => onScroll()} ref={listInnerRef}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div style={{ padding: '0 1rem' }}>
                            <h2 style={{ textAlign: 'center' }}>Wype.io</h2>
                            <h3 style={{ textAlign: 'center' }}>Terms of Service</h3>
                            <div>
                              <p>
                                These Wype.io terms of service (“Agreement”) constitutes a binding contract made by and between Wype.io, (“WYPE”) and you (the “Client”). WYPE and Client hereby agree to the following terms and conditions.{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                  IF YOU DO NOT AGREE TO ALL OF THE TERMS HEREIN, YOU ARE PROHIBITED FROM MAKING ANY USE OF OUR SERVICES. This Agreement contain significant limitations on our liability as well as restrictions on your legal rights—read them thoroughly. It is your obligation to read,
                                  understand and agree to these terms before you proceed to use our services.
                                </span>
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Term </span> – The term of this Agreement is dependent on the payment option chosen by the Client and all services must be performed by WYPE in that period. The term shall continue for a minimum of three months regardless of the
                                payment option chosen.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Guarantee </span> – Although we cannot guarantee by law a certain outcome, we prepare documents conforming to Federal Law, certain state Privacy Laws, and the Fair Credit Reporting Act. We will prepare documents to assist you to
                                accurately report to the credit bureaus and place a fraud alert on your file to assist in protecting you against future data breaches and attempts to use your identity in a fraudulent manner.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Governing Law </span> – This Agreement shall be governed by and construed according to the laws of the State of Wyoming, without giving effect to normal choice-of-law and conflict-of-law principles. Except for a suit by WYPE to
                                collect the purchase price or other fees owed by Client pursuant to the Agreement, the parties agree that a party asserting any claim or dispute regarding this Agreement shall file and litigate such claim/dispute only in a court in Wyoming.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Entire Agreement </span> – This Agreement, including any attachments to the Agreement, sets forth the entire Agreement regarding the subject matter of the Agreement, and supersedes and terminates all prior agreements and
                                understandings between you and WYPE. No subsequent alteration, amendment, change or addition to this Agreement will be binding upon you and us unless reduced to writing and signed by you and us.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Customer Responsibilities and Communications </span> – You agree to assist us in answering certain security questions regarding your identity and credit history as may be performed by any associate of WYPE. You also agree and
                                acknowledge that once our services have begun, you will not apply for any new credit or miss a payment for the space of 30-45 days, thus negating the positive results of our work on your behalf.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Non-Profit Credit Counseling Services</span> – You have the right to hire a non-profit credit counseling service.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>No Legal, Financial or Tax Advice Provided</span> – No financial, legal, or tax advice or counsel is given, or shall be deemed to have been given by WYPE or its affiliates and contractors.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Staffing</span> – WYPE may assign clerical staff, or others to perform work on your case. You agree services in connection with our representation of you may be performed by any associate of WYPE. You may revoke your Limited Power
                                of Attorney by filling out and signing the Revocation of Limited Power of Attorney.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Your Right to Cancel Agreement</span> – You may cancel this contract without penalty or obligation at any time before midnight of the third day after the date on which you signed the contract.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Refund Policy</span> – In the event that a refund is requested, the client is entitled to 100% of their money back, if, and only if, the following criteria are met:
                              </p>
                              <p>- Less than an average of a 35 point increase across all 3 credit bureaus</p>
                              <p>- A promise or misrepresentation was presented upon initial sign up for WYPE services</p>
                              <p> The client will not be entitled to a refund if they violate the terms of the service agreement as well as for the following reasons:</p>
                              <p>- The client tries to open up or apply for new credit during the process resulting in new inquiries</p>
                              <p>
                                - The client misses payments during the process which negates any positive work being done All requests for a refund will be reviewed by WYPE to verify the validity of the request by the client. If the request is valid and there is no alternative to rectify the
                                situation, the refund will be issued within 2-3 business days after signing of release agreement.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Indemnification</span> – Client shall assume, pay, indemnify, hold harmless, and reimburse WYPE and its owners, employees, agents, affiliates, contractors, successors and assigns for any and all liabilities, damages, claims, suits,
                                settlements, judgments, costs, and expenses (including reasonable attorney’s fees and court costs) directly or indirectly incurred by WYPE to the extent the same are related in any way to Client’s use of the services or which are primarily attributable to the
                                negligence or intentional acts or omissions by Client, including any authorized or unauthorized users. Notwithstanding the foregoing, nothing contained herein shall release WYPE from any liability for its own gross negligence, except as allowed by law.
                              </p>
                            </div>
                            <div>
                              <p>
                                <span style={{ fontWeight: 'bold' }}>Limitation of Liability</span> – Neither party shall be liable for any consequential, incidental, special, or indirect damages (including, but not limited to, loss of profits, goodwill, use, or other intangible items) even if the
                                other party has been advised of the possibility of such damages or losses. With respect to any other damages, WYPE’s liability hereunder shall in no event exceed an amount equal to the amount actually paid by Client to WYPE prior to a claim being made, regardless of
                                the basis for the claim. Client understands that this is a significant limitation on Client’s right to sue WYPE and Client should not proceed if Client does not agree. WYPE shall not be bound by any typographical or other error or misprint in its marketing materials
                                or online purchase websites, so long as WYPE provides prompt notice of any such error and corrects the same.
                              </p>
                            </div>
                            <div>
                              <p>
                                Consumer Credit File Rights Under State and Federal Law You have a right to dispute inaccurate information in your credit report by contacting thecredit bureau directly. However, neither you nor any ‘credit repair’ company or credit repair organization has the right
                                to have accurate, current, and verifiable information removed from your credit report. The credit bureau must remove accurate, negative information from your report only if it is over 7 years old. Bankruptcy information can be reported for 10 years. <br />
                                You have a right to obtain a copy of your credit report from a credit bureau. You may be charged a reasonable fee. There is no fee, however, if you have been turned down for credit, employment, insurance, or a rental dwelling because of information in your credit
                                report within the preceding 60 days. The credit bureau must provide someone to help you interpret the information in your credit file. You are entitled to receive a free copy of your credit report if you are unemployed and intend to apply for employment in the next 60
                                days, if you are a recipient of public welfare assistance, or if you have reason to believe that there is inaccurate information in your credit report due to fraud. <br />
                                You have a right to sue a credit repair organization that violates the Credit Repair Organization Act. This law prohibits deceptive practices by credit repair organizations. <br />
                                You have the right to cancel your contract with any credit repair organization for any reason within 3 business days from the date you signed it.
                                <br />
                                Credit bureaus are required to follow reasonable procedures to ensure that the information they report is accurate. However, mistakes may occur.
                                <br />
                                You may, on your own, notify a credit bureau in writing that you dispute the accuracy of information in your credit file. The credit bureau must then reinvestigate and modify or remove inaccurate or incomplete information. The credit bureau may not charge any fee for
                                this service. Any pertinent information and copies of all documents you have concerning an error should be given to the credit bureau.
                                <br />
                                If the credit bureau’s reinvestigation does not resolve the dispute to your satisfaction, you may send a brief statement to the credit bureau, to be kept in your file, explaining why you think the record is inaccurate. The credit bureau must include a summary of your
                                statement about disputed information with any report it issues about you.
                                <br />
                                The Federal Trade Commission regulates credit bureaus and credit repair organizations. For more information contact: <br />
                                The Public Reference Branch
                                <br />
                                Federal Trade Commission
                                <br />
                                Washington, D.C. 20580
                              </p>
                            </div>

                            <h2 style={{ textAlign: 'center' }}>Wype.io</h2>
                            <h3 style={{ textAlign: 'center' }}>PRIVACY POLICY </h3>
                            <p>
                              Last Revised: <span style={{ fontWeight: 'bold' }}>10/22/2020</span>{' '}
                            </p>
                            <p>Nothing in this Policy may be construed to create any obligations for the Company beyond what is required by applicable law.</p>
                            <h3>California residents should access our California Consumer Protection Act (CCPA) Notice at the end of this document. </h3>
                            <div style={{ display: 'flex' }}>
                              <p>1. </p>
                              <p style={{ marginLeft: '0.5rem' }}>
                                The following Privacy Policy (the “Policy”) describes howWype.io (“Company”), which owns and operates the website <span style={{ fontWeight: 'bold' }}>Wype.io</span> collects, uses, and shares personally identifiable informaon and non-personally identifiable
                                information through the website and any mobile applications it operates (collectively, the “Sites”) and the services, features, or content we offer (collectively with the Sites, the &quot;Services&quot;). This Policy supplements the Terms of Use posted elsewhere
                                within the Sites. You should read the Policy and the Terms of Use before you use the Sites. If you do not understand and agree with this Policy, please do not use the Services.
                              </p>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <p>2. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Changes to this Policy. We may change the Policy at any time by posting revisions to the Policy on the Sites. Therefore, you should review the Policy from time to time. If you do not accept all of the terms, conditions and notices set forth in the Policy, you must
                                exit the Sites immediately.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              <p>3. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Collection of Information from Children. We do not intentionally collect information from or regarding minors. The Sites are not directed to, or intended for use by, children under the age of 18. Children may not use or submit any information through the Sites or its
                                Services. If you are under the age of 18, you may not use our Sites or Services. If a child under 18 submits information through any part of the Services, and we become aware that the person submiTng the information is a child, we will aUempt to delete this
                                information as soon as possible.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              <p>4.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Type of Information Collected. We may collect two general types of information when you use the Sites: <br />
                                <span style={{ marginLeft: '0.5rem' }}>
                                  a. Personally Identifiable Information (“PII”), which includes contact data we source from third parties and sell to you, your first and last name, home or other physical address, telephone number, email address, user I.D., other identifiers that permit physical or
                                  online contact with you, or any information about you collected online and maintained in personally identifiable form in combination with any of the preceding categories. You also may view or engage with our Sites and its Services through third-party social
                                  networking Sites or social media plug-ins and applications. When you engage with the Sites and its content through such third-party Sites, plugins or applications, we may have access to certain information from your social media profile, such as your name, photo,
                                  gender, birthday, location, videos, your list of friends, etc. This information is included in the definition of PII.
                                </span>
                                <br />
                                <br />
                                <span style={{ marginLeft: '0.5rem' }}>
                                  b. Non-personally identifiable information (“non-PII”) such as, the type of browser you are using, the type of operating system you are using, the web pages you have visited sites visited before and aYer you visit the Sites, the type of handheld or mobile device
                                  used to access the Sites or other device-specific information.{' '}
                                </span>
                              </p>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <p>5.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Certain features available within the Sites will require you to submit PII about yourself as a condition of participation. Some of the features may be offered by us, while others may be offered by third parties. (For example, you may be required to submit PII in order
                                to request information and offers from us and our partners.) When you choose to submit PII to a third party in connection with your use of the Sites, the third party&apos;s privacy policy, rather than this Policy, will control the use of your PII. YOU CAN ALWAYS
                                REFUSE TO PROVIDE PII TO US, BUT THIS MAY RESULT IN DECREASED FUNCTIONALITY OF THE SERVICES FOR YOU AND LIMIT YOUR ABILITY TO RECEIVE INFORMATION ABOUT SERVICES THAT MAY BE OF PARTICULAR INTEREST TO YOU.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              <p>6. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                How Information is Collected. We collect information both actively and passively. For example, we will collect information about you that you voluntarily provide while on the Sites. In addition to information provided directly by you, we (and third parties that offer
                                features through the Sites) may collect non-PII through the use of “cookies,” “web beacons,” “flash cookies” or by other electronic means.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              <p>7. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Cookies. In general, a cookie is a small amount of data sent to your browser from a web server and stored on your computer&apos;s hard drive, where it can be used to identify your computer. Cookies can be used to measure web Sites usage, improve navigation around web
                                Sites, and personalize a returning visitor&apos;s experience on the web Sites. In most cases, you can set your browser to turn off cookies or to notify you before you receive one so that you can decide whether to accept it or not. Because cookies allow you to take
                                advantage of some of the features on the Sites, we recommend that you leave them turned on. If you block or reject our cookies, some of the features on the Sites may not work for you. You can refer to the instructions for your browser to learn more about these
                                functions.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              <p>8.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Web Beacons. We, our third-party service providers, advertisers and partners also may use “web beacons” or similar technologies. Web beacons are small strings of code placed on a web page to collect data about how visitors use the Sites. For example, web beacons may
                                be used to count the number of users who visit the Sites or to deliver a cookie to the browser of a visitor to the Sites. If you set your browser to turn off cookies, web beacons and similar technologies will detect your visits to the Sites, but they will not
                                associate your activity on the Sites with information that otherwise would be stored in cookies. We do not control tracking technologies used by third parties on the Sites.{' '}
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              <p>9.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Flash Cookies. The Sites uses locally stored objects, also called “Flash cookies,” when it uses Adobe Flash Player (“Flash”) to provide special content such as video streaming, video on demand, video clips or animation. Flash, and similar applications, use Flash
                                cookies to remember visitors&apos; Sites seTngs, preferences and usages. Flash cookies are managed directly through Adobe&apos;s websites, rather than through your web browser.
                              </p>
                            </div>

                            <div style={{ display: 'flex', width: '100%' }}>
                              {' '}
                              <p>10.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Third-Party Advertising and Third-Party Web Sites. These Sites allows advertising by third parties that provide links to third-party web Sites. Internet advertising companies and the third-party websites on whose behalf they advertise (collectively “Third Parties”)
                                may use the technology described above to send (or “serve”) directly to your browser the advertisements that appear on our Sites. When this happens, Third Parties automatically receive non-PII, such as information from your computer and browser, including your cookie
                                information. They also may use cookies, Javascript, Pixel Tags and other technologies to deliver advertisements; collect information about the effectiveness of their advertisements; collect anonymous information about your visits to the Sites, such as the number of
                                times you have viewed an ad; or customize the advertising content you see. Third Parties will not collect your name, address, or other PII, unless you affirmatively provide it to them. We let Third Parties set and access their cookies on your computer. Third
                                Parties&apos; use of their own cookies is subject to their own privacy policies. For more information about these specialized cookies and other technologies, and to learn more about behavioral advertising or to opt out of this type of advertising for some companies,
                                you can visit http:// www.networkadvertising.org or http://networkadvertising.org/optout_nonppii.asp. When using a mobile application, you may receive tailored in-application advertisements. Each operating system provides its own instructions on how to prevent the
                                delivery of tailored in-application advertisements. You may review the instructions and/or the privacy seTngs for your operating system to find out how to opt out of tailored in-application advertisements.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              <p>11.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Third Party Links. Please note that this Sites contains links to other web Sites that do not follow this Policy. For instance, clicking on an advertisement, links or other elements on the Sites may take you to an entirely different Sites. Links to other Sites may use
                                our Sites logo or style as a result of a co-branding agreement. These Sites may send their own cookies to you and may collect data and make use of that data in ways that this Sites would not. AYer you leave our Sites, this Policy will no longer apply to PII or any
                                other data collected from or provided by you. You should check the other web Sites’ applicable privacy policy to determine how it will handle such data.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>12.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                How Information is Used and Shared. We use your PII for the purpose of conducting our business and pursuing our legitimate interests. For example, we use your PII to: <br />
                                a. Facilitate communication from third parties to you at your request; <br />
                                <br />
                                b. Create and manage your account; <br />
                                <br />
                                c. Provide the products and services you request;
                                <br />
                                <br />
                                d. Enroll you in contests,programs or other offers you request; <br />
                                <br />
                                e. Tell you about other products and services that may be of interest to you (you can opt out of receiving such communications by following the instructions provided in the communication);
                                <br />
                                <br />
                                f. Process payment for purchases you have made;
                                <br />
                                <br />
                                g. Protect against or identify possible fraudulent transactions;
                                <br />
                                <br />
                                h. Analyze the use of our Sites; i. Develop new products and services;
                                <br />
                                <br />
                                j. Understand how you arrived at the Sites;
                                <br />
                                <br />
                                k. Manage the Sites and Services;
                                <br />
                                <br />
                                l. Enforce our Terms of Use; <br />
                                <br />
                                m. Enforce the terms of this Policy.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>13.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Advertisements, Marketing Material and Other Offers. Unless you tell us that you do not want to receive these offers and subject to applicable law, the Company or those companies that we have a commercial relationship with, may occasionally send advertisements,
                                marketing material or other offers that we think might be of interest to you. If you do not want to receive these advertisements, marketing material or other offers, please contact us using the contact information found at the end of this Policy. Where required by
                                law, we will seek your consent prior to sending you any marketing materials. To the extent allowed by law, the provision of your email and phone number to us constitutes your prior express wriUen consent, and electronic signature, authorizing us to contact you at that
                                email address and phone number, including through the possible use of an automatic telephone dialing system or artificial or prerecorded voice, live calls and text messages, for both promotional and informational reasons. You agree that this consent may be assigned by
                                us to third parties and affiliates. You are not required to provide such consent in order to make a purchase as you can always contact us directly to arrange an alternate purchase method. By providing your telephone number to us, you certify that this is your own
                                number that you own, and not a line owned or used by another, and that you will immediately notify us if your number changes or is reassigned. You agree to indemnify us if this is not the case and if the future owner or user of the number makes a claim against us for
                                contact at that number. You may opt out of such contact at any time and through any of the reasonable methods outlined herein. A copy of our internal, wriUen No-NotCall Policy will be provided upon request.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>14.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                In the event that Company is considering a sale of its business, in its entirety or a component thereof, or substantially all of its assets are acquired, or a portion thereof, PII and non-PII, may be one of the transferred assets, and may therefore be used by a
                                third-party acquirer in accordance with this Policy. Such use by a third party may include review of PII, using such PII to contact you either before or aYer such a transfer or sale, use or transfer of non-PII before or aYer such a transfer or sale, or for other
                                purposes.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>15.</p> <p style={{ marginLeft: '0.5rem' }}> WE MAY DISCLOSE PII ABOUT YOU TO A THIRD PARTY FOR COMPENSATION. </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>16. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                In addition, we may share your information as described below:
                                <br />
                                a. In order to comply with a subpoena, C.I.D. or other valid regulatory or legal request.
                                <br />
                                <br />
                                b. Information You Elect to Share: You may choose to share information with Third Parties by clicking on links to those Third Parties from within the Sites. In addition, you may elect to share information, including PII, through the Services offered on the Sites by,
                                for instance, posting comments on comment boards. Some of your activity on the Sites, including content you have posted, is public by default. Some of this content may include PII. <br />
                                <br />
                                c. Third-Party Advertisers and Web Sites: We may share your non-PII with, or make your non-PII available to, Third Parties as described in the section above titled Third-Party Advertising and Third-Party Web Sites. <br />
                                <br />
                                d. Information Disclosed to Vendors, Partners, Service Providers, and Others for Business Purposes: We contract with vendors to provide services related to the Sites and may share PII with such vendors in order to provide products or services to you or to help
                                maintain the Sites. We also may share non-PII with our partners, service providers and other persons with whom we conduct business. We will only share your PII in accordance with applicable law. <br />
                                <br />
                                e. Information Disclosed for the Protection of the Sites and for Others. We may disclose PII when (1) required by law or to respond to legal process or lawful requests, including from law enforcement; (2) when we believe it is necessary to prevent, investigate, or
                                address (a) possible illegal activities, including fraud, (b) violation of our Terms of Use, (c) violation of this Policy, or (d) threats to the physical safety of any person; or (4) to protect our rights or property.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>17.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Forums. The Sites may include forums (such as message boards, chat rooms, comment boards, and reviews) that enable users to post a comment or communicate with each other. We are under no obligation to moderate or edit the forums and will not be responsible for the
                                content or use of any material posted on any forum within the Sites. We retain the right to delete at any time and for any reason any material posted within the Sites.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              <p>18.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Information Security. We take information security seriously, and we use reasonable administrative, technical and physical safeguards to protect the PII we collect from unauthorized access, use or disclosure. But we have no control over the security of other websites
                                on the Internet that you might visit. If you share your computer or use a computer that is accessed by the general public, remember to sign off and close your browser window when you have finished your session. This will help to ensure that others cannot access your
                                PII.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>19.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Additionally, and as you are likely aware, no system can be completely secure. Therefore, although we take commercially reasonable steps to secure your information, we do not promise, and you should not expect, that your PII, searches or other communications always
                                will remain secure. In the event of a breach of the confidentiality or security of your PII, we will notify you if reasonably possible and as reasonably necessary so that you can take appropriate protective steps. We may notify you under such circumstances using the
                                e-mail address(es) we have on record for you. You should also take care with how you handle and disclose your PII. Please refer to the Federal Trade Commission&apos;s Web Sites at hUp://www.consumer.Yc.gov/ for information about how to protect against identity theY.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>20. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Your Rights. Under the law of some countries, you may have certain rights with respect to your PII. These rights include the right to: (i) request access to and rectification or erasure of your PII; (ii) obtain restriction of processing or object to processing of your
                                PII; and (iii) ask for a copy of your PII to be provided to you or a third party in a machine readable format. If you wish to exercise one of the above-mentioned rights, please send us your request to the contact details set out below. If you have unresolved concerns,
                                you may also have the right to lodge a complaint about the processing of your PII with your local data protection authority in the European Union or elsewhere.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>21. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                California Privacy Rights. Under California law, California residents may request once a year, free of charge, certain information regarding our disclosure of PII to third parties for direct marketing purposes. Specifically, we will provide a list of the categories of
                                PII disclosed to third parties for third-party direct marketing purposes, along with the names and addresses of these third parties. To make such a request, please contact us using the contact information at the boUom of this Policy. We reserve our right not to
                                respond to requests submiUed other than to the contact points listed below. You should put “California Privacy Rights” in the subject line and in your request. We may need to verify your identity before providing information to you.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>22.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                California Do Not Track Disclosure. Certain web browsers may allow you to enable a “do not track” option that sends signals to the websites you visit indicating that you do not want your online activities tracked. This is different than blocking cookies as browsers
                                with the “do not track” option selected may still accept cookies. Our Sites currently do not have the functionality to recognize or honor “do not track” browser signaling. We do not respond to &apos;do not track&apos; signals. If we do so in the future, we will modify
                                this Policy accordingly.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>23.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                California residents should also <span style={{ fontWeight: 'bold' }}>access our California Consumer Protection Act (CCPA) Notice at the end of this document.</span>{' '}
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>24. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Users From Outside the United States. This Sites is hosted in the United States and is governed by U.S. law. If you are using the Sites from outside the United States, please be aware that Wype.io is located in the United States and your PII will be stored and
                                processed in the United States where we locate and operate our servers and databases. The data protection laws in the United States may not be as strict or comprehensive as those in your country. However, we value your privacy and always strive to treat it in
                                accordance with applicable law. By voluntarily sharing your PII with us, you understand that your PII will be stored and processed in the United States.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>25. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Retention. We retain your PII for as long as you remain a customer and thereaYer only for the period necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or allowed by law, including to fulfill a legal obligation.
                              </p>
                            </div>

                            <div style={{ display: 'flex' }}>
                              {' '}
                              <p>26. </p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Contact Information. Questions concerning the Policy or the Sites, including any request to review or change your PII, should be directed to <span style={{ fontWeight: 'bold' }}> inquiries@wype.io. </span> You may also contact us by mail using the following address{' '}
                              </p>
                            </div>
                            <h3 style={{ textAlign: 'center' }}>Privacy Notice for Residents of California </h3>
                            <p>
                              {' '}
                              <span style={{ fontWeight: 'bold' }}>Effective:</span> 01/01/2020 <span style={{ fontWeight: 'bold' }}>Last Revised:</span>10/22/2020
                            </p>
                            <p>
                              {' '}
                              This <span style={{ fontWeight: 'bold' }}>Notice of Privacy is for California Residents</span> and applies to all consumers who interact with <span style={{ fontWeight: 'bold' }}>Wype.io</span> who reside in the State of California. It supplements the information above
                              in our Privacy Policy to comply with the California Consumer Privacy Act of 2018 (CCPA). Terminology defined in the CCPA is defined the same here. No provision of this Notice may be construed to provide consumers any rights (or our company any obligations) beyond those
                              required by the CCPA and other applicable law.{' '}
                            </p>
                            <p>
                              <span style={{ textDecoration: 'underline' }}>Disabled consumers</span> who need these disclosures presented in an alternate medium, may contact us at the email address or telephone number listed further below.
                            </p>
                            <p style={{ textDecoration: 'underline' }}>Personal Information That We Collect</p>
                            <p>
                              {' '}
                              By providing your personal information to us, asking to be contacted or using us to interact with a third party, you are also specifically directing us to disclose your information to any third-parties listed, along with others who we feel may have information or offers
                              you may be interested in.{' '}
                            </p>
                            <p>
                              We collect personal information directly from you and by observing your interactions on our website which identifies, relates to, describes and/or is capable of being associated with or could reasonably be linked, directly or indirectly, with a particular consumer,
                              household or device. In the last twelve months we have collected the categories of information listed below. We will not collect additional categories of personal information or use the personal information we collected for materially different, unrelated, or
                              incompatible purposes without providing you notice. The following is an overview of information defined by the CCPA as personal information.
                            </p>
                            <div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>A. Unique personal identifiers </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>
                                    A real name, account name, address, alias, bank account number, credit card number, email address, debit card number, driver&apos;s license number, insurance policy number, internet Protocol address, passport number, physical characteristics or description, postal
                                    address, online identifier, signature, Social Security number, state identification card number, telephone number, unique personal identifier, or other similar identifiers.
                                  </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Characteristics of protected classifications under California or federal law </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>
                                    Age (40 years or older), ancestry, citizenship, color, disability (physical or mental), marital status, medical condition, national origin, race, religion or creed, sex (including gender, gender identity, gender expression, pregnancy or childbirth and related
                                    medical conditions), sexual orientation, veteran or military status, genetic information (including familial genetic information).
                                  </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. Commercial information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Products or services considered, obtained or purchased, purchasing or consuming histories or tendencies, records of personal property.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>D. Biometric information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>
                                    Activity paUerns used to extract a template, behavioral, biological, genetic or physiological characteristics, other identifiers or identifying information eg:, face, finger or voiceprints, gait tendencies, health information like exercise or sleep information,
                                    iris or retina scans, keystrokes or other physical paUerns.
                                  </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>E. Internet or other electronic network activity information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Browsing history, search history, information regarding interaction with advertisements, applications or websites</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>F. Geolocation information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Physical location or movements including trends.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>G. Sensory information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Audio, electronic, visual, thermal, olfactory or similar data.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>H. Professional or employment related information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Past or present job history, performance evaluations.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>I. Non-public / Private (non-public) educational information protected by the Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)). </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Class lists, disciplinary records, financial information, grades, identification codes, schedules, transcripts or other information directly related to a student which is collected by educational institutions or agencies acting on their behalf.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>J. Inferences or conclusions drawn from personal information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Profiles reflecting an individual’s abilities, aTtudes, aptitudes, behavior, characteristics, intelligence, predispositions, preferences, psychological trends etc.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>K. Personal Information not governed by the CCPA </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>
                                    De-identified or aggregated consumer information, information excluded from the CCPA&apos;s scope (eg: health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical
                                    Information Act (CMIA) or clinical trial data). Personal information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the
                                    Driver&apos;s Privacy Protection Act of 1994, publicly available information from government records.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p style={{ textDecoration: 'underline' }}>We obtain personal information from the following categories of sources </p>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>A. Client or their agents, directly or indirectly </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. Third parties, advertising networks, consumer data resellers, data analytics providers, government entities, internet service providers, social networks, operating systems and platorms</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Government entities from which public records are obtained </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>D. Website interactions from our contact us and other web forms</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p style={{ textDecoration: 'underline' }}>How We Use Personal Information regulated by the CCPA </p>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>A. As described upon collection of information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>As set forth in the CCPA.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Complying with the law </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Obeying the court, law and government regulations, responding to requests from law enforcement and other governing bodies. </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. Fulfill requests, the reason you provided the information </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Answering questions, facilitating delivery, fulfilling purchases, providing information on products or services, price quotes, processing payments and transactions, processing product orders, processing returns. </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>D. Maintaining safety and security </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Preventing theft of information, products and services as well as technological resources and preventing transactional fraud. </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>E. Personalizing the customer experience </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Personalizing your experience to deliver content, product and service offerings relevant to your interests (eg; targeting offers and ads through our website, third-party sites and via email or text messaging –with your consent, where required by law). </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>F. Product development </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Product, service and website improvement, research and analysis</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>G. Providing support </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Developing and personalizing our products, services and website, investigating and addressing concerns, monitoring and improving responses </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>H. Restructuring </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>Evaluating or conducing mergers, divestures, reorganization, sale or transfer or assets in the event of bankruptcy, liquidation, etc. </p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>I. For our own Client and affiliate/partner’s use. </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>To provide to our own clients, affiliates/partners, as allowed by law, to the extent we believe they may have offers or other information of use to the consumer </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p style={{ textDecoration: 'underline' }}>Sharing Personal Information</p>
                              <p>
                                We may disclose your personal information to a third party (eg: Service providers and data aggregators) for a business purpose. When we disclose your information for business purposes our contracts state the purpose and requires all parties use personal information
                                for the sole purpose of executing the contract and also that all personal information be kept confidential.
                              </p>
                            </div>
                            <div>
                              <p style={{ textDecoration: 'underline' }}>Personal Information Disclosed in the Last 12 Months </p>
                              <p> In the last twelve months, we have disclosed the categories of personal information below for a business purpose. </p>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>A. Biometric information? No </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>F. Internet or other electronic network acvity information? Yes</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Characteristics of protected classifications under California or federal law? Yes </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>G. Non-public / Private (non-public) educational information protected by the Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)? Yes</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. Commercial information? Yes </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>H. Professional or employment related information? Yes</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>D. Geolocation information? Yes </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>I. Sensory information? Yes</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>E. Inferences or conclusions drawn from personal information? Yes</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>J. Unique personal identfiers? Yes</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p style={{ textDecoration: 'underline' }}>Personal Information Sold in the Last 12 Months. </p>
                              <p>
                                In the last twelve months we have sold the categories below of personal information for a business purpose. Note that under the CCPA, a business does not “sell” personal informa:on when a consumer uses or directs the business to inten:onally disclose personal
                                informa:on or uses the business to inten:onally interact with a third party, provided the third party does not also sell the personal informa:on, unless that disclosure would be consistent with the provisions of this :tle. An inten:onal interac:on occurs when the
                                consumer intends to interact with the third party, via one or more deliberate interac:ons.
                              </p>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>A. Unique personal identifiers? Yes </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>F. Geolocation information? Yes</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Characteristics of protected classifications under California or federal law? Yes </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>G. Sensory information? Yes</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. Commercial information? Yes </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>H. Professional or employment related information? Yes</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>. Biometric information? No </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>I. Non-public / Private (non-public) educational information protected by the Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)? Yes</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>E. Inferences or conclusions drawn from personal information? Yes</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>J.Internet or other electronic network activity information? Yes</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p style={{ textDecoration: 'underline' }}>Your Rights and Choices</p>
                              <p>The CCPA provides consumers with specific rights regarding their personal information if they are California residents. The following is an overview of these rights and an explanation of how to exercise them. </p>
                              <div style={{ display: 'flex' }}>
                                <p> 1. </p>{' '}
                                <p style={{ marginLeft: '0.5rem' }}>
                                  Specific Information Access and Data Portability Rights California residents have the right to request the disclose of what CCPA personal information we have collected about them in the last twelve months and what we have used it for during this time period. To the
                                  extent required by the CCPA, when we receive a verifiable consumer request, we will disclose the following information, a@er verifying your identity, if we can:
                                </p>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>A. Business or commercial purposes for collecting or selling personal information.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>F. Personal information categories that each information recipient category disclosed to each recipient.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Categories of personal information collected about you.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>G. Personal information categories that eachinformation recipient category sold to each recipient.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. Categories of sources we use to collect personal information about you.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>H. Specific pieces of personal information we collected about you, so that you can make a data request. We will provide you with this information in a portable format.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>D. Categories of third parties we share your personal information with.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>I. Whether we disclosed or sold your personal information for a business purpose, two separate lists.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>E. Internet or other electronic network activity information collected or maintained.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p style={{ color: 'white' }}>N/A</p>
                                </div>
                              </div>
                              <div style={{ display: 'flex' }}>
                                <p>2. </p>{' '}
                                <p style={{ marginLeft: '0.5rem' }}>
                                  Deletion Request Rights California residents have the right to request that we delete any of the CCPA personal information which we collected about them. AYer we have received and confirmed your verifiable consumer request (see Exercising Access, Data Portability,
                                  and Deletion Rights), we will delete your personal information and instruct our service providers to delete your information as well. We may not delete your information if it is required to us or our service providers to do the following:{' '}
                                </p>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>A. Comple:ng the contract or transaction for which we collected the personal information, providing goods or services requested, taking reasonable actions within the scope of our ongoing business relationship with you.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>F. Finding and resolving defects or errors impacting intended product, service or website functionality.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Complying with the California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.), and other legal obligations.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>G. Internal processes in alignment with your relationship with us.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. Complying with free speech rights, engaging in free speech, ensuring consumers right to exercise their free speech.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>H. Identifying security risks, protecting against deceptive, fraudulent, malicious, or illegal activity, or prosecuting individuals involved in such activities.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>D. Complying with other laws.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>I. Participating in public or peer-reviewed historical, scientific, or statistical research which is in the public interest and abides by ethics standards, if the information is required to complete the research and you have provided informed consent.</p>
                                </div>
                              </div>
                              <p> 3.</p>{' '}
                              <p style={{ marginLeft: '0.5rem' }}>
                                {' '}
                                Exercising Access, Data Portability, and Deletion Rights Only you or someone registered with the California Secretary of State who is authorized to act in your interests may make a request for information or deletion. Once you have made a verifiable consumer request,
                                we will provide your personal information is a portable manner so that you can access it easily. Any information you provide will only be used to verify your identity. You can make a request following the instructions below:{' '}
                              </p>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>
                                    A. Use our online Request to Know form, call us or email us using the contact information found at the end of this notice. We will confirm receipt within 10 days and then provide a wriUen response within 45 days. If we require more time (up to 90 days), we will
                                    inform you in writing of the reason.
                                  </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>E. Select the format in which you would like to receive your personal information. This format should be readily accessible and allow you to transport the data to others without issue.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Provide us with information necessary to verify your identity so that we may release the information to the individual to whom it belongs, or an authorized representative. </p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>F. We will provide access to your personal information for the last twelve-month period or provide an explanation as to who we cannot comply with the request.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. You need not create an account to make requests, but if you have an account and login with us, signing in through our portal with a password serves to verify your identity.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>G. There is no fee to process your verifiable consumer request unless it is excessive. In with case we will inform you of the fee before proceeding.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>D. Provide enough detail in your request that we understand you, can evaluate the request and provide an answer.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p style={{ color: 'white' }}>N/A</p>
                                </div>
                              </div>
                              <p>
                                You will need to prove your identity to us. If you have no password-protected account with us, you will need to provide us with at least 2 data points which we already maintain about you, and possibly other information and a signed declaration under penalty of perjury
                                if the information maintained about you is of a sensitive nature. In some cases, we might not be able to successfully verify your information and in such a case, we will notify you as to why we cannot provide it.
                              </p>
                              <div style={{ display: 'flex' }}>
                                <p>4.</p>{' '}
                                <p style={{ marginLeft: '0.5rem' }}>
                                  {' '}
                                  Personal Information Sales Opt-Out and Opt-In Rights California residents who are sixteen years of age or older have the right to dictate that we do not sell their personal information. If you opt-in to information sales, either verbally or in writing, you may
                                  opt-out at any time. Minors are not allowed to use our websites or services and we do not intentionally collect any personal information for or regarding those under the age of eighteen. To opt out please contact us using the contact information found at the end of
                                  this notice.{' '}
                                </p>
                              </div>
                              <div style={{ display: 'flex' }}>
                                <p> 5.</p>{' '}
                                <p style={{ marginLeft: '0.5rem' }}>
                                  {' '}
                                  Financial Incentives & Non-Discrimination Rights To the extent required by the CCPA, we will not discriminate against individuals who choose to exercise any of their rights under the CCPA. Unless allowed by the CCPA, we will not:{' '}
                                </p>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>A. Deny you good or services because you exercised your rights.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>H. We may, however, offer financial incentives to those who provide personal information which may result in variations in price, rates or quality depending on the value of the information provided.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>B. Charge different rates or prices, impost penalties or grant differential discounts for punitive purposes.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p>I. You must opt-in or provide prior wriUen consent to participate in financial incentive programs and you may revoke this consent at any time.</p>
                                </div>
                              </div>
                              <div className="row" style={{ display: 'flex' }}>
                                <div className="column" style={{ border: '1px solid black', flex: '50%', padding: '0.8rem' }}>
                                  <p>C. Provide (or suggest) those who exercise their rights a different quality goods or a different level of service.</p>
                                </div>
                                <div className="column" style={{ border: '1px solid black', borderLeft: 'none', flex: '50%', padding: '0.8rem' }}>
                                  <p style={{ color: 'white' }}>N/A</p>
                                </div>
                              </div>
                              <p>
                                We do not offer financial incentives to consumers to induce their agreement for us to sell their personal information. Rather, if you do not agree, we might not be allowed to provide your information to third parties who have the quotes, services or other information
                                you have requested. Note that under the CCPA, the “sale” of information does not include the disclosure of information at the consumer’s request.{' '}
                              </p>
                              <div style={{ display: 'flex' }}>
                                <p>6.</p> <p style={{ marginLeft: '0.5rem' }}> Other California Privacy Rights</p>
                              </div>
                              <p>
                                California&apos;s &quot;Shine the Light&quot; law (Civil Code Section § 1798.83) provides California residents with the right to request information regarding our disclosure of personal information to third parties for their direct marketing purposes. To make a
                                request, please contact us using the contact information found at the end of this notice.
                              </p>
                              <p>Changes to Our Privacy Notice</p>
                              <p>
                                We reserve the right to amend this notice of privacy at any time and at our sole discretion. When changes are made, we will post a notice on the main website and the date the changes take effect. Continued use of this website indicates your acceptance of these
                                changes.{' '}
                              </p>
                              <p>Contact Information</p>
                              <p>
                                If you have any questions, comments or queries about our privacy policy, how we collect or use personal information, your rights regarding such use, or how to exercise your rights please feel free to contact us at the following email address or phone number:{' '}
                                <span style={{ backgroundColor: 'yellow' }}>inquiries@wype.io, 888-418-1763</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Paper>
                </Grid>

          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm>
              <Controller
                name="toc_agreement_ind"
                control={methods.control}
                render={({ field }) => <Checkbox {...field} checked={field.value} required />}
              />
              <span>
                {' '}
                I agree to the <span style={{ color: '#12ae6d' }}>Terms and Conditions</span>.
              </span>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm>
              <Controller
                name="poa_agreement_ind"
                control={methods.control}
                render={({ field }) => <Checkbox {...field} checked={field.value} required />}
              />
              <span>
                {' '}
                I agree to give Wype <span style={{ color: '#12ae6d' }}> Limited Power of Attorney</span>.
              </span>
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button type="button" className={classes.buttonTwo} onClick={() => setActiveStep(0)}>
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
      </Grid>
    )}
  </>
  );
};

export default CustomerInfoForm;
