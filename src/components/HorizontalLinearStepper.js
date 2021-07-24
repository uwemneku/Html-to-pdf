import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BusinessDetails from '../formdetails/BusinessDetails';
import PersonalDetails from '../formdetails/PersonalDetails';
import { DataContext } from '../App';
import AboutUs from '../formdetails/AboutUs';
import List from '../formdetails/List';
import  print  from 'print-js';
import PdfPreview from '../react-pdf/PdfPreview';
import { Hidden } from '@material-ui/core';
import Partners from '../formdetails/Partners';
import usePdfRerender from '../Hooks/usePdfRerender';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiStepper-root':{
      padding: "10px"
    }
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));



export default function HorizontalLinearStepper({documentUrl}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = useContext(DataContext)
  const {competencies, differentiators, naics} = data
  const triggerPdfRerender = usePdfRerender()
  const stepContent = [<BusinessDetails setData={setData} />, 
                        <PersonalDetails  />,  
                        <AboutUs />, 
                        <List  sectionData={competencies} sectionName="competencies" />, 
                        <List sectionData={differentiators} sectionName="differentiators"  />, 
                        <List sectionData={naics} sectionName="naics"  />,
                        <Partners />
                      ]
  const steps = stepContent.length





  const handleNext = () => {
    triggerPdfRerender()
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStepperClick = (index) => {
    setActiveStep(index)
    triggerPdfRerender()
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {stepContent.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step onClick={()=>handleStepperClick(index)} key={index} {...stepProps}>
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <div>
        {/* Conditionally render content based on the current steop count */}
        {activeStep === steps.length ? 
        (
                <div>
                      <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                      </Typography>
                    
                      <Button
                          variant="outlined"
                          color="primary"
                          style={{marginLeft:"auto"}}
                          onClick={handleReset} className={classes.button}
                          >
                                "Edit document"
                      </Button>

                      <a download href={data.documentUrl} style={{textDecoration:"none"}} >
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            style={{marginLeft:"auto", textDecoration:"none"}}
                            >
                                  "Download document"
                        </Button>
                      </a>

                      <Hidden mdDown >
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            style={{marginLeft:"auto"}}
                            onClick={() =>{
                                    print(data.documentUrl);
                                    }}
                            >
                                  "Print document"
                        </Button>
                      </Hidden>
                      
                      <Hidden mdUp>
                        <PdfPreview  data={data}/>
                      </Hidden>
                    
                </div>
        ) : 
        (
                <div>
                  <Typography className={classes.instructions}>{stepContent[activeStep]}</Typography>
                  <div>
                    <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                      Back
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Next Section' : 'Next'}
                    </Button>
                  </div>
                </div>
        )
       }
      </div>
    </div>
  );
}
