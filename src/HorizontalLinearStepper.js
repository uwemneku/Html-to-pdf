import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BusinessDetails from './formdetails/BusinessDetails';
import PersonalDetails from './formdetails/PersonalDetails';
import { DataContext } from './App';
import AboutUs from './formdetails/AboutUs';
import List from './formdetails/List';
import  print  from 'print-js';
import { GeneratedPdf } from './BusinessData';
import { Hidden } from '@material-ui/core';

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

function getSteps() {
  return ['', '', "", '', '', ""];
}

export default function HorizontalLinearStepper({documentUrl}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [data, setData] = useContext(DataContext)
  const {competencies, differentiators, naics} = data
  const steps = getSteps();
 const getStepContent = [<BusinessDetails setData={setData} />, 
                         <PersonalDetails setData={setData} />,  
                         <AboutUs />, 
                         <List sectionData={competencies} sectionName="competencies" />, 
                         <List sectionData={differentiators} sectionName="differentiators"  />, 
                         <List sectionData={naics} sectionName="naics"  /> ]

 const triggerDocumentUpdate = () => {
    setData(prev => {
      const trig = prev.triggerUpdate
      return {...prev, triggerUpdate:!trig } 
    })
 }

 useEffect(() => {
   console.log(data.documentUrl)
   
 }, [data.documentUrl])

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    triggerDocumentUpdate()
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        //   if (isStepOptional(index)) {
        //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
        //   }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Hidden mdUp>
              <GeneratedPdf  data={data}/>
            </Hidden>
            <Button
                variant="outlined"
                color="primary"
                style={{marginLeft:"auto"}}
                onClick={handleReset} className={classes.button}
                 >
                    {
                      "Edit document"
                        // instance.loading ? 'Loading document...' : 'Print now!'
                     }
            </Button>
            <a download href={data.documentUrl} style={{textDecoration:"none"}} >
              <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  style={{marginLeft:"auto", textDecoration:"none"}}
                      onClick={() =>{
                          //  print(data.documentUrl);
                          }}
                  >
                      {
                        "Download document"
                      }
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
                      {
                        "Print document"
                      }
              </Button>
            </Hidden>
           
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent[activeStep]}</Typography>
            <div>
              <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {/* {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )} */}

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
        )}
      </div>
    </div>
  );
}
